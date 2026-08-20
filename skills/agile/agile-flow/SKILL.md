---
name: agile-flow
description: Route a piece of software work through the Agile skill suite.
disable-model-invocation: true
---

# Agile Flow

Use one entry point to find the current delivery state, run the matching Agile skill, and make the next gate explicit. Enter at the state the work is actually in; ceremonies are not prerequisites.

## 1. Locate canonical state

Read the project's product context, working agreements, tracker, active cycle record, delivery evidence, and repository instructions. Prefer existing artifacts and status fields over creating a parallel system.

When the user asks to initialize local Agile documents or the repository has no artifact convention, read [references/ARTIFACT-MODEL.md](references/ARTIFACT-MODEL.md).

**Complete when:** the canonical sources and the work item's evidenced current state are known.

## 2. Choose the next stage

Choose the first unresolved state:

| Current state                                 | Run or resume                                                      |
| --------------------------------------------- | ------------------------------------------------------------------ |
| Fuzzy, disputed, or assumption-heavy idea     | `agile-refine` in deep refinement mode                             |
| Backlog item is not Ready                     | `agile-refine` in standard mode                                    |
| Ready work needs a goal and capacity decision | `agile-sprint-plan`                                                |
| Selected work is active                       | The repository's implementation, testing, and code-review workflow |
| Working behavior awaits product acceptance    | `agile-sprint-review`                                              |
| A reviewed cycle or milestone needs learning  | `agile-retro`                                                      |

Honor repository safety and quality gates, strengthening verification for higher-risk work. Use independent implementation, test, security, or review agents only at genuinely independent seams and when their use is authorized.

**Complete when:** one matching stage is selected from evidence rather than assumed from labels.

## 3. Carry the artifact forward

Run the selected stage instead of merely recommending it. After the stage completes, update or propose the canonical artifact, reclassify the state, and name the next gate. Stop at a human decision, missing authority, unresolved blocker, or the boundary requested by the user.

Do not invent an implementation methodology, shadow backlog, duplicate status report, or automatic commit. Reuse the project's delivery tools and keep external writes within the user's authorization.

**Complete when:** the current state is evidence-backed, the relevant artifact reflects it or awaits explicit approval, and the next gate is visible.
