# ADLC Plan

`adlc-plan` turns an approved spec into a plan that someone who never saw the conversation could execute.

- **Invocation:** user-invoked only.
- **Output:** a draft `plan.md` with slices, acceptance coverage, assignment, risks, rollback, and the delivery handoff.

## How it works

The skill starts only from an approved, unchanged spec. It composes [`planning-and-task-breakdown`](../engineering/planning-and-task-breakdown.md) for slices, interfaces, dependencies, review focus, and the ready frontier, then adds:

- **Coverage:** every acceptance criterion mapped to slices and the check that proves it.
- **Assignment:** an implementer and a separate verifier for each slice.
- **Risks and rollback:** how each slice can go wrong and be undone.
- **Handoff:** [`implement`](../engineering/implement.md), or [`orchestrate`](../engineering/orchestrate.md) for independent slices.

When planning finds a fact that contradicts the spec, the skill stops and routes back to `/adlc-spec` instead of changing the approved behavior. Before review, the whole plan gets that skill's proportion check. The draft ends at `/adlc-gate plan`.

The [2026-09-27 source sweep](../research/2026-09-27-source-repos-sweep.md) adds interfaces, review focus, and the proportion check from Superpowers' `writing-plans`.
