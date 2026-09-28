---
"j03fr0st-skills": patch
---

Teach `orchestrate` to track changes across parallel writers. In Claude Code, a concurrent writer gets an isolated worktree only when that worktree's base contains the slice's prerequisites. The root records each writer's change set and integrates change sets one at a time with checks after each. Slice state and evidence go to the plan's delivery record, such as an ADLC `progress.md`.
