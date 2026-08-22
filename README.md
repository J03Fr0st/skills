# J03Fr0st Skills

[![skills.sh](https://skills.sh/b/J03Fr0st/skills)](https://skills.sh/J03Fr0st/skills)

J03Fr0st's public library of original agent skills.

## Skills

### User-invoked

- [agile-flow](docs/agile-flow.md) — route work from its evidenced current state
  through refinement, planning, delivery, product review, and learning.

### Model-invoked

- [agile-refine](docs/agile-refine.md) — shape one valuable, Ready backlog item,
  with deep Grill Me refinement when important decisions remain hidden.
- [agile-sprint-plan](docs/agile-sprint-plan.md) — plan one coherent delivery
  cycle around an observable goal and realistic capacity.
- [agile-sprint-review](docs/agile-sprint-review.md) — review working behavior
  against intended outcomes and record stakeholder acceptance.
- [agile-retro](docs/agile-retro.md) — turn delivery evidence into one bounded,
  measurable improvement experiment.
- [codebase-design](docs/codebase-design.md) — design cohesive modules,
  evidence-gated abstractions, intentional dependency direction, and explicit
  inter-module contracts.
- [code-review](docs/code-review.md) — review changes at quick, standard, or
  deep depth with a bounded default and evidence-backed findings.
- [html-writeup](docs/html-writeup.md) — build and verify a self-contained HTML document
  with diagrams, tables, and code, verified in a real browser.
- [writing-for-agents](docs/writing-for-agents.md) — write skills, `AGENTS.md`,
  and `CLAUDE.md` so an agent reaches the right material and takes the same path
  through it every run.
- [writing-for-humans](docs/writing-for-humans.md) — write and revise clear,
  specific, genre-aware prose while preserving meaning and the author's voice.

## Install

```bash
npx skills@latest add J03Fr0st/skills
```

## Claude Code plugin

```text
/plugin marketplace add J03Fr0st/skills
/plugin install j03fr0st-skills@j03fr0st
```

## Repository structure

- `skills/` — original skills, added when ready
- `docs/` — human-facing skill documentation
- `scripts/` — maintainer helpers
- `.claude-plugin/` — Claude Code plugin metadata
- `.changeset/` — versioning metadata
- `.github/workflows/` — release automation

## Attribution

The repository shell is based on
[`mattpocock/skills`](https://github.com/mattpocock/skills). The Agile suite
adapts that project's design-tree/frontier model for deep refinement and draws
on its composability, plus the delivery guardrails of
[`obra/superpowers`](https://github.com/obra/superpowers). No upstream skill
files are vendored; the suite's instructions and artifact contracts are
maintained here. `codebase-design`
adapts Matt Pocock's original deep-module vocabulary and expands it with
source-backed guidance for simplicity and abstraction timing, decomposition,
dependency direction, communication, reliability, testing, observability, and
enforcement. `writing-for-humans` is original work informed by a comparative
read of this family of skills and their published evaluations: it adapts the
editorial intent of Cursor's `pstack/unslop`, meaning-preservation gates from
[`jlevy/practical-prose`](https://github.com/jlevy/practical-prose), mode
separation and structural validation from
[`conorbronsdon/avoid-ai-writing`](https://github.com/conorbronsdon/avoid-ai-writing),
check-only operation from
[`tornikegomareli/agent-rules`](https://github.com/tornikegomareli/agent-rules),
and genre-sensitive voice precedence from
[`blader/humanizer`](https://github.com/blader/humanizer). See the repository
license for attribution.

`writing-for-agents` deliberately reuses the name of Matt Pocock's
[`writing-for-agents`](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-for-agents)
and adapts its conceptual vocabulary: the two loads, context pointers, the
information hierarchy, completion criteria, leading words, and the pruning
discipline. It extends that base with the failure-form taxonomy,
rationalization tables, baseline-first testing, and wording micro-tests from
[`obra/superpowers`](https://github.com/obra/superpowers) `writing-skills`, and
with the layout conventions, three-level loading model, eval-set shape, and
no-surprise principle from Anthropic's
[`skill-creator`](https://github.com/anthropics/skills). Where those sources
conflict — what a skill `description` should contain, and how strict the testing
gate should be — the skill states the conflict and resolves it rather than
picking a side silently. No upstream skill file is vendored.

`code-review` preserves the useful Standards and Spec separation from Matt
Pocock's
[`code-review`](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review)
while adding a defect-first finding gate, explicit review levels, and
independent validation for deep reviews. Its merge-base and contextual review
discipline is informed by
[`openai/codex`](https://github.com/openai/codex), and its deep parallel-pass
shape is informed by
[`anthropics/claude-code`](https://github.com/anthropics/claude-code). No
upstream skill file is vendored; the instructions are maintained here.
