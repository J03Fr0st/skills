# Plan artifact

`planning-and-task-breakdown` owns the slice list, dependencies, and ready frontier. This file adds the ADLC frame around them. Adapt headings to an existing project convention.

```markdown
---
adlc: plan
slug: <slug>
status: draft
source: <spec path>@<content hash>
---

# <Title> plan

> Drafted by an agent from the approved spec.

## Slices

<slices with interfaces, dependencies, and ready frontier from planning-and-task-breakdown; no status in slice headings>

## Review focus

<ranked failure modes no slice check exercises yet, each with its owning slice>

## Decisions

| ID | Decision | Settles | Evidence |
| --- | --- | --- | --- |
| D1 | <stack, hosting, threshold, sequencing, ...> | <spec condition, open question, area of concern, or —> | <research, measurement, or reason> |

## Carried items

- <spec item still undecided> — owner: <who decides> — decide by: <slice that precedes any slice building on it>

## Coverage

| Acceptance criterion | Slices | Check |
| --- | --- | --- |
| AC-001 | S1, S2 | <test or check that proves it> |

## Assignment

| Slice | Implementer | Verifier |
| --- | --- | --- |
| S1 | <human, agent role, or orchestrate> | <someone other than the implementer> |

## Risks and rollback

- <risk> — mitigation: <...>; rollback: <how the slice is undone>

## Handoff

<implement | orchestrate>, starting from the ready frontier. Delivery records each slice state change, its evidence, and every decision made during delivery in `progress.md` beside this plan; a sign-off the plan or a carried item requires goes through `/adlc-gate slice <id>`.

## Approvals
```
