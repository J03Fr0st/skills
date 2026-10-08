---
"j03fr0st-skills": patch
---

Make `git-workflow` trigger on everyday PR requests. Its description now names the words people use ("create/open/raise a PR", `gh pr create`, commit, push) and tells the agent to load it before writing any PR title or body, so harness PR defaults no longer replace the skill's title and description rules. `ship-it` now routes plain "create a PR" requests to `git-workflow`, and two trigger evals were added.
