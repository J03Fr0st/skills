# Git workflow

`git-workflow` handles branch setup, worktree lifecycle, PR writing, and authorized
integration. It is model-invoked and can also be requested directly.

Try: “Prepare this change for a PR,” “Rewrite this PR title and description from
the final diff,” “Set up a worktree for this task,” or “Choose a branching policy
for our release process.” A description-only request produces text without
requiring commits or publication.

The skill establishes repository state and the requested endpoint, then loads
only the relevant references. It follows existing repository policy and user
authorization, preserves unrelated work, and confirms the resulting state.
Worktree cleanup depends on ownership and recoverability, rather than happening
automatically after every merge.

PR titles describe the final outcome. Bodies explain motivation, relevant
decisions, actual verification, and material risks, with detail proportional to
reviewer uncertainty. Required project templates and naming conventions remain
authoritative. Commits and PRs credit the human author only; agent
"Generated with" footers and agent co-author trailers are left out unless a
repository policy requires AI-use disclosure.

Code implementation and review retain their existing owners. Ongoing PR feedback,
CI repairs, and monitoring route to [babysit-pr](babysit-pr.md).

## Kit references

| Need | Reference |
| --- | --- |
| Run local inspection helpers or create PR/commit drafts | [Runnable tooling and templates](../../skills/engineering/git-workflow/references/tooling.md) |
| Discover rules or choose a branch/merge policy | [Repository policy](../../skills/engineering/git-workflow/references/policy.md) |
| Start, review, commit selected paths, sync, backport, or maintain a stack | [Common recipes](../../skills/engineering/git-workflow/references/recipes.md) |
| Recover misplaced commits or interrupted Git operations | [Recovery](../../skills/engineering/git-workflow/references/recovery.md) |
| Write a fix, feature, refactor, migration, dependency, or stacked PR | [PR examples](../../skills/engineering/git-workflow/references/pr-examples.md) |
| Handle squash ancestry, leases, stale checks, and merge queues | [Integration pitfalls](../../skills/engineering/git-workflow/references/integration.md) |
| Prepare dependencies, secrets, ports, databases, and submodules | [Worktree environments](../../skills/engineering/git-workflow/references/environments.md) |

Each reference has a loading condition and a completion criterion. Command
patterns require verified repository values; the kit does not execute them
automatically. [Evaluation instructions](../../skills/engineering/git-workflow/evals/README.md)
separate blind agent scenarios from local Git mechanics tests.

The bundled `git-kit.mjs` offers `status`, `pr-context`, and `template` commands.
It requires Node.js 20+ and Git, with no npm dependencies. Git operations are
read-only; template output creates a new file only when requested and refuses
overwrite. Five assets cover short/standard/migration PRs and plain/conventional
commit messages. It neither publishes drafts nor installs Git configuration.

## Design and evidence

The [skill](../../skills/engineering/git-workflow/SKILL.md) contains the common
steps; branching, worktrees, and PR writing are selectively loaded references.
The [research report](../research/2026-09-26-git-workflow.md) and
[preferred-source audit](../research/2026-09-26-git-workflow-preferred-sources.md)
record the sources and limitations. The instructions are an original synthesis:
Superpowers informed native worktree reuse and ownership, EveryInc informed
outcome-led PR writing, Cursor pstack and Matt Pocock informed review context and
evidence, and Addy Osmani and ECC informed branching tradeoffs. Repository-specific
approval rituals, fixed thresholds, and destructive command recipes were not
adopted as universal rules.

The [kit expansion record](../research/2026-09-26-git-workflow-kit.md) adds official
Git references. The [validation record](../research/2026-09-26-git-workflow-validation.md)
documents a blind scenario comparison and six executable local Git exercises,
including their limits.
