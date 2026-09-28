# Progress record

`progress.md` sits beside the plan and is the living delivery record. It has no `status` or `## Approvals`, is never hashed, and never makes the plan stale. Delivery updates it at each slice state change; `/adlc-gate slice <id>` records human sign-offs in it; `/adlc-flow` reads it to route delivery.

Slice states, in order: `blocked`, `ready`, `in-progress`, `implemented`, `reviewed`, `verified`, `done` (merged). Evidence is a commit, PR, test run, or review a fresh session can reach.

```markdown
---
adlc: progress
slug: <slug>
plan: <plan path>
---

# <Title> progress

> Living delivery record; never hashed or gated.

## Slices

| Slice | State | Evidence | Updated |
| --- | --- | --- | --- |
| S1 | ready | — | <date> |

## Decisions

| Date | Slice | Decision | Approver | Evidence | Conditions |
| --- | --- | --- | --- | --- | --- |

## Carried items

| Item | Source | Owner | Decide by | State |
| --- | --- | --- | --- | --- |
| <condition, question, or concern> | <spec, plan, or slice decision> | <who decides> | <slice> | open |
```

Record decisions made without a gate, such as stacking one slice's PR on another, as Decisions rows with the human who made them.
