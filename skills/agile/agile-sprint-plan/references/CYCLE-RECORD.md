# Cycle record contract

One cycle record carries planning, delivery changes, product review, and retrospective learning. Update it in place rather than creating separate ceremony reports.

```markdown
---
cycle: <identifier or start date>
status: planned
goal: <one observable outcome>
started: <date>
ended:
---

# <Cycle name>

## Goal

<Why this cycle exists and how the outcome will be demonstrated.>

## Capacity basis

<Availability, historical evidence, assumptions, and interruption allowance.>

## Selected work

| Item | Intended outcome | Blocked by | Initial state | Current state |
| ---- | ---------------- | ---------- | ------------- | ------------- |

Record each item's blocking items so the deliverable order is readable without reconstructing it. An item blocked by nothing can start immediately.

## Risks, dependencies, and exclusions

- Risks and required gates:
- Dependencies:
- Deliberate exclusions:

## Changes during delivery

<Scope changes, interruptions, discoveries, and decisions with dates or links.>

## Evidence

<Links to demonstrations, commits, tests, CI, telemetry, or other verified behavior.>

## Review

<Outcome decisions and resulting backlog changes.>

## Retrospective

<Evidence, observations, and causal hypotheses.>

## Improvement experiment

<One action, owner, duration, success signal, and stop condition.>

---

_Drafted by an AI agent. Sections carry the evidence they were written from._
```

Use Markdown frontmatter only when the repository already accepts it or the artifact is a new local convention. Preserve an existing tracker or document format when one is already canonical.

Keep the provenance line as later skills append review decisions and retrospective learning. Stakeholders weigh a forecast, an acceptance decision, and a retrospective differently when they know an agent assembled them, and the record outlives the session that produced it.
