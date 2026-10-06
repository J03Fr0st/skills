---
"j03fr0st-skills": patch
---

Fold selected Cursor pstack principles into existing skills:

- `coding-standards` adds a Types rule: tagged unions, exhaustive handling, branded identifiers, and schema-derived types.
- `codebase-design` flags scattered domain conditionals and phase-named modules, and deletes internal-only legacy shapes in the same change as the caller migration.
- `implement` routes repeated mechanical changes through a rerunnable codemod kept in the diff.
- `writing-for-agents` promotes repeatedly restated rules into checks.
