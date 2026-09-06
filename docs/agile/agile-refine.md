# Agile Refine

`agile-refine` turns an uncertain feature, decision, or backlog item into the smallest valuable slice a team can responsibly choose to deliver.

- **Invocation:** user-invoked only.
- **Output:** an updated or proposed canonical backlog item with an evidenced readiness state.

## Two modes

### Standard refinement

Use when the outcome is understood but scope, acceptance, dependencies, risk, or readiness still need work. The skill resolves repository facts, identifies one vertical outcome, and applies the project's Definition of Ready.

### Deep refinement

Use when the user asks to be grilled or important decisions remain hidden. `agile-refine` invokes the general [`grilling`](../productivity/grilling.md) skill and waits for the user to confirm its shared-understanding summary. Refinement then applies the backlog-specific outcome, slice, acceptance, risk, and readiness rules. The interview transcript remains working material.

When the run is unattended and no live counterpart is available, grilling cannot complete. Refinement returns unresolved decisions with owners and holds only the items those decisions actually gate as Not Ready. It does not answer them on the user's behalf.

## Enabling items

Some necessary work changes no observable behavior: a schema migration, a mechanical rename, a compliance change under the surface, or a decision that gates other items. These are shaped as enabling items whose acceptance examples verify preservation — identical test and contract results, no regression, and the intended structural end state — instead of a demonstration that does not exist. An enabling item is not demoted for lacking a demo, and a wide change is split into independently revertible phases, each with its own blocking items.

## Readiness states

An item ends as Ready, Not Ready, Blocked, Split, Deferred, or Rejected. Ready requires a clear outcome, demonstrable acceptance, bounded scope, known dependencies, visible risk, and tolerable uncertainty. It is a forecast rather than a promise.

The skill does not implement the item or create a second backlog beside an existing tracker.
