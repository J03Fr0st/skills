---
"j03fr0st-skills": minor
---

`babysit-pr` now keeps the branch up to date: when the base moves ahead, it
merges the base into the branch as a new commit, verifies it and pushes
normally, without rebasing or force-pushing. Asking it to babysit a PR now
authorizes the final merge once required checks and approvals are in. It never
approves the PR itself. Say you will merge, or ask to stop at merge-ready, to
withhold the merge.
