# Agile

Five composable skills for evidence-led software delivery. They preserve the project's tracker, documentation, implementation workflow, and human decision gates instead of installing a parallel process.

## User-invoked

- [`agile-flow`](agile-flow/SKILL.md) — inspect current state and route work through the suite. This is the one command to remember.

## Model-invoked

- [`agile-refine`](agile-refine/SKILL.md) — shape one valuable Ready item; deep refinement contains the full Grill Me decision-tree mode.
- [`agile-sprint-plan`](agile-sprint-plan/SKILL.md) — choose one cycle goal and a realistic set of Ready work.
- [`agile-sprint-review`](agile-sprint-review/SKILL.md) — accept or reject delivered outcomes from working behavior and fresh evidence.
- [`agile-retro`](agile-retro/SKILL.md) — turn delivery evidence into one bounded improvement experiment.

## Flow

```text
agile-refine -> agile-sprint-plan -> repository delivery workflow
                                           |
                                           v
                              agile-sprint-review -> agile-retro
```

`agile-flow` can enter this lifecycle at any evidenced state. It routes implementation to the repository's existing planning, TDD, testing, security, and code-review practices.

## Artifacts

The suite prefers an existing product context, working agreements, canonical tracker, code and tests. Planning creates one cycle record; review and retrospective update the same record. Raw interviews, agent transcripts, copied logs, and temporary plans stay ephemeral unless their conclusions deserve promotion.

Artifacts an agent drafts carry a line saying so. A tracker records only the account that posted an item, so without it a reader cannot tell evidence from inference, and these artifacts outlive the session that produced them.
