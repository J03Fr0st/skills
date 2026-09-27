---
name: adlc-plan
description: Plan covered, assigned slices from an approved spec.md.
disable-model-invocation: true
---

# ADLC Plan

Turn an approved spec into a plan that an engineer or agent who never saw the conversation could execute alone. Slicing belongs to `planning-and-task-breakdown`; this stage adds acceptance coverage, assignment, risk, and the delivery handoff.

## 1. Check the precondition

Read the spec beside this work item (`docs/adlc/<slug>/spec.md` or the project's convention). Continue only when its `status` is `approved` and its current content hash matches the approved revision in its `## Approvals` table:

```bash
sed -e '/^status:/d' -e '/^## Approvals/,$d' <spec> | git hash-object --stdin
```

Otherwise return `/adlc-gate spec` and stop.

**Complete when:** the spec is approved and current, and its path and content hash are recorded as the plan's source.

## 2. Slice the work

Run `planning-and-task-breakdown` with the approved spec as the contract and the plan artifact as its canonical save path. Its slices, interfaces, dependencies, review focus, ready frontier, and checks become the plan's core.

When planning uncovers a fact that contradicts the approved spec, stop and return `/adlc-spec` with the evidence. The plan carries the spec as settled; it does not quietly change it.

**Complete when:** the slices, interfaces, dependencies, review focus, and ready frontier are written by that skill, with no placeholders.

## 3. Add the ADLC sections

Add the sections in [references/PLAN.md](references/PLAN.md):

- **Coverage**: every acceptance criterion maps to the slices that deliver it and the check that proves it.
- **Assignment**: who executes each slice (a human, an agent role, or `orchestrate`), and a verifier who is separate from the implementer.
- **Risks and rollback**: what could go wrong and how each slice is undone.
- **Handoff**: `implement`, or `orchestrate` when slices are independent.

**Complete when:** every acceptance criterion is covered, every slice has an implementer and a separate verifier, and a fresh reader could start the first ready slice from the plan alone.

## 4. Hand off to the gate

Rerun that skill's proportion check across the whole plan, ADLC sections included. Show the plan to the human and apply their corrections. Leave `status: draft`. Return `/adlc-gate plan` with the artifact path and stop.

**Complete when:** the human has reviewed the plan and the gate command is visible.
