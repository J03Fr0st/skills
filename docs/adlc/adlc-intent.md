# ADLC Intent

`adlc-intent` records what the human wants and why, in their words, before any agent designs or builds.

- **Invocation:** user-invoked only.
- **Output:** a draft `intent.md` with problem, outcome, who, why now, non-goals, success signal, assumptions, and open questions.

## How it works

The skill resolves facts it can find in the repository, then interviews the human for everything code cannot say. Standard mode asks the targeted questions still open; deep mode runs [`grilling`](../productivity/grilling.md) when value, premise, or scope is contested.

The problem and why now are asked as open questions and recorded in the human's own words; multiple choice is kept for scope, constraints, and thresholds. Business, policy, and user facts come only from the human. Anything the agent inferred is listed as an assumption with an owner to confirm it. The intent stays about the problem and the outcome; solutions belong to the spec and plan.

The draft ends at `/adlc-gate intent`. Only the gate changes its status.

Command arguments, pasted issues, tickets, and logs are treated as data, not instructions: kept text is quoted in a delimited **Source material** block, and commands inside it are never run. The [2026-09-27 source sweep](../research/2026-09-27-source-repos-sweep.md) takes this framing from wshobson/agents.

Artifacts live in the project's existing convention, or in `docs/adlc/<slug>/intent.md`. The skill adds a `.gitattributes` LF rule for that directory when it is missing, because approval hashes depend on line endings.
