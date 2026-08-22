# Code Review

`code-review` reviews a defined set of changes and reports only introduced, concrete problems that the author can act on. One public skill covers three depths so callers can ask for more evidence without learning separate review workflows.

- **Invocation:** model-invoked for working-tree, commit, branch, pull-request, pre-merge, specification-compliance, and repository-standards reviews.
- **Default:** `standard`, a bounded single-reviewer pass.
- **Posture:** read-only during review. Fixing, publishing, approving, merging, committing, and posting remote comments require separate authorization.
- **Output:** severity-ordered findings first, followed by the exact review scope and residual risks.

## Review levels

| Level      | Best for                              | Evidence budget                                                                                         |
| ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `quick`    | Small changes and fast preflight      | Complete diff, repository rules, supplied intent, and only the local context needed to prove an obvious issue |
| `standard` | Most branch and pull-request reviews  | Complete merge-base diff, nearby behavior, readily available intent, callers or tests that settle candidates, and at most a narrow targeted check |
| `deep`     | High-risk or explicitly thorough work | Independent defects, specification, and standards/architecture passes; selective history and checks; a separate candidate-validation stage |

The skill never silently escalates. If a standard review encounters authorization, money, destructive data work, migrations, concurrency, cross-process retries, or public compatibility, it completes the bounded review and names deep review as a residual-risk recommendation.

## Review boundary

The target may be a pull request, explicit diff, commit range, branch, staged changes, or the whole working tree. Branch and pull-request reviews use the merge base with the branch they will merge into, resolved against the remote-tracking ref when the local base is stale, so the result describes what would actually land. The reviewed branch's own upstream is never the base, because that would hide everything already pushed. Working-tree reviews include untracked files as additions, excluding ignored paths.

A base that does not resolve, or an empty range, is reported as a scope problem instead of being reviewed. A change too large to cover honestly at the selected level is never sampled in silence: the skill says so, reviews the highest-risk files in full, names the smallest coherent stage the change could land as, and lists the unreviewed files as residual risk.

Applicable `AGENTS.md`, `CLAUDE.md`, contribution guidance, and nested rules govern the changed files. A supplied issue or acceptance document supplies specification intent. Missing intent limits the specification axis but does not block a defects-and-standards review.

## Finding gate

A reportable finding must be introduced by the change, have a concrete trigger and impact, cite a precise changed cause, survive checks against surrounding evidence, imply a fix proportionate to the rigor the codebase already keeps, and give the author something discrete to fix. This filters out:

- pre-existing or intentional behavior;
- speculative future concerns, including ripple effects whose affected code cannot be named;
- personal style preferences and optional cleanup;
- raw smell or SOLID labels with no demonstrated risk;
- formatter or linter output repackaged as review insight. Compiler and test failures may still prove introduced defects.

Defects come first. Specification and standards remain distinct labels, preserving the strongest part of the two-axis review model without letting either hide correctness, security, reliability, data, compatibility, or meaningful performance regressions.

## Code-design lens

Architecture is relevant only when a changed design produces a concrete failure or maintenance risk. The reviewer checks ownership, invariants, dependency direction, caller knowledge, boundary failure, and whether tests meet the change at the seam where an assumption crosses.

The skill applies KISS, YAGNI, and DRY in that order: choose the lowest total complexity that meets current constraints, defer hypothetical machinery, then consolidate truly shared knowledge. Similar syntax alone is not duplication. SOLID principles and smell names guide investigation; they do not qualify as findings by themselves. For architecture design beyond a changed-code finding, use `codebase-design`.

## Deep review

Deep mode builds one fixed review packet, then runs independent passes for defects, specification, and standards/architecture. When parallel reviewers are available, they receive the same target and evidence packet; otherwise the passes remain isolated but sequential. Their candidates are combined only for a validation pass that searches for guards, tests, contracts, history, and intent capable of disproving each claim. Validation confirms or drops — an unconfirmed candidate never becomes a hedged finding, and agreement between passes does not substitute for evidence.

This separation gives high-risk work broader attention while keeping the default review responsive.

## Attribution and design basis

The skill keeps the Standards and Spec distinction from Matt Pocock's MIT-licensed [`code-review`](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review). Its original workflow adds a defect-first gate and three review levels. Merge-base and surrounding-code review patterns were informed by [`openai/codex`](https://github.com/openai/codex); the deep independent-pass and candidate-validation shape was informed by [`anthropics/claude-code`](https://github.com/anthropics/claude-code). No upstream skill instructions are vendored.
