---
"j03fr0st-skills": minor
---

Add `skill-evolve`, which turns evidence from real sessions into candidate
skill edits. Each candidate is run against a snapshot of the current skill,
including a case rebuilt from the original failure, and is kept only when it
wins without regressing. Nothing is applied until the user approves it.
