---
name: adlc-flow
description: Route a piece of work through the agentic development lifecycle.
disable-model-invocation: true
---

# ADLC Flow

Find where one piece of work actually stands in the agentic development lifecycle and name the single next command or delivery handoff. The router is read-only: it drafts nothing and approves nothing.

The lifecycle is a chain of committed artifacts, each read by the next stage and each passed through a human **gate**:

```text
/adlc-intent -> /adlc-gate intent -> /adlc-spec -> /adlc-gate spec
  -> /adlc-plan -> /adlc-gate plan -> engineering delivery
```

## 1. Locate the artifacts

Read the repository instructions, then find the work item's artifacts. Prefer an existing spec, plan, or tracker convention; the ADLC fallback is `docs/adlc/<slug>/{intent,spec,plan}.md`. When several work items exist and the user named none, list them with their stages and ask which one.

For each artifact present, read its `status` frontmatter, which is authoritative, and the reviewed revision in the last row of its `## Approvals` table. An `approved` artifact is **stale** when its current content hash differs from the approved revision:

```bash
sed -e '/^status:/d' -e '/^## Approvals/,$d' <artifact> | git hash-object --stdin
```

Treat a stale artifact as `draft`. Also read the branch, open PR, and CI state when delivery has started.

**Complete when:** every artifact for the work item has a known status, verified against its content hash.

## 2. Choose the next stage

Take the first unresolved row:

| Evidenced state | Next |
| --- | --- |
| No intent, or only a fuzzy idea | `/adlc-intent` |
| Intent is draft, rejected, or stale | `/adlc-gate intent`, or revise with `/adlc-intent` when rejected |
| Intent approved, no spec | `/adlc-spec` |
| Spec is draft, rejected, or stale | `/adlc-gate spec`, or revise with `/adlc-spec` when rejected |
| Spec approved, no plan | `/adlc-plan` |
| Plan is draft, rejected, or stale | `/adlc-gate plan`, or revise with `/adlc-plan` when rejected |
| Plan approved, slices open | `implement`, or `orchestrate` for independent slices |
| Slices done, change unreviewed | `code-review`; add `security-review` when the spec's constraints or risk call for it |
| Change reviewed | `verification-before-completion`, then `git-workflow` for commit and PR within the user's authorization |
| Merged or deployed, and an incident or new need appears | A new `/adlc-intent` |

An upstream artifact that went stale after a downstream one was approved invalidates the downstream chain: route to the earliest stale gate.

**Complete when:** one row is selected from evidence rather than from labels or memory.

## 3. Hand off

For an `/adlc-*` stage, return the command with the evidence for the state and stop; only the user invokes it. For delivery, hand off to the named engineering skill only when implementation is authorized, passing the approved plan path as the contract.

**Complete when:** the user sees the current state, its evidence, and exactly one next command or authorized handoff.
