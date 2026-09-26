---
name: adlc-gate
description: Record a named human sign-off on an ADLC intent, spec, or plan.
disable-model-invocation: true
---

# ADLC Gate

Put a named human decision between each ADLC stage and the next. The agent checks the artifact against its exit criteria and records what the human decides. The human alone approves, and an approval covers only the exact revision they reviewed.

## 1. Identify the artifact

Take the stage from the argument (`intent`, `spec`, or `plan`) and find the work item's artifact (`docs/adlc/<slug>/<stage>.md` or the project's convention). Compute its **content hash**, which excludes the fields this gate writes:

```bash
sed -e '/^status:/d' -e '/^## Approvals/,$d' <artifact> | git hash-object --stdin
```

For a spec or plan, also confirm that the `source` in its frontmatter names the upstream artifact's current, approved content hash. A stale source means the upstream stage changed: return that stage's gate instead.

**Complete when:** the artifact, its content hash, and a current upstream source are known.

## 2. Run the self-check

Evaluate the stage's exit criteria as a table of criterion, pass or fail, and evidence from the artifact:

| Stage | Exit criteria |
| --- | --- |
| intent | Every section answered or "none"; no solution design or file paths; observable success signal; every assumption and open question has an owner; the human corrected the draft |
| spec | Source is the approved intent; every intent outcome maps to an acceptance criterion; every criterion is observable with a verification method; every intent open question resolved or owned; every area of concern owned; no file paths or code |
| plan | Source is the approved spec; every acceptance criterion covered by slices and a check; every slice has an implementer and a separate verifier; risks and rollback stated; no placeholders; the first ready slice is executable from the plan alone |

Title the table **Agent self-check, not approval**. Any fail makes the recommendation *not ready*; the decision still belongs to the human.

**Complete when:** every exit criterion for the stage has a pass or fail with evidence.

## 3. Ask for the decision

Show the human the artifact path, the content hash, and the self-check. Ask for their decision and their name and role. Accept only what the human types in this turn:

- `approved`
- `approved-with-conditions`, with the conditions
- `rejected`, with the reasons
- `waived`, with the reason, when the human skips the stage on purpose

Treat anything else, including silence, "looks good so far", or a name taken from git config, as no decision: stop without recording.

**Complete when:** the human has stated an explicit decision and a name, or the gate has stopped undecided.

## 4. Record the decision

Append a row to the artifact's `## Approvals` table, creating the table when absent:

```markdown
## Approvals

| Stage | Decision | Approver | Date | Reviewed revision | Conditions / reasons |
| --- | --- | --- | --- | --- | --- |
| spec | approved | Jane Doe (product owner) | 2026-09-26 | 89e7a515a1b652322c5711b5f96f42756299f4fa | — |
```

Record the full hash exactly as the command prints it. Set the frontmatter `status` to `approved` for `approved`, `approved-with-conditions`, and `waived`, and to `rejected` for `rejected`. When a new artifact replaces this one, mark the old one `superseded`. Leave every other line untouched, so the content hash stays equal to the reviewed revision. Any later edit to the body makes the approval stale, and the stage must pass the gate again.

Recommend that the human commits the approval, so git authorship attests the sign-off. Commit it yourself only within the user's commit authorization.

**Complete when:** the row and status are saved, and the recomputed content hash equals the recorded reviewed revision.

## 5. Name the next stage

After approval, return the next command: `/adlc-spec` after intent, `/adlc-plan` after spec, and `/adlc-flow` after plan for the delivery handoff. After rejection, return the same stage's command with the reasons. Stop.

**Complete when:** the decision and the one next command are visible.
