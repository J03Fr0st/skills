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

<slices, dependencies, and ready frontier from planning-and-task-breakdown>

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

<implement | orchestrate>, starting from the ready frontier.

## Approvals
```
