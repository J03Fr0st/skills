# Agile Flow

`agile-flow` is the explicit router for the Agile suite and the one command humans need to remember.

- **Invocation:** user-invoked only.
- **Output:** an evidence-backed current state, the completed matching stage, and the next decision gate.

## Routing

| Current state                     | Route                                                             |
| --------------------------------- | ----------------------------------------------------------------- |
| Fuzzy or assumption-heavy idea    | Deep `agile-refine`                                               |
| Backlog item is not Ready         | Standard `agile-refine`                                           |
| Ready work needs a cycle goal     | `agile-sprint-plan`                                               |
| Selected work is active           | Existing implementation, test, security, and code-review workflow |
| Working behavior needs acceptance | `agile-sprint-review`                                             |
| Reviewed work needs learning      | `agile-retro`                                                     |

The router starts at the state supported by current artifacts rather than forcing every ceremony. It runs the matching stage, carries the canonical artifact forward, and stops at a human decision, missing authority, unresolved blocker, or the user's requested boundary.

## Local artifact fallback

When a project has no tracker or Agile document convention, the skill can establish `docs/agile/` with working agreements, an optional local backlog, one record per delivery cycle, and consequential decisions. It does this only when setup is requested; otherwise existing sources remain authoritative.
