#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { readFileSync, realpathSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const COMMAND_TIMEOUT_MS = 15_000;
const MAX_OUTPUT_BYTES = 8 * 1024 * 1024;
const ASSET_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets');
const TEMPLATE_NAMES = new Set([
  'pr-short.md',
  'pr-standard.md',
  'pr-migration.md',
  'commit.txt',
  'commit-conventional.txt',
]);

class CliError extends Error {}

function usage() {
  return `Usage:
  git-kit.mjs status [--repo PATH]
  git-kit.mjs pr-context --repo PATH --base REF [--head REF]
  git-kit.mjs template NAME [--output PATH]

Commands inspect local Git state without fetching or changing the repository.
Use --help with a command for command-specific usage.
`;
}

function commandUsage(command) {
  if (command === 'status') return 'Usage: git-kit.mjs status [--repo PATH]\n';
  if (command === 'pr-context') {
    return 'Usage: git-kit.mjs pr-context --repo PATH --base REF [--head REF]\n';
  }
  if (command === 'template') {
    return 'Usage: git-kit.mjs template NAME [--output PATH]\n';
  }
  return usage();
}

function optionError(message) {
  throw new CliError(`${message}\n\n${usage()}`);
}

function parseArgs(argv) {
  if (argv.length === 0 || argv[0] === '--help' || argv[0] === '-h') {
    return { help: true };
  }

  const command = argv[0];
  if (!['status', 'pr-context', 'template'].includes(command)) {
    optionError(`Unknown command: ${command}`);
  }

  const values = { command, positionals: [], help: false };
  const allowed = command === 'status'
    ? new Set(['repo'])
    : command === 'pr-context'
      ? new Set(['repo', 'base', 'head'])
      : new Set(['output']);
  const seen = new Set();

  for (let index = 1; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--help' || token === '-h') {
      values.help = true;
      continue;
    }
    if (!token.startsWith('-')) {
      values.positionals.push(token);
      continue;
    }
    if (!token.startsWith('--')) {
      optionError(`Unknown flag: ${token}`);
    }

    const equals = token.indexOf('=');
    const optionName = equals === -1 ? token.slice(2) : token.slice(2, equals);
    if (!allowed.has(optionName)) {
      optionError(`Flag --${optionName} is not valid for ${command}`);
    }
    if (seen.has(optionName)) {
      optionError(`Duplicate option: --${optionName}`);
    }
    seen.add(optionName);

    let value = equals === -1 ? undefined : token.slice(equals + 1);
    if (value === undefined) {
      if (index + 1 >= argv.length) optionError(`Missing value for --${optionName}`);
      value = argv[index + 1];
      index += 1;
    }
    if (equals === -1 && value.startsWith('--')) {
      optionError(`Missing value for --${optionName}`);
    }
    if (value.length === 0) optionError(`Missing value for --${optionName}`);
    values[optionName] = value;
  }

  if (values.help) return values;

  if (command === 'status' && values.positionals.length > 0) {
    optionError(`Unexpected positional argument: ${values.positionals[0]}`);
  }
  if (command === 'pr-context') {
    if (values.positionals.length > 0) optionError(`Unexpected positional argument: ${values.positionals[0]}`);
    if (values.repo === undefined) optionError('pr-context requires --repo PATH');
    if (values.base === undefined) optionError('pr-context requires --base REF');
    if (values.base.startsWith('-')) optionError('Base ref must not start with a dash');
    if (values.head !== undefined && values.head.startsWith('-')) {
      optionError('Head ref must not start with a dash');
    }
  }
  if (command === 'template') {
    if (values.positionals.length !== 1) {
      optionError('template requires exactly one NAME positional argument');
    }
    if (!TEMPLATE_NAMES.has(values.positionals[0])) {
      optionError(`Unknown template: ${values.positionals[0]}`);
    }
  }
  return values;
}

function gitEnvironment() {
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !/^GIT_/i.test(key)),
  );
  env.GIT_OPTIONAL_LOCKS = '0';
  env.GIT_TERMINAL_PROMPT = '0';
  env.GIT_NO_LAZY_FETCH = '1';
  env.GIT_ALLOW_PROTOCOL = '';
  return env;
}

function redactedGitError(stderr) {
  return stderr
    .trim()
    .replace(/https?:\/\/[^\s]+/gi, '<redacted-url>')
    .replace(/ssh:\/\/[^\s]+/gi, '<redacted-url>');
}

