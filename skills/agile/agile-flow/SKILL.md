---
name: agile-flow
description: Route a piece of software work through the Agile skill suite.
disable-model-invocation: true
---

# Agile Flow

Use one entry point to find the current delivery state and make the next command
or delivery gate explicit. Enter at the state the work is actually in;
ceremonies are not prerequisites.

## 1. Locate canonical state

Read the project's product context, working agreements, tracker, active cycle record, delivery evidence, and repository instructions. Prefer existing artifacts and status fields over creating a parallel system.

When the user asks to initialize local Agile documents or the repository has no artifact convention, read [references/ARTIFACT-MODEL.md](references/ARTIFACT-MODEL.md).

**Complete when:** the canonical sources and the work item's evidenced current state are known.

## 2. Choose the next stage

Choose the first unresolved state:

| Current state                                 | Next command or workflow                                           |
| --------------------------------------------- | ------------------------------------------------------------------ |
| Fuzzy, disputed, or assumption-heavy idea     | `/agile-refine` in deep refinement mode                            |
| Backlog item is not Ready                     | `/agile-refine` in standard mode                                   |
| Ready work needs a goal and capacity decision | `/agile-sprint-plan`                                               |
| Selected work is active                       | `implement`, composing technical planning, TDD, diagnosis, verification, `security-review`, and review as needed |
| Working behavior awaits product acceptance    | `/agile-sprint-review`                                             |
| A reviewed cycle or milestone needs learning  | `/agile-retro`                                                     |

Honor repository safety and quality gates, strengthening verification for higher-risk work. Use independent implementation, test, security, or review agents only at genuinely independent seams and when their use is authorized.

**Complete when:** one matching stage is selected from evidence rather than assumed from labels.

## 3. Hand off the next command

When the next stage is another Agile skill, return its explicit `/agile-*`
command and stop; only the user can invoke it. When selected work is active,
hand off to `implement` only when delivery is authorized. After any completed
delivery work, reclassify the state and name the next explicit Agile command.

Do not invent an implementation methodology, shadow backlog, duplicate status report, or automatic commit. Reuse the project's delivery tools and keep external writes within the user's authorization.

**Complete when:** the current state is evidence-backed and the next explicit
command or authorized delivery handoff is visible.
