---
"j03fr0st-skills": patch
---

`writing-for-humans` now places Teams `@mentions` inline inside the greeting using the person's first name (with matching `mentionText` and full `displayName` metadata), forbids trailing mentions or names at the bottom of chat messages, and falls back to a plain first-name greeting when a Teams wrapper or MCP tool can only append mentions to the end of the body.
