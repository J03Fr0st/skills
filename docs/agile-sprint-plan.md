# Agile Sprint Plan

`agile-sprint-plan` creates a realistic delivery forecast around one observable goal.

- **Invocation:** model-invoked for sprint planning, iteration planning, capacity decisions, or selecting Ready backlog work.
- **Output:** one proposed or updated cycle record.

## Planning posture

The skill uses explicit availability or historical throughput when available and labels capacity assumptions when it is not. It selects the smallest coherent set of Ready items that can achieve the goal, accounts for dependencies and interruption allowance, and keeps stretch work outside the commitment.

Where agents carry part of the delivery, the capacity basis says so and accounts for the review each piece still needs. Agent throughput is not free capacity, and unreviewed agent output is not delivered work.

Items whose value, acceptance, boundary, or readiness remain unresolved return to `agile-refine`. Detailed implementation steps remain in the repository's technical planning workflow.

## Cycle record

The record contains the goal, capacity basis, selected work, risks, dependencies, exclusions, delivery changes, evidence, review, retrospective, and improvement experiment. Each selected item records the items blocking it, so the deliverable order is readable without reconstructing it. Later skills update this same document instead of creating separate ceremony reports.