function runGit(args, cwd, { allowFailure = false } = {}) {
  let result;
  try {
    result = spawnSync(
      'git',
      ['-c', 'core.fsmonitor=false', ...args],
      {
        cwd,
        encoding: 'utf8',
        env: gitEnvironment(),
        maxBuffer: MAX_OUTPUT_BYTES,
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: COMMAND_TIMEOUT_MS,
        windowsHide: true,
      },
    );
  } catch (error) {
    throw new CliError(`Unable to run Git: ${error.message}`);
  }

  const stdout = typeof result.stdout === 'string' ? result.stdout : '';
  const stderr = typeof result.stderr === 'string' ? result.stderr : '';
  const outputBytes = Buffer.byteLength(stdout) + Buffer.byteLength(stderr);
  if (outputBytes > MAX_OUTPUT_BYTES || result.error?.code === 'ENOBUFS') {
    throw new CliError(`Git output exceeded the ${MAX_OUTPUT_BYTES}-byte limit`);
  }
  if (result.error?.code === 'ETIMEDOUT' || result.signal === 'SIGTERM') {
    throw new CliError(`Git command timed out after ${COMMAND_TIMEOUT_MS} ms`);
  }
  if (!allowFailure && result.status !== 0) {
    const detail = redactedGitError(stderr);
    throw new CliError(detail || `Git exited with status ${result.status ?? 'unknown'}`);
  }
  return { status: result.status ?? -1, stdout, stderr };
}

function repositoryRoot(repoArg) {
  const cwd = repoArg === undefined ? process.cwd() : path.resolve(process.cwd(), repoArg);
  const result = runGit(['rev-parse', '--show-toplevel'], cwd);
  const root = result.stdout.replace(/(?:\r\n|\n|\r)$/, '');
  if (!root) throw new CliError('Git did not return a repository root');
  return path.resolve(root);
}

function currentBranch(root) {
  const result = runGit(['symbolic-ref', '--quiet', '--short', 'HEAD'], root, { allowFailure: true });
  return result.status === 0 ? result.stdout.trim() || null : null;
}

function parsePorcelain(raw) {
  const fields = raw.split('\0');
  const entries = [];
  for (let index = 0; index < fields.length;) {
    const record = fields[index++];
    if (!record) continue;
    if (record.length < 3) throw new CliError('Git returned malformed porcelain status');
    const entry = {
      index: record[0],
      worktree: record[1],
      path: record.slice(3),
    };
    if ('RC'.includes(record[0]) || 'RC'.includes(record[1])) {
      const originalPath = fields[index++];
      if (originalPath === undefined) throw new CliError('Git returned malformed rename status');
      entry.originalPath = originalPath;
    }
    entries.push(entry);
  }
  return entries;
}

function parseWorktreesPorcelain(raw) {
  const fields = raw.split('\0');
  const worktrees = [];
  let current = null;
  const finish = () => {
    if (current) worktrees.push(current);
    current = null;
  };
  for (const field of fields) {
    if (field === '') {
      finish();
      continue;
    }
    const space = field.indexOf(' ');
    const key = space === -1 ? field : field.slice(0, space);
    const value = space === -1 ? '' : field.slice(space + 1);
    if (key === 'worktree') {
      finish();
      current = { path: path.resolve(value) };
    } else if (!current) {
      current = {};
    } else if (key === 'HEAD') {
      current.head = value;
    } else if (key === 'branch') {
      current.branch = value.startsWith('refs/heads/') ? value.slice('refs/heads/'.length) : value;
    } else if (key === 'detached' || key === 'bare' || key === 'locked' || key === 'prunable') {
      current[key] = value || true;
    }
  }
  finish();
  return worktrees;
}

function statusCommand(repoArg) {
  const root = repositoryRoot(repoArg);
  const head = resolveCommit(root, 'HEAD', 'HEAD');
  const branch = currentBranch(root);
  const porcelain = runGit(
    ['status', '--porcelain=v1', '-z', '--untracked-files=all'],
    root,
  ).stdout;
  const worktrees = runGit(['worktree', 'list', '--porcelain', '-z'], root).stdout;
  return {
    root,
    head,
    branch,
    changes: parsePorcelain(porcelain),
    worktrees: parseWorktreesPorcelain(worktrees),
  };
}

function resolveCommit(root, ref, label) {
  if (ref.startsWith('-')) throw new CliError(`${label} ref must not start with a dash`);
  const expression = `${ref}^{commit}`;
  const result = runGit(
    ['rev-parse', '--verify', '--quiet', '--end-of-options', expression],
    root,
    { allowFailure: true },
  );
  const sha = result.stdout.trim();
  if (result.status !== 0 || !/^[0-9a-f]{40,64}$/i.test(sha)) {
    if (ref === 'HEAD') throw new CliError('HEAD has no commit yet (unborn branch)');
    throw new CliError(`Unable to resolve ${label} ref: ${ref}`);
  }
  return sha;
}

