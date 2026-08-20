---
name: agile-refine
description: Shape, challenge, or prioritize a software backlog item before commitment. Use for backlog refinement, acceptance examples, Definition of Ready checks, or a deep "grill me" examination of a feature, decision, or idea. Do not use to implement work that is already ready.
---

# Agile Refine

Turn uncertain demand into the smallest valuable item a team can understand, demonstrate, and choose to deliver. Preserve the project's existing product documents and tracker as the source of truth.

## 1. Establish the refinement target

Read the existing issue, product context, working agreements, relevant code, and prior decisions. Resolve facts from the environment before asking the user. Identify the decision being made: pursue, reshape, split, defer, or reject.

Choose the mode:

- **Standard refinement:** the desired outcome is mostly understood and needs boundaries, acceptance examples, or a readiness decision.
- **Deep refinement:** the user asks to be grilled, or value, assumptions, trade-offs, scope, or acceptance remain materially uncertain. Read [references/GRILL-MODE.md](references/GRILL-MODE.md) and finish its decision tree before continuing.

**Complete when:** the target and mode are explicit, discoverable facts are checked, and unresolved matters are genuine user decisions.

## 2. Shape one valuable slice

State the user or system outcome and why it matters now. Separate the outcome from a proposed implementation. Find the smallest vertical slice that changes observable behavior, can be demonstrated independently, and fits one fresh agent session end to end.

When the work genuinely changes no observable behavior — a schema migration, a mechanical rename, a compliance change under the surface, or a decision that gates other items — shape it as an enabling item using [references/BACKLOG-ITEM.md](references/BACKLOG-ITEM.md) rather than forcing a demonstration that does not exist.

Record:

- acceptance examples at a public or user-visible seam;
- explicit boundaries and non-goals;
- blocking items, other dependencies, and consequential assumptions;
- risk level and any stronger verification it requires;
- alternatives or follow-ups that do not belong in this slice.

Use [references/BACKLOG-ITEM.md](references/BACKLOG-ITEM.md) when creating or substantially rewriting the artifact. Prefer the existing tracker; use local Markdown only when the project has no canonical backlog.

**Complete when:** the slice has one outcome, testable acceptance examples, and a boundary that prevents adjacent work from entering silently.

## 3. Make the readiness decision

Apply the project's Definition of Ready. If none exists, require a clear outcome, demonstrable acceptance, bounded scope, known dependencies, visible risk, and uncertainty low enough to make commitment responsible.

Mark the item **Ready**, **Not Ready**, **Blocked**, **Split**, **Deferred**, or **Rejected**, and give the evidence for that state. Ready is a forecast, not a promise. Keep unresolved questions visible rather than translating them into implementation guesses.

Keep **Blocked** and **Not Ready** distinct: Blocked means the item is complete and waiting only on sequence or an external event, while Not Ready means the item itself is still missing something. They tell the team different things about what can start, so say which applies and name what would release it.

When the outcome is **Split**, deliver the resulting items as one set: name the item they came from, give each its blocking items, and say which are Ready to start now. A sequenced set and a set of independent items are different forecasts, and the difference has to survive the handoff.

When the request authorizes an artifact update, edit the canonical item in place. Otherwise return the proposed item for approval. Treat external tracker writes, commits, and pushes as separate actions unless the user requested them.

**Complete when:** every readiness condition is evidenced, the canonical artifact or proposal reflects the decision, and the next action is unambiguous.
