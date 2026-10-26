---
"j03fr0st-skills": minor
---

`git-workflow` can now split a one-way-door PR (expand/contract). It finds the
steps a revert cannot undo, such as a destructive migration or a removed
contract. Everything else goes into a reversible expand PR behind a feature
flag that is off by default, verified with the flag off and on. The
irreversible steps go into a contract PR stacked on top, which waits until the
expand PR has been observed in production.