function parseNameStatus(raw) {
  const fields = raw.split('\0');
  const files = [];
  for (let index = 0; index < fields.length;) {
    const status = fields[index++];
    if (!status) continue;
    const filePath = fields[index++];
    if (filePath === undefined) throw new CliError('Git returned malformed name status');
    const file = { status, path: filePath };
    if (status[0] === 'R' || status[0] === 'C') {
      const newPath = fields[index++];
      if (newPath === undefined) throw new CliError('Git returned malformed rename status');
      file.originalPath = filePath;
      file.path = newPath;
    }
    files.push(file);
  }
  return files;
}

function parseNumstat(raw) {
  const fields = raw.split('\0');
  const stats = [];
  for (let index = 0; index < fields.length;) {
    const first = fields[index++];
    if (!first) continue;
    const firstTab = first.indexOf('\t');
    const secondTab = first.indexOf('\t', firstTab + 1);
    if (firstTab < 0 || secondTab < 0) throw new CliError('Git returned malformed numstat');
    const additions = first.slice(0, firstTab);
    const deletions = first.slice(firstTab + 1, secondTab);
    let filePath = first.slice(secondTab + 1);
    let originalPath;
    if (filePath === '') {
      originalPath = fields[index++];
      filePath = fields[index++];
    }
    if (filePath === undefined) throw new CliError('Git returned malformed numstat');
    const stat = {
      additions: additions === '-' ? null : Number(additions),
      deletions: deletions === '-' ? null : Number(deletions),
      path: filePath,
    };
    if (originalPath !== undefined) stat.originalPath = originalPath;
    if (Number.isNaN(stat.additions) || Number.isNaN(stat.deletions)) {
      throw new CliError('Git returned malformed numstat values');
    }
    stats.push(stat);
  }
  return stats;
}

function prContextCommand(repoArg, baseRef, headRef) {
  const root = repositoryRoot(repoArg);
  const base = resolveCommit(root, baseRef, 'Base');
  const head = resolveCommit(root, headRef ?? 'HEAD', 'Head');
  const mergeBaseResult = runGit(['merge-base', base, head], root, { allowFailure: true });
  if (mergeBaseResult.status === 1) {
    throw new CliError('Base and head have no merge base (unrelated histories)');
  }
  if (mergeBaseResult.status !== 0) {
    throw new CliError(redactedGitError(mergeBaseResult.stderr) || 'git merge-base failed');
  }
  const mergeBase = mergeBaseResult.stdout.trim();

  const commits = runGit(['rev-list', '--reverse', `${mergeBase}..${head}`], root)
    .stdout.trim()
    .split(/\r?\n/)
    .filter(Boolean);
  const diffArgs = [
    '--no-ext-diff',
    '--no-textconv',
    '--find-renames',
    `${mergeBase}..${head}`,
  ];
  const nameStatus = runGit(['diff', '--name-status', '-z', ...diffArgs], root).stdout;
  const numstat = runGit(['diff', '--numstat', '-z', ...diffArgs], root).stdout;
  const changedFiles = parseNameStatus(nameStatus);
  const stats = parseNumstat(numstat);
  const statsByPath = new Map(stats.map((stat) => [stat.path, stat]));
  for (const file of changedFiles) {
    const stat = statsByPath.get(file.path);
    if (stat) {
      file.additions = stat.additions;
      file.deletions = stat.deletions;
    } else {
      file.additions = null;
      file.deletions = null;
    }
  }
  const shortStat = runGit(['diff', '--shortstat', ...diffArgs], root).stdout.trim();
  const dirty = runGit(['status', '--porcelain=v1', '-z', '--untracked-files=all'], root).stdout.length > 0;
  return {
    root,
    base,
    head,
    mergeBase,
    commits,
    changedFiles,
    stat: shortStat,
    workingTreeDirty: dirty,
  };
}

function templateCommand(name, output) {
  const content = readFileSync(path.join(ASSET_DIR, name), 'utf8');
  if (output === undefined) {
    process.stdout.write(content);
    return;
  }
  const destination = path.resolve(process.cwd(), output);
  try {
    writeFileSync(destination, content, { encoding: 'utf8', flag: 'wx' });
  } catch (error) {
    throw new CliError(`Unable to create template output: ${error.message}`);
  }
}

function main(argv = process.argv.slice(2)) {
  try {
    const args = parseArgs(argv);
    if (args.help) {
      process.stdout.write(args.command ? commandUsage(args.command) : usage());
      return 0;
    }
    if (args.command === 'status') process.stdout.write(`${JSON.stringify(statusCommand(args.repo))}\n`);
    else if (args.command === 'pr-context') {
      process.stdout.write(`${JSON.stringify(prContextCommand(args.repo, args.base, args.head))}\n`);
    } else templateCommand(args.positionals[0], args.output);
    return 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`git-kit: ${message}\n`);
    return 1;
  }
}

export { main, parseArgs, parsePorcelain, parseWorktreesPorcelain };

// Resolve links so a symlinked or junctioned skill install still runs.
function isMain() {
  if (!process.argv[1]) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}
if (isMain()) process.exitCode = main();
