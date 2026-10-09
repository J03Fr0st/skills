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

During delivery, the living `progress.md` beside the plan records slice state, evidence, decisions, and carried items; `/adlc-gate slice <id>` records the sign-offs delivery needs.

## 1. Locate the artifacts

Read the repository instructions, then find the work item's artifacts. Prefer an existing spec, plan, or tracker convention; the ADLC fallback is `docs/adlc/<slug>/{intent,spec,plan}.md`. When several work items exist and the user named none, list them with their stages and ask which one.

For each artifact present, read its `status` frontmatter, which is authoritative, and the reviewed revision in the last row of its `## Approvals` table. An `approved` artifact is **stale** when its current content hash differs from the approved revision:

```bash
sed -e '/^status:/d' -e '/^## Approvals/,$d' <artifact> | git hash-object --stdin
```

In PowerShell without Git Bash:

```powershell
$f = New-TemporaryFile; [IO.File]::WriteAllText($f, ((Get-Content -Raw <artifact>) -replace '(?m)^status:.*\n' -replace '(?ms)^## Approvals.*')); git hash-object --no-filters $f; Remove-Item $f
```

Treat a stale artifact as `draft`. When delivery has started, read `progress.md` for each slice's state and evidence and each carried item's `decide by`, and check them against the branch, open PR, and CI state; a state without reachable evidence counts as the previous state.

**Complete when:** every artifact for the work item has a known status, verified against its content hash, and every slice has a state backed by evidence.

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
| Plan approved, no `progress.md` | `/adlc-plan` to write it from the approved plan; the plan stays unchanged |
| A carried item or required sign-off is due at the next slice and undecided | `/adlc-gate slice <id>` |
| A slice is `implemented` | `code-review`; add `security-review` when the spec's constraints or risk call for it |
| A slice is `reviewed` | `verification-before-completion` |
| A slice is `verified` | `git-workflow` for commits and `pr-description` for the PR, within the user's authorization |
| Slices `ready` or `in-progress` | `implement`, or `orchestrate` for independent slices |
| Every slice `done`, and an incident or new need appears | A new `/adlc-intent` |

An upstream artifact that went stale after a downstream one was approved invalidates the downstream chain: route to the earliest stale gate.

**Complete when:** one row is selected from evidence rather than from labels or memory.

## 3. Hand off

For an `/adlc-*` stage, return the command with the evidence for the state and stop; only the user invokes it. For delivery, hand off to the named engineering skill only when implementation is authorized, passing the approved plan path as the contract and the `progress.md` path as the record to update. Return to `/adlc-flow` after each slice changes state.

**Complete when:** the user sees the current state, its evidence, and exactly one next command or authorized handoff.
