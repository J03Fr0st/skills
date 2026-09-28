---
name: adlc-intent
description: Capture a human's intent as a committed intent.md before agents build.
disable-model-invocation: true
---

# ADLC Intent

Write down what the human wants and why, in their words, before any agent designs or builds. The intent is the human's **thinking time** made durable: the agent interviews and records; the human supplies the problem, the outcome, and the judgement.

## 1. Locate the work item

Read the repository instructions and any existing issue, spec system, or tracker for this work. Write where the project already keeps this kind of record. Without a convention, use `docs/adlc/<slug>/intent.md`, with a kebab-case slug chosen now and never renamed.

When an intent already exists, revise it in place; a rejected one keeps its `## Approvals` history.

Approval hashes assume LF line endings. When `.gitattributes` has no LF rule covering the artifact directory, add one, such as `docs/adlc/** text eol=lf`, and tell the human why: with `core.autocrlf=true`, a fresh checkout would otherwise change every hash and make every approval look stale.

**Complete when:** the artifact path is fixed, an LF rule covers it, and any prior intent or rejection reasons are read.

## 2. Interview the human

Resolve discoverable facts from the repository first: current behavior, existing users of the code, prior decisions. Then ask the human for everything the code cannot tell you: the problem, who feels it, the outcome, why now, what is out of scope, and how success will be observed.

Ask the problem and why now as open questions and record the answers in the human's own words, quoted where they are short. Offer multiple-choice options only for scope, constraints, and success thresholds, and always leave room for a free-text answer.

Choose the depth:

- **Standard:** the need is mostly understood; ask the targeted questions still open.
- **Deep:** value, premise, or scope is contested, or the user asks to be grilled. Run `/grilling` and continue only after the user confirms its shared-understanding summary.

Record business, policy, and user facts only as the human states them. A fact inferred from code goes in **Assumptions** with an owner to confirm it.

**Complete when:** every section of the template has an answer from the human, an explicit "none", or an open question with an owner and a `decide by` stage.

## 3. Draft and correct

Write the artifact with [references/INTENT.md](references/INTENT.md). Keep it about the problem and the outcome; solutions, file paths, and designs belong to the spec and plan. A small change earns a short intent, and every section is still present.

Show the draft and ask the human to correct it. Apply their corrections verbatim in meaning.

**Complete when:** the human has replied to the draft, the success signal is observable, and every assumption and open question has an owner and a `decide by` stage.

## 4. Hand off to the gate

Leave `status: draft`; only `/adlc-gate` changes it. Return `/adlc-gate intent` with the artifact path and stop.

**Complete when:** the draft is saved and the gate command is visible.
