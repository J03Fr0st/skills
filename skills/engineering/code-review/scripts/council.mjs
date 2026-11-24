#!/usr/bin/env node
// Runs external code reviewers from other model families, read-only and in
// parallel, for the code-review skill's `council` level. Each reviewer gets the
// same brief on stdin. The script never edits the repository; it only writes
// reviewer output into --out. See ../references/COUNCIL.md.

import { spawn, spawnSync } from 'node:child_process';
import { createWriteStream, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { delimiter, dirname, join, resolve } from 'node:path';
import { parseArgs as parseNodeArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

export const FAMILIES = ['codex', 'gemini', 'claude'];
export const DEFAULT_TIMEOUT_SECONDS = 900;
const INSTRUCTION = 'Follow the code review brief provided on stdin. Work read-only and answer only in the format the brief requires.';

// Each family lists the executables that can serve it, in preference order.
// Flags were checked against: codex-cli 0.166.0, Claude Code 2.1.317, agy 1.5.13,
// and Trail of Bits second-opinion's Gemini CLI 0.59.0 reference.
export const REVIEWERS = {
  codex: [
    {
      bin: 'codex',
      output: 'file',
      args: ({ repo, outputFile }) => [
        'exec', '--sandbox', 'read-only', '--ephemeral', '--skip-git-repo-check',
        '-C', repo, '-o', outputFile, '-',
      ],
    },
  ],
  gemini: [
    {
      bin: 'gemini',
      output: 'stdout',
      args: () => ['--approval-mode', 'default', '--output-format', 'text', '--prompt', INSTRUCTION],
    },
    {
      // agy print mode ignores stdin, and an inline brief can exceed the
      // command-line length limit, so it reads the brief file instead.
      bin: 'agy',
      output: 'stdout',
      args: ({ brief }) => [
        '--output-format', 'text', '--disable-slash-commands', '--sandbox', '--add-dir', dirname(brief),
        `-p=Read the code review brief in the file ${brief} and follow it exactly. Work read-only and answer only in the format the brief requires.`,
      ],
    },
  ],
  claude: [
    {
      bin: 'claude',
      output: 'stdout',
      args: () => [
        '-p', '--permission-mode', 'dontAsk', '--no-session-persistence', '--output-format', 'text',
        '--allowed-tools', 'Read,Grep,Glob',
      ],
    },
  ],
};

const USAGE = `Usage: node council.mjs --brief <file> --out <dir> [options]

Runs each selected reviewer read-only and in parallel, feeding the brief on
stdin, and prints a JSON summary with one entry per reviewer.

Options:
  --brief <file>        Review brief with the packet filled in (required)
  --out <dir>           Directory for <family>.md and <family>.stderr.log (required)
  --repo <dir>          Repository root the reviewers may read (default: cwd)
  --reviewers <list>    Comma-separated families: ${FAMILIES.join(', ')} (default: all)
  --exclude <family>    Drop one family, normally the host's own (repeatable)
  --timeout <seconds>   Stop a reviewer still running after this long (default: ${DEFAULT_TIMEOUT_SECONDS})
  --dry-run             Print the resolved commands without running them
  --help                Show this help

Commands per family (first installed executable wins):
${Object.entries(REVIEWERS)
  .map(([family, options]) => options
    .map((o) => `  ${family}: ${o.bin} ${o.args({ repo: '<repo>', outputFile: '<out>/' + family + '.md', brief: '<brief>' }).join(' ')} < brief`)
    .join('\n'))
  .join('\n')}

Statuses: ok (exit 0 with output), failed, timeout, missing (no executable found).
`;

export function parseArgs(argv) {
  const { values } = parseNodeArgs({
    args: argv,
    options: {
      brief: { type: 'string' },
      out: { type: 'string' },
      repo: { type: 'string', default: process.cwd() },
      reviewers: { type: 'string', default: FAMILIES.join(',') },
      exclude: { type: 'string', multiple: true, default: [] },
      timeout: { type: 'string', default: String(DEFAULT_TIMEOUT_SECONDS) },
      'dry-run': { type: 'boolean', default: false },
      help: { type: 'boolean', default: false },
    },
    strict: true,
  });
  if (values.help) return { help: true };
  if (!values.brief) throw new Error('--brief is required');
  if (!values.out) throw new Error('--out is required');
  const reviewers = values.reviewers.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  for (const name of [...reviewers, ...values.exclude]) {
    if (!FAMILIES.includes(name)) throw new Error(`unknown reviewer family "${name}"; use ${FAMILIES.join(', ')}`);
  }
  const timeout = Number(values.timeout);
  if (!Number.isFinite(timeout) || timeout <= 0) throw new Error('--timeout must be a positive number of seconds');
  return {
    brief: resolve(values.brief),
    out: resolve(values.out),
    repo: resolve(values.repo),
    reviewers: [...new Set(reviewers)].filter((r) => !values.exclude.includes(r)),
    timeoutMs: timeout * 1000,
    dryRun: values['dry-run'],
  };
}

// Finds an executable on PATH, honouring PATHEXT on Windows.
export function resolveBin(name, env = process.env) {
  const dirs = (env.PATH ?? env.Path ?? '').split(delimiter).filter(Boolean);
  const exts = process.platform === 'win32'
    ? ['.exe', ...(env.PATHEXT ?? '.COM;.EXE;.BAT;.CMD').split(';').map((e) => e.toLowerCase()).filter((e) => e !== '.exe')]
    : [''];
  for (const dir of dirs) {
    for (const ext of exts) {
      const candidate = join(dir, name + ext);
      try {
        if (statSync(candidate).isFile()) return candidate;
      } catch {
        // not here
      }
    }
  }
  return null;
}

export function planReviewers(options, env = process.env) {
  return options.reviewers.map((family) => {
    const outputFile = join(options.out, `${family}.md`);
    const stderrFile = join(options.out, `${family}.stderr.log`);
    for (const candidate of REVIEWERS[family]) {
      const path = resolveBin(candidate.bin, env);
      if (path) {
        return {
          family,
          bin: candidate.bin,
          path,
          output: candidate.output,
          args: candidate.args({ repo: options.repo, outputFile, brief: options.brief }),
          outputFile,
          stderrFile,
        };
      }
    }
    const tried = REVIEWERS[family].map((c) => c.bin).join(', ');
    return { family, missing: true, error: `none of ${tried} is on PATH` };
  });
}

// Windows batch shims (.cmd/.bat) need a shell; quote every argument for cmd.exe.
function quoteForCmd(arg) {
  if (/^[\w\-.,:=/\\]+$/.test(arg)) return arg;
  return `"${arg.replace(/"/g, '""')}"`;
}

function launch(plan, options) {
  const needsShell = process.platform === 'win32' && /\.(cmd|bat)$/i.test(plan.path);
  const command = needsShell ? [plan.path, ...plan.args].map(quoteForCmd).join(' ') : plan.path;
  return spawn(command, needsShell ? [] : plan.args, {
    cwd: options.repo,
    shell: needsShell,
    detached: process.platform !== 'win32',
    windowsHide: true,
    stdio: ['pipe', 'pipe', 'pipe'],
  });
}

function stopTree(child) {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true });
  } else {
    try {
      process.kill(-child.pid, 'SIGKILL');
    } catch {
      child.kill('SIGKILL');
    }
  }
}

