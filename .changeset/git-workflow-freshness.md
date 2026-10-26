---
"j03fr0st-skills": minor
---

`git-workflow` now checks branch freshness. Asked whether a branch is up to
date or its fixes already landed in an incoming PR, it finds where each commit
went, including squash merges, and what landing the branch would still change.
It then gives a verdict (current, partial, landed, superseded, or rework)
before syncing, so it does not rebase work that is already on the base or
bring back something the base removed.
