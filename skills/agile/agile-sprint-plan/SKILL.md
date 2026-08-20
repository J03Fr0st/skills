---
name: agile-sprint-plan
description: Plan a software sprint, iteration, or delivery cycle around one goal. Use when selecting ready backlog work, balancing capacity and risk, exposing dependencies, or creating a cycle record. Do not use for detailed implementation planning of a single item.
---

# Agile Sprint Plan

Make a coherent delivery forecast around one outcome. Select work from the canonical backlog; keep detailed technical slicing in the project's implementation-planning workflow.

## 1. Ground the forecast

Read product context, working agreements, the current backlog, recent cycle evidence, team availability, and active dependencies. Prefer these existing sources to a parallel set of planning documents. Use historical throughput or explicit capacity when available. Label assumptions instead of inventing velocity, estimates, or availability.

When agents carry part of the delivery, state that in the capacity basis: which work is intended for an agent, the review and verification each piece still requires, and the human attention that review consumes. Agent throughput is not free capacity, and unreviewed agent output is not delivered work.

Run `agile-refine` for an item whose value, boundary, acceptance, or readiness is still unresolved.

**Complete when:** the planning inputs, capacity basis, and eligible Ready items are visible.

## 2. Choose one cycle goal

Write one observable outcome that gives the cycle a reason to exist. A list of tickets is not a goal. Prefer a small coherent result over maximizing utilization.

Select the smallest set of Ready items that can achieve the goal. Check dependencies, sequencing, risk gates, operational work, and interruption allowance. Keep stretch work outside the committed set and name what will deliberately not be attempted.

**Complete when:** every selected item supports the goal, fits the stated capacity basis, and can be demonstrated within the cycle.

## 3. Publish one cycle record

Use [references/CYCLE-RECORD.md](references/CYCLE-RECORD.md). Link canonical backlog items instead of copying their full contents. Record the capacity basis, risks, assumptions, exclusions, and an initial status for every selected item.

Update the project's existing cycle artifact when one exists. If the user requests repository setup and no convention exists, use `docs/agile/cycles/<start-date>-<goal-slug>.md`. If the request is advisory, return the proposed record without writing it. External tracker writes, commits, and pushes remain separate actions unless requested.

**Complete when:** the goal, selected work, capacity basis, risks, and exclusions form one reviewable forecast, and the record has a canonical location or explicit proposed destination.