function tail(text, max = 2000) {
  return text.length > max ? text.slice(-max) : text;
}

export function runReviewer(plan, options, brief) {
  if (plan.missing) {
    return Promise.resolve({ family: plan.family, status: 'missing', error: plan.error });
  }
  const started = Date.now();
  return new Promise((done) => {
    const child = launch(plan, options);
    const stdoutTarget = createWriteStream(plan.output === 'stdout' ? plan.outputFile : `${plan.outputFile}.stdout.log`);
    const stderrTarget = createWriteStream(plan.stderrFile);
    let stderrText = '';
    child.stdout.pipe(stdoutTarget);
    child.stderr.on('data', (chunk) => {
      stderrText = tail(stderrText + chunk.toString());
      stderrTarget.write(chunk);
    });
    child.stdin.on('error', () => {}); // a reviewer that exits early closes stdin
    child.stdin.end(brief);

    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      stopTree(child);
    }, options.timeoutMs);

    // 'error' and 'close' can both fire for one child; settle once.
    let settled = false;
    const finish = (code, spawnError) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      stdoutTarget.end(() => {
        stderrTarget.end();
        const seconds = Math.round((Date.now() - started) / 1000);
        const hasOutput = existsSync(plan.outputFile) && readFileSync(plan.outputFile, 'utf8').trim().length > 0;
        let status = 'ok';
        if (timedOut) status = 'timeout';
        else if (spawnError || code !== 0 || !hasOutput) status = 'failed';
        const result = { family: plan.family, bin: plan.bin, status, exitCode: code, seconds, outputFile: plan.outputFile, stderrFile: plan.stderrFile };
        if (spawnError) result.error = spawnError.message;
        else if (status === 'failed' && !hasOutput) result.error = 'no review output';
        if (status !== 'ok' && stderrText.trim()) result.stderrTail = stderrText.trim();
        done(result);
      });
    };
    child.on('error', (error) => finish(null, error));
    child.on('close', (code) => finish(code));
  });
}

export async function runCouncil(options, env = process.env) {
  const brief = readFileSync(options.brief, 'utf8');
  if (!brief.trim()) throw new Error(`brief is empty: ${options.brief}`);
  const plans = planReviewers(options, env);
  if (options.dryRun) {
    return {
      dryRun: true,
      reviewers: plans.map((p) => (p.missing
        ? { family: p.family, status: 'missing', error: p.error }
        : { family: p.family, bin: p.bin, path: p.path, args: p.args })),
    };
  }
  mkdirSync(options.out, { recursive: true });
  const reviewers = await Promise.all(plans.map((plan) => runReviewer(plan, options, brief)));
  return { repo: options.repo, reviewers };
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`council: ${error.message}\n\n${USAGE}`);
    process.exit(2);
  }
  if (options.help) {
    process.stdout.write(USAGE);
    return;
  }
  if (!existsSync(options.brief)) {
    process.stderr.write(`council: brief not found: ${options.brief}\n`);
    process.exit(2);
  }
  if (!options.reviewers.length) {
    process.stderr.write('council: no reviewers selected after exclusions\n');
    process.exit(2);
  }
  const summary = await runCouncil(options);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
