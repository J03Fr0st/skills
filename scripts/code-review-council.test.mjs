import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { parseArgs, runCouncil } from '../skills/engineering/code-review/scripts/council.mjs';

const WINDOWS = process.platform === 'win32';

// A fake reviewer CLI: either echoes the brief from stdin or sleeps past the timeout.
function fakeReviewer(dir, name, behaviour) {
  if (WINDOWS) {
    const body = behaviour === 'echo' ? '@echo off\r\nmore\r\n' : '@echo off\r\nping -n 30 127.0.0.1 >nul\r\n';
    writeFileSync(join(dir, `${name}.cmd`), body);
  } else {
    const path = join(dir, name);
    writeFileSync(path, behaviour === 'echo' ? '#!/bin/sh\ncat\n' : '#!/bin/sh\nsleep 30\n');
    chmodSync(path, 0o755);
  }
}

function sandbox() {
  const root = mkdtempSync(join(tmpdir(), 'council-test-'));
  const bin = join(root, 'bin');
  const brief = join(root, 'brief.md');
  writeFileSync(brief, 'REVIEW BRIEF MARKER\n');
  mkdirSync(bin);
  return { root, bin, brief, env: { PATH: bin, PATHEXT: '.CMD' }, cleanup: () => rmSync(root, { recursive: true, force: true }) };
}

function options(box, reviewers, extra = {}) {
  return { brief: box.brief, out: join(box.root, 'out'), repo: box.root, reviewers, timeoutMs: 60_000, dryRun: false, ...extra };
}

test('parseArgs rejects an unknown reviewer family', () => {
  assert.throws(() => parseArgs(['--brief', 'b', '--out', 'o', '--reviewers', 'codex,grok']), /unknown reviewer family "grok"/);
});

test('parseArgs drops the excluded host family', () => {
  const parsed = parseArgs(['--brief', 'b', '--out', 'o', '--exclude', 'claude']);
  assert.deepEqual(parsed.reviewers, ['codex', 'gemini']);
});

test('a reviewer whose CLI is not installed is reported missing, not failed', async () => {
  const box = sandbox();
  try {
    const summary = await runCouncil(options(box, ['codex']), box.env);
    assert.equal(summary.reviewers[0].status, 'missing');
    assert.match(summary.reviewers[0].error, /codex/);
  } finally {
    box.cleanup();
  }
});

test('an installed reviewer receives the brief on stdin and its answer is saved', async () => {
  const box = sandbox();
  try {
    fakeReviewer(box.bin, 'claude', 'echo');
    const summary = await runCouncil(options(box, ['claude']), box.env);
    const [claude] = summary.reviewers;
    assert.equal(claude.status, 'ok', JSON.stringify(claude));
    assert.match(readFileSync(claude.outputFile, 'utf8'), /REVIEW BRIEF MARKER/);
  } finally {
    box.cleanup();
  }
});

test('a reviewer still running at the timeout is stopped and reported as timeout', async () => {
  const box = sandbox();
  try {
    fakeReviewer(box.bin, 'gemini', 'sleep');
    const started = Date.now();
    const summary = await runCouncil(options(box, ['gemini'], { timeoutMs: 1_000 }), box.env);
    assert.equal(summary.reviewers[0].status, 'timeout');
    assert.ok(Date.now() - started < 20_000, 'timeout did not stop the reviewer promptly');
  } finally {
    box.cleanup();
  }
});

test('dry run resolves commands without launching anything', async () => {
  const box = sandbox();
  try {
    fakeReviewer(box.bin, 'claude', 'echo');
    const summary = await runCouncil(options(box, ['claude', 'codex'], { dryRun: true }), box.env);
    assert.equal(summary.dryRun, true);
    assert.equal(summary.reviewers[0].bin, 'claude');
    assert.ok(summary.reviewers[0].args.includes('dontAsk'), 'claude must run without edit permission');
    assert.equal(summary.reviewers[1].status, 'missing');
  } finally {
    box.cleanup();
  }
});
