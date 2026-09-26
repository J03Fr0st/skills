---
name: adlc-spec
description: Turn an approved intent.md into a testable spec.md.
disable-model-invocation: true
---

# ADLC Spec

Turn approved intent into observable behavior and numbered acceptance criteria that an agent can build against and a verifier can check. The spec says **what** the system does; the plan decides how.

## 1. Check the precondition

Read the intent beside this work item (`docs/adlc/<slug>/intent.md` or the project's convention). Continue only when its `status` is `approved` and its current content hash matches the approved revision in its `## Approvals` table:

```bash
sed -e '/^status:/d' -e '/^## Approvals/,$d' <intent> | git hash-object --stdin
```

Otherwise return `/adlc-gate intent` and stop.

**Complete when:** the intent is approved and current, and its path and content hash are recorded as the spec's source.

## 2. Derive the behavior

Read the relevant code before asking any technical question. Carry every intent outcome into observable behavior from the user's or calling system's side, and every non-goal into **Out of scope**.

Apply constraints now, while the spec is written: security, privacy, compliance, performance, and compatibility. Settle uncertain external facts with `research`, a consequential module boundary with `codebase-design`, and a question an experiment can answer with `prototype`. Ask the human about each remaining choice that changes acceptance, scope, or risk.

When the behavior would contradict the approved intent, stop drafting and return `/adlc-intent` with the conflict.

**Complete when:** every intent outcome has behavior, and every open question from the intent is resolved or carried with an owner.

## 3. Draft the spec

Write the artifact with [references/SPEC.md](references/SPEC.md), beside the intent. Each acceptance criterion names a scenario, an action, an expected observable result, and how it will be verified. Keep the spec free of file paths and code.

Flag each policy conflict or judgement call under **Areas of concern** with an owner; the human resolves those, not the agent.

**Complete when:** every outcome maps to at least one acceptance criterion, every criterion is observable and has a verification method, and every concern has an owner.

## 4. Hand off to the gate

Show the draft to the human and apply their corrections. Leave `status: draft`. Return `/adlc-gate spec` with the artifact path and stop.

**Complete when:** the human has reviewed the draft and the gate command is visible.
