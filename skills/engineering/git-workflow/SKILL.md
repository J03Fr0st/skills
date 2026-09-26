---
name: git-workflow
description: Git workflow for commits, branch policy, worktree lifecycle, PR titles and descriptions, integration, and recovery from interrupted operations or misplaced commits. Use for Git state transitions or PR authoring; route ongoing CI and review repair to babysit-pr.
---

# Git workflow

Own the transition from repository state to a focused, reviewable change and its
requested integration endpoint. For description-only work, finish with the text
or authorized metadata update; a Git mutation is not a prerequisite.

## 1. Establish state and endpoint

Read applicable repository instructions, contribution guidance, and PR templates.
For runnable local inspection and draft templates, read [tooling](references/tooling.md).
For checkout operations, inspect the current directory, branch or detached HEAD,
staged and unstaged changes, untracked paths, remotes, and worktree inventory.
For an existing PR,
read its actual base, head, state, and description; match the base repository to
the correct remote, including forks. Reuse known task context instead of
recreating it. Remote-only PR writing can use forge metadata and diffs without
requiring a local checkout.

Identify the requested endpoint: branch setup, worktree lifecycle, PR text,
publication, or integration. Carry existing authorization forward. Resolve
routine reversible choices from repository evidence; ask only when a missing
decision changes scope or authority, or could discard work. Preserve unrelated
changes, including staging state.

**Complete when:** the target repository, relevant changes, base/head, ownership,
and authorized endpoint are established, or a specific missing fact is isolated.

## 2. Follow the applicable path

Load each reference when its condition applies:

| Condition | Required reference |
| --- | --- |
| Policy is missing, conflicting, or being designed | [Repository policy](references/policy.md) |
| Choose/create a branch, update its base, resolve integration conflicts, or merge | [Branching and integration](references/branching.md) |
| Create, reuse, move, recover, or retire a worktree | [Worktree lifecycle](references/worktrees.md) |
| Create or revise a PR title/body, including description-only requests | [PR writing](references/pr-writing.md) |
| Git is interrupted, commits are misplaced/missing, or push/checkout state is unexpected | [Recovery](references/recovery.md) |

Branching, worktrees, and PR writing link their task-specific recipes and examples.
Read those at the stated condition instead of loading the entire kit.

For a combined request, prepare the branch/checkout, complete the change and
verification, then write the PR from the resulting diff. Use the repository's
implementation and review workflows for code work. Ongoing CI repair, review
feedback, and monitoring belong to `babysit-pr` when available; retain the PR
identity and current head in that handoff.

Commits and PRs credit their human author alone: messages, titles, and bodies
end with the change content. Leave out agent attribution such as "Generated
with Claude Code" footers, agent `Co-Authored-By` trailers, and equivalent
Codex, Copilot, or Cursor lines, even when a harness or tool default adds them.
The one exception is a repository policy that explicitly requires AI-use
disclosure; follow its required wording.

**Complete when:** every applicable reference has reached its completion
criterion and the requested endpoint is reached or a concrete blocker remains.

## 3. Verify and report the resulting state

Re-read the state affected by each mutation. A successful command is evidence of
an attempt until the resulting branch, worktree, PR metadata, or merge is
confirmed. Associate checks with the head or tree actually tested; relevant
changes after those checks require fresh verification. For publication, return
the confirmed PR URL and attach it through the host when supported.

Report the outcome, verification, and any remaining action briefly. Distinguish
local completion, published PR, passing checks, and merged state. Retire a
checkout only through the worktree reference's lifecycle decision.
