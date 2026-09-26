# ADLC Intent

`adlc-intent` records what the human wants and why, in their words, before any agent designs or builds.

- **Invocation:** user-invoked only.
- **Output:** a draft `intent.md` with problem, outcome, who, why now, non-goals, success signal, assumptions, and open questions.

## How it works

The skill resolves facts it can find in the repository, then interviews the human for everything code cannot say. Standard mode asks the targeted questions still open; deep mode runs [`grilling`](../productivity/grilling.md) when value, premise, or scope is contested.

Business, policy, and user facts come only from the human. Anything the agent inferred is listed as an assumption with an owner to confirm it. The intent stays about the problem and the outcome; solutions belong to the spec and plan.

The draft ends at `/adlc-gate intent`. Only the gate changes its status.

Artifacts live in the project's existing convention, or in `docs/adlc/<slug>/intent.md`.
