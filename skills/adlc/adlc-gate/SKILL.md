---
name: adlc-gate
description: Record a named human sign-off on an ADLC intent, spec, plan, or delivery slice.
disable-model-invocation: true
---

# ADLC Gate

Put a named human decision between each ADLC stage and the next, and on each decision made during delivery. The agent checks the artifact against its exit criteria and records what the human decides. The human alone approves, and an approval covers only the exact revision they reviewed.

## 1. Identify the artifact

Take the stage from the argument: `intent`, `spec`, `plan`, or `slice <id>`. For a stage, find the work item's artifact (`docs/adlc/<slug>/<stage>.md` or the project's convention). Compute its **content hash**, which excludes the fields this gate writes:

```bash
sed -e '/^status:/d' -e '/^## Approvals/,$d' <artifact> | git hash-object --stdin
```

In PowerShell without Git Bash:

```powershell
$f = New-TemporaryFile; [IO.File]::WriteAllText($f, ((Get-Content -Raw <artifact>) -replace '(?m)^status:.*\n' -replace '(?ms)^## Approvals.*')); git hash-object --no-filters $f; Remove-Item $f
```

For a spec or plan, also confirm that the `source` in its frontmatter names the upstream artifact's current, approved content hash. A stale source means the upstream stage changed: return that stage's gate instead.

For `slice <id>`, the artifact is the living `progress.md` beside the plan, which is never hashed. Confirm the plan is approved and current, then identify the decision the slice needs (a sign-off the plan requires, or a carried item due at this slice) and its **evidence**: a commit, file, or measurement a fresh session can reach.

**Complete when:** the artifact, its content hash or slice evidence, and a current upstream source are known.

## 2. Run the self-check

Evaluate the stage's exit criteria as a table of criterion, pass or fail, and evidence from the artifact. A **carried item** is an upstream approval condition, open question, or area of concern that is not yet decided; it carries an owner and a `decide by` stage or slice.

| Stage | Exit criteria |
| --- | --- |
| intent | Every section answered or "none"; no solution design or file paths; observable success signal; every assumption and open question has an owner and a `decide by`; the human corrected the draft |
| spec | Source is the approved intent; every intent outcome maps to an acceptance criterion; every criterion is observable with a verification method; every intent approval condition and open question is settled in the spec or carried; every area of concern due by `spec` is decided, and the rest are carried; no file paths or code; the human responded to the draft |
| plan | Source is the approved spec; every spec approval condition, open question, and area of concern due by `plan` is settled under **Decisions**, and the rest are carried to a slice; no slice builds on a carried item before its `decide by` slice; every acceptance criterion covered by slices and a check; every slice has an implementer and a separate verifier; risks and rollback stated; no placeholders; the first ready slice is executable from the plan alone; the human responded to the draft |
| slice | The plan is approved and current; the decision is one the plan or a carried item requires; the evidence is on a ref that will reach the main line, or summarized in `progress.md`; every new condition has an owner and a `decide by` slice |

"Owned" alone never passes a decision that is due. "The human responded" means they replied to the draft with corrections or an explicit review; invoking the gate is not a response.

Title the table **Agent self-check, not approval**. Any fail makes the recommendation *not ready*; the decision still belongs to the human.

**Complete when:** every exit criterion for the stage has a pass or fail with evidence.

## 3. Ask for the decision

Show the human the artifact path, the content hash or slice evidence, and the self-check. For a plan, list each entry under **Decisions** by ID, so the approval names what it covers; the human excludes an entry by approving with a condition on it.

End with ready-to-send lines the human can copy, filled with the stage and, when known, their name:

```text
approved — <name> (<role>)
approved-with-conditions — <name> (<role>) — <conditions>
rejected — <name> (<role>) — <reasons>
waived — <name> (<role>) — <reason>
```

Accept only a decision the human types in this turn: `approved`, `approved-with-conditions` with the conditions, `rejected` with the reasons, or `waived` with the reason, when they skip the stage on purpose. Each needs the approver's name and role typed in this turn, except when the work item declares a **sole approver**: the intent's approval row names the approver with `sole approver` in the role, and the human declared it by typing it at the intent gate. Then the decision word alone names that approver.

Treat anything else, including silence, "looks good so far", or a name taken from git config, as no decision: stop without recording.

**Complete when:** the human has stated an explicit decision and a name, or the gate has stopped undecided.

## 4. Record the decision

For a stage, append a row to the artifact's `## Approvals` table, creating the table when absent:

```markdown
## Approvals

| Stage | Decision | Approver | Date | Reviewed revision | Conditions / reasons |
| --- | --- | --- | --- | --- | --- |
| spec | approved | Jane Doe (product owner) | 2026-09-26 | 89e7a515a1b652322c5711b5f96f42756299f4fa | — |
```

Record the full hash exactly as the command prints it. Set the frontmatter `status` to `approved` for `approved`, `approved-with-conditions`, and `waived`, and to `rejected` for `rejected`. When a new artifact replaces this one, mark the old one `superseded`. Leave every other line untouched, so the content hash stays equal to the reviewed revision. Any later edit to the body makes the approval stale, and the stage must pass the gate again.

For a slice, append a row to the **Decisions** table in `progress.md` with the slice, decision, approver, date, evidence, and conditions, and add each new condition to its **Carried items** with an owner and a `decide by` slice.

Commit the record only when the user asks. The commit message names the stage or slice, the decision, the approver, and the reviewed hash or evidence. The Approvals or Decisions row is the record of the human's decision; git authorship shows only who ran the commit.

**Complete when:** the row is saved, and for a stage the status is set and the recomputed content hash equals the recorded reviewed revision.

## 5. Name the next stage

After approval, return the next command: `/adlc-spec` after intent, `/adlc-plan` after spec, and `/adlc-flow` after plan or a slice for the delivery handoff. After a stage's rejection, return that stage's command with the reasons; after a slice's rejection, return the reasons and `/adlc-flow`. Stop.

**Complete when:** the decision and the one next command are visible.
