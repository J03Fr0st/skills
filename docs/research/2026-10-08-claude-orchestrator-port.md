# Claude Code port of codex-astra-luna-orchestrator

**Research date:** 2026-10-08
**Request:** create a Claude Code version of
[`donvito/codex-astra-luna-orchestrator`](https://github.com/donvito/codex-astra-luna-orchestrator)
as a new, separate GitHub repository.
**Deliverable:** `J03Fr0st/claude-opus-sonnet-orchestrator` (separate
repository; nothing is published from this skill library).

## Decision

Port the repository's structure and behavior to Claude Code's native
mechanisms, one for one, and generate every profile from one source file.

| Codex | Claude Code |
|---|---|
| `model`, `model_reasoning_effort` | `model`, `effortLevel` in `.claude/settings.json` |
| `agents.default_subagent_model` | `env.CLAUDE_CODE_SUBAGENT_MODEL` |
| `agents.max_concurrent_threads_per_session` | `env.CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` |
| `.codex/agents/<role>.toml` | `.claude/agents/<role>.md` with `model`, `effort`, `tools` |
| `sandbox_mode = "read-only"` | a `tools` list without `Edit`/`Write` |
| `spawn_agent` | `Agent` with `subagent_type` |
| `.agents/skills/astra-orchestrator/` | `.claude/skills/claude-orchestrator/` |
| `AGENTS.md` | `CLAUDE.md` |

Profiles mirror the original's six: Max (Opus high root, Sonnet high
execution, Opus medium reviewer), Pro (Sonnet xhigh root, Sonnet medium
execution, Opus low reviewer), 2-subagent variants of each, and two Fable
root/reviewer profiles mirroring the Sol profiles.

## Evidence

- Source snapshot: shallow clone of the default branch on 2026-10-08. All six
  profiles share one skill and five role prompts; they differ only in models,
  effort, and concurrency. The port therefore generates `profiles/` from
  `profiles.json` and `templates/` and tests for drift, rather than copying
  the original's six hand-maintained copies.
- Claude Code configuration was checked against current documentation
  (`sub-agents`, `settings-reference`, `model-config`, `env-vars`, `skills`,
  `memory` on code.claude.com):
  - Agent frontmatter accepts `model` (`opus`, `sonnet`, `haiku`, `fable`,
    full ID, `inherit`) and `effort` (`low` to `max`).
  - `effortLevel` in `settings.json` accepts only `low` to `xhigh`; `max` is
    session-only. Root efforts are therefore capped at `xhigh`, and the
    generator rejects `max` for the root.
  - `CLAUDE_CODE_EFFORT_LEVEL` overrides role files, so the guides steer
    users to `/effort` instead.
  - `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` (default 20) replaces Codex's
    thread limit.
- Transcript format for the token report was read from real local
  transcripts: `assistant` lines carry `message.model` and `message.usage`;
  subagents write `<session>/subagents/agent-<id>.jsonl` plus a
  `.meta.json` with `agentType`. One response is written once per content
  block, so the report deduplicates by `message.id` and `requestId`.
- End-to-end check with Claude Code 2.1.294: installed the Max profile into a
  scratch repository, ran a headless prompt that spawned `explorer` and
  `reviewer`, and read the transcripts with the port's `token_usage.py`. The
  root and reviewer were served by `claude-opus-5-5`; the explorer by
  `claude-sonnet-5-5`.

## Known gaps

- Codex's read-only sandbox has no exact Claude Code equivalent. The reviewer
  keeps `Bash` for `git diff` and tests, so its read-only behavior rests on
  its instructions.
- Fable profiles assume Fable is available on the account; the installer does
  not check.
- No paid benchmark was run. The token guide gives a protocol, not savings
  claims.

## Preferred sources

`docs/source-repos.md` was read. This request is a port of a user-supplied
reference, and the same design space was surveyed against all 13 preferred
repositories in
[2026-09-26-model-orchestration/preferred-sources.md](2026-09-26-model-orchestration/preferred-sources.md),
with deltas through 2026-10-06 in
[2026-10-06-source-repos-sweep.md](2026-10-06-source-repos-sweep.md). No
repository was re-surveyed for this port. Influence carried forward:

- `obra/superpowers` and `addyosmani/agent-skills`: one outcome per role and
  direct execution when routing adds nothing; already present in the
  original skill and kept.
- `cursor/plugins` (pstack): prose is not a lock, so concurrent writers get
  `isolation: "worktree"` guidance in the skill.
- `anthropics/skills` (`skill-creator`): skill `name` matches its directory
  and the description carries the trigger conditions.
- This library's own `orchestrate` skill
  (`skills/engineering/orchestrate/references/claude-code.md`): model
  resolution order, `CLAUDE_CODE_SUBAGENT_MODEL_FORCE`, and the rule that a
  configured model is not proof of the served model.

The remaining preferred repositories (`mattpocock/skills`,
`DietrichGebert/ponytail`, `mvanhorn/last30days-skill`, `trailofbits/skills`,
`EveryInc/compound-engineering-plugin`, `garrytan/gstack`, `affaan-m/ECC`,
`wshobson/agents`, `nahid-sparktales/agent-dispatcher`) were not applicable
beyond what the earlier ledger already records: the port's shape is fixed by
the reference repository.
