---
name: agile-sprint-review
description: Review completed software against its intended product outcome and acceptance examples. Use for sprint reviews, stakeholder acceptance, demonstrations, or deciding backlog follow-ups from working behavior. This is product review, not code review.
---

# Agile Sprint Review

Decide what value was actually delivered. Review working behavior and fresh evidence; keep engineering quality review in the project's code-review workflow.

## 1. Pin the intended outcome

Read the cycle goal, selected backlog items, acceptance examples, product context, and recorded scope changes. Identify the exact build, branch, deployment, or artifact under review. Separate the original commitment from changes approved during delivery.

**Complete when:** every reviewed outcome is tied to its acceptance basis and an exact implementation state.

## 2. Demonstrate and verify

Exercise behavior through the most public or user-visible seam available. Run relevant checks when permitted and inspect their current output. Keep reported evidence distinct from evidence verified during this review.

For each outcome, record:

- what was demonstrated and to whom;
- which acceptance examples passed or failed;
- meaningful edge cases, operational evidence, or risk gates;
- scope delivered beyond or short of the agreed boundary;
- feedback grounded in observed behavior.

**Complete when:** every acceptance decision cites observable behavior or is marked as lacking evidence.

## 3. Make the product decision

Classify each outcome as **Accepted**, **Partially accepted**, **Not accepted**, or **Pending stakeholder decision**. Never infer stakeholder acceptance from passing tests or code completion.

Turn new demand, defects, and rejected scope into separate backlog candidates. Send ambiguous candidates through `agile-refine`; do not smuggle them into the completed item.

Update the Review and Evidence sections of the canonical cycle record when the request authorizes artifact changes, keeping the record's existing structure and its note that an agent drafted it. Preserve dissent and pending decisions. Link demonstrations, runs, and logs rather than pasting their bulk into the record. Treat external publication, commits, and pushes as separate actions unless requested.

**Complete when:** each outcome has an evidence-backed product decision, follow-up work has a destination, and the cycle record or proposed review is ready for stakeholders.
