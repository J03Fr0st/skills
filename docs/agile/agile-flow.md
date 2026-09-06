# Agile Flow

`agile-flow` is the explicit router for the Agile suite and the one command humans need to remember.

- **Invocation:** user-invoked only.
- **Output:** an evidence-backed current state and the next explicit command or delivery handoff.

## Routing

| Current state                     | Route                                                             |
| --------------------------------- | ----------------------------------------------------------------- |
| Fuzzy or assumption-heavy idea    | Deep `/agile-refine`                                              |
| Backlog item is not Ready         | Standard `/agile-refine`                                          |
| Ready work needs a cycle goal     | `/agile-sprint-plan`                                              |
| Selected work is active           | `implement`, composing technical planning, TDD, diagnosis, verification, `security-review`, and review as needed |
| Working behavior needs acceptance | `/agile-sprint-review`                                            |
| Reviewed work needs learning      | `/agile-retro`                                                    |

The router starts at the state supported by current artifacts rather than
forcing every ceremony. For another Agile stage, it returns the explicit
command and waits for the user to invoke it. Active work can hand off to
`implement` when delivery is authorized.

## Local artifact fallback

When a project has no tracker or Agile document convention, the skill can establish `docs/agile/` with working agreements, an optional local backlog, one record per delivery cycle, and consequential decisions. It does this only when setup is requested; otherwise existing sources remain authoritative.
