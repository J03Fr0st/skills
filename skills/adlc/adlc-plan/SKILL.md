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

In PowerShell without Git Bash:

```powershell
$f = New-TemporaryFile; [IO.File]::WriteAllText($f, ((Get-Content -Raw <spec>) -replace '(?m)^status:.*\n' -replace '(?ms)^## Approvals.*')); git hash-object --no-filters $f; Remove-Item $f
```

Otherwise return `/adlc-gate spec` and stop.

When the plan is already approved and current but has no `progress.md`, write only `progress.md`: each slice's state from its reachable evidence (commits, PRs, test runs), the carried items, and decisions already made during delivery with who made them and where. Leave the plan untouched and return `/adlc-flow`.

List the spec's approval conditions and its open questions and areas of concern with `decide by: plan` or a slice; this stage settles or schedules them.

**Complete when:** the spec is approved and current, its path and content hash are recorded as the plan's source, and its conditions and carried items are listed.

## 2. Slice the work

Run `planning-and-task-breakdown` with the approved spec as the contract and the plan artifact as its canonical save path. Its slices, interfaces, dependencies, review focus, ready frontier, and checks become the plan's core.

When planning uncovers a fact that contradicts the approved spec, stop and return `/adlc-spec` with the evidence. The plan carries the spec as settled; it does not quietly change it.

Slice headings carry no status: state changes during delivery, and an edit to the approved plan makes it stale. Slice state lives in `progress.md`.

**Complete when:** the slices, interfaces, dependencies, review focus, and ready frontier are written by that skill, with no placeholders.

## 3. Add the ADLC sections

Add the sections in [references/PLAN.md](references/PLAN.md):

- **Decisions**: every choice the plan makes that the spec left open (stack, hosting, thresholds, sequencing), each with an ID and its evidence, including every spec condition and item due by `plan` that it settles.
- **Carried items**: every spec item still undecided, with an owner and a `decide by` slice that precedes any slice building on it.
- **Coverage**: every acceptance criterion maps to the slices that deliver it and the check that proves it.
- **Assignment**: who executes each slice (a human, an agent role, or `orchestrate`), and a verifier who is separate from the implementer.
- **Risks and rollback**: what could go wrong and how each slice is undone.
- **Handoff**: `implement`, or `orchestrate` when slices are independent, and the rule that delivery updates `progress.md`.

Write `progress.md` beside the plan with [references/PROGRESS.md](references/PROGRESS.md): every slice at `ready` or `blocked`, and the carried items. It is a living record, never hashed or gated.

**Complete when:** every spec condition and due item is settled under Decisions or carried to a slice, every acceptance criterion is covered, every slice has an implementer and a separate verifier, `progress.md` lists every slice, and a fresh reader could start the first ready slice from the plan alone.

## 4. Hand off to the gate

Rerun that skill's proportion check across the whole plan, ADLC sections included. Show the plan to the human with each entry under Decisions called out, and ask for a reply to each. Apply their corrections. Leave `status: draft`. Return `/adlc-gate plan` with the artifact path and stop.

**Complete when:** the human has replied to the plan and the gate command is visible.
