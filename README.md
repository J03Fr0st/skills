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
- [html-writeup](docs/html-writeup.md) — build and verify a self-contained HTML document
  with diagrams, tables, and code, verified in a real browser.

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
enforcement. See the repository license for attribution.
