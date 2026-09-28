# ADLC

Five composable skills for the agentic development lifecycle: agents draft and verify, humans decide at named gates. Each stage ends in a committed Markdown artifact that the next stage reads.

## User-invoked

- [`adlc-flow`](adlc-flow/SKILL.md) — find the evidenced current stage and name the next command or delivery handoff. This is the one command to remember.
- [`adlc-intent`](adlc-intent/SKILL.md) — interview the human and record the problem, outcome, and success signal in `intent.md`.
- [`adlc-spec`](adlc-spec/SKILL.md) — turn approved intent into observable behavior and numbered acceptance criteria in `spec.md`.
- [`adlc-plan`](adlc-plan/SKILL.md) — compose `planning-and-task-breakdown` and add decisions, acceptance coverage, assignment, and rollback in `plan.md`, plus a living `progress.md`.
- [`adlc-gate`](adlc-gate/SKILL.md) — self-check an artifact's exit criteria and record a named human sign-off against its content hash, or on a delivery slice in `progress.md`.

## Flow

```text
/adlc-intent -> /adlc-gate intent -> /adlc-spec -> /adlc-gate spec
  -> /adlc-plan -> /adlc-gate plan -> implement | orchestrate
  -> code-review -> verification-before-completion -> git-workflow
```

Build, test, review, and delivery reuse the engineering skills; the ADLC bucket adds only the artifacts and gates in front of them.

## Artifacts

The suite writes to an existing spec, plan, or tracker convention when the project has one. Otherwise it uses:

```text
docs/adlc/<slug>/
|-- intent.md
|-- spec.md
|-- plan.md
`-- progress.md
```

Each artifact carries `status` frontmatter and an `## Approvals` table. An approval records the content hash the human reviewed; any later edit to the body makes it stale, and the stage passes its gate again. Artifacts an agent drafts carry a line saying so.

`progress.md` is the exception: a living delivery record of slice state, evidence, delivery-time decisions, and carried items. It is never hashed, so updating it never makes the plan stale. Open questions and areas of concern carry an owner and a `decide by` stage or slice, and the gates fail when a due one is still undecided.
