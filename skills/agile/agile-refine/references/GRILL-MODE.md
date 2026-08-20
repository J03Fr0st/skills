# Deep refinement

Use deep refinement to pressure-test a consequential or ambiguous item. The interrogation is working process; its distilled decisions are the artifact.

## Build the design tree

Map the root decision and every decision that depends on it. The **frontier** is the set of questions whose prerequisites are already settled. Ask the whole frontier in one round; keep questions with unsettled prerequisites for later rounds.

For every question:

1. Explain why the decision matters and what it changes downstream.
2. Offer concrete options when the choice benefits from comparison.
3. Recommend one answer and explain the trade-off.
4. Wait for the user's decision rather than choosing on their behalf.

Investigate facts with the repository, tools, or authorized background agents. Ask the user for judgement, preference, authority, or information only they possess.

## Recompute in rounds

Each answer can add, remove, or reshape branches. Recompute the frontier after every round. Challenge contradictions, hidden assumptions, vague outcomes, accidental scope, unsupported urgency, and acceptance criteria that only restate an implementation.

Continue until the frontier is empty. Then summarize:

- the outcome and why it matters;
- decisions and important assumptions;
- constraints and non-goals;
- alternatives rejected and why;
- remaining unknowns and their owners;
- consequences for scope, acceptance, risk, or sequencing.

Ask the user to confirm the shared understanding before changing the backlog item. Save the summary, never the interrogation transcript.

## When the user is unavailable

Deep refinement needs a live counterpart, so an unattended run cannot complete it. When the request rules out interaction — a background agent, an explicit instruction not to wait — build the tree and settle every branch that evidence can settle, then stop. Return the unresolved branches as named open questions carrying your recommendation and its trade-off, each owned by whoever holds the authority.

Hold at Not Ready only what those questions actually gate. When refinement produced a set of items, an item whose own outcome is to answer an open question can still be Ready; holding the whole set leaves the team nothing to start.

Separate the questions someone else can answer without the user, such as a fact in a repository you cannot reach, from the ones that need the user's own judgement or authority. That distinction is usually the fastest route to an unblocked team.

**Complete when:** every reachable decision branch has been visited, environmental facts have been checked, remaining unknowns are explicit, and the user confirms the summary — or, in an unattended run, the open questions are recorded with owners and the item is held at Not Ready.
