# Backlog item contract

Adapt this structure to the project's tracker instead of forcing these headings into every tool.

```markdown
# <Outcome-oriented title>

## Outcome

Who or what behaves differently when this is complete?

## Why now

What evidence, value, risk, or opportunity justifies attention?

## Acceptance examples

- Given <context>, when <behavior>, then <observable result>.

## Boundaries

- Included:
- Not included:

## Evidence and assumptions

- Evidence:
- Consequential assumptions:
- Remaining unknowns and owners:

## Dependencies and risk

- Blocked by: the items that must finish first, or "None; can start now".
- Dependencies:
- Risk level and required gates:

## Readiness

- State: Ready | Not Ready | Blocked | Split | Deferred | Rejected
- Rationale:

---

_Drafted by an AI agent from the sources named above._
```

The item describes value and observable behavior. Link detailed specifications, tickets, or architecture decisions rather than copying them into the item.

Keep the provenance line on any item an agent drafted or materially rewrote. A reader deciding whether to trust the item needs to know which parts are evidence and which are inference, and the tracker shows only the account that posted it.

## Enabling items

Some necessary work changes no observable behavior: a schema migration, a mechanical rename, a compliance change under the surface, or a decision that gates other items. Refinement produces these whenever a valuable outcome sits behind them.

An enabling item keeps the same structure with two changes:

- **Outcome** states what becomes possible or true, and says plainly that no user-visible behavior changes.
- **Acceptance examples** verify preservation rather than new behavior: identical test and contract results before and after, no regression in error rate or latency, and the intended structural end state.

Write these honestly instead of dressing a refactor in Given/When/Then. An enabling item is Ready on the same conditions as any other; it is not demoted for lacking a demonstration. Split a wide change into independently revertible phases and give each phase its own item and blocking edges.
