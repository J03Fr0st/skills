# Verification Before Completion Skill Research

**Research date:** 2026-08-23  
**Local baseline:** `5f82174f4f41a2e636a67ae11ca9fbba5c47f596`  
**Decision:** Build a callable model-invoked skill that is also the shared completion protocol for implementation, TDD, diagnosis, review, documentation, configuration, visual, and external-state work.

## Scope and method

This review covers every source named in issue #15, local review and Agile completion gates, agent-writing guidance, and current community evidence. Exact upstream revisions are pinned. Evidence, inference, and recommendation are deliberately separate.

The Last30Days scan returned 63 items from Reddit, Hacker News, and GitHub. Reddit was partial after rate limiting and only 31 dated items were from the last seven days. The signal is useful for identifying current concerns, not for claiming community consensus.

## Recent community signal

**Evidence:** [ProofRun](https://github.com/yebiguo/ProofRun) describes a local verification receipt for coding agents. A recent [ClaudeCode discussion](https://www.reddit.com/r/ClaudeCode/comments/1vtha5e/i_built_procoder_a_senior_developer_layer_for_ai/) argued that agents can skip advisory skill steps. A [ClaudeWorkflows writer/reader discussion](https://www.reddit.com/r/ClaudeWorkflows/comments/1vw6t8v/workflow_balancing_ai_generation_and_review/) separated generation from checking. The scan also found repeated use of job summaries, exact workflow runs, and validation artifacts in current GitHub work.

**Inference:** Users increasingly distinguish “the agent says it passed” from an attributable proof receipt. Freshness, exact scope, and independent provenance are the essential fields.

**Recommendation:** Make the claim falsifiable first, map it to direct evidence, verify what actually ran, and emit an explicit terminal state.

## Revision and path ledger

| Source | Revision | Files reviewed |
| --- | --- | --- |
| Local review and Agile gates | `5f82174f4f41a2e636a67ae11ca9fbba5c47f596` | `skills/engineering/code-review/SKILL.md`; `skills/agile/agile-flow/SKILL.md`; `skills/agile/agile-sprint-review/SKILL.md`; `skills/writing-for-agents/SKILL.md`; `skills/writing-for-agents/references/TESTING-SKILLS.md` |
| [obra/superpowers verification](https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/skills/verification-before-completion/SKILL.md) | `b36e0829c6d0140e93cfef2ca599b1b07d4a7797` | `skills/verification-before-completion/SKILL.md` |
| [mattpocock/skills implement](https://github.com/mattpocock/skills/blob/5b15a47f2d7150f545fbcacbfe381787fc0230dc/skills/engineering/implement/SKILL.md) | `5b15a47f2d7150f545fbcacbfe381787fc0230dc` | `skills/engineering/implement/SKILL.md` |
| [addyosmani/agent-skills code review and quality](https://github.com/addyosmani/agent-skills/blob/5a5ea45e806f82273549fd85e60adb95d55f510d/skills/code-review-and-quality/SKILL.md) | `5a5ea45e806f82273549fd85e60adb95d55f510d` | `skills/code-review-and-quality/SKILL.md` |
| [addyosmani/agent-skills shipping and launch](https://github.com/addyosmani/agent-skills/blob/5a5ea45e806f82273549fd85e60adb95d55f510d/skills/shipping-and-launch/SKILL.md) | `5a5ea45e806f82273549fd85e60adb95d55f510d` | `skills/shipping-and-launch/SKILL.md` |
| [cursor/plugins verify-this](https://github.com/cursor/plugins/blob/46125561306434d8a1d7745d540d8932ab0cd2a2/cursor-team-kit/skills/verify-this/SKILL.md) | `46125561306434d8a1d7745d540d8932ab0cd2a2` | `cursor-team-kit/skills/verify-this/SKILL.md` |
| [cursor/plugins prove-it-works](https://github.com/cursor/plugins/blob/46125561306434d8a1d7745d540d8932ab0cd2a2/pstack/skills/principle-prove-it-works/SKILL.md) | `46125561306434d8a1d7745d540d8932ab0cd2a2` | `pstack/skills/principle-prove-it-works/SKILL.md` |

Supporting comparison also reviewed Cursor's [`verify-existing-fix.md`](https://github.com/cursor/plugins/blob/46125561306434d8a1d7745d540d8932ab0cd2a2/pstack/automations/benny/skills/reproduce-and-fix-issues/references/verify-existing-fix.md) at the same revision.

## Source evidence

### Obra

**Evidence:** The skill requires a fresh command, full output, exit status or failure count, requirement-by-requirement support, and skepticism toward delegated success reports.

**Inference:** Freshness and complete-result inspection are the minimum gate. A code-command focus needs expansion for docs, visuals, configuration, and external state.

### Matt Pocock

**Evidence:** `implement` uses focused checks during work and a broader suite near completion. It also commits automatically and tends toward an unconditional final full suite.

**Inference:** Checks should widen with the claim and risk, not by ritual. Commit behavior is outside verification.

### Addy Osmani

**Evidence:** Code review and quality asks reviewers to verify the verification using tests, builds, manual behavior, screenshots, and before/after evidence. Shipping and launch separates implementation quality from deployment readiness and post-launch health.

**Inference:** Artifact-specific evidence is necessary, and implementation verification, deployment state, and operational health must remain distinct claims.

### Cursor team kit and pstack

**Evidence:** `verify-this` frames a claim as condition, metric, threshold, artifact/revision/environment, equivalent baseline and treatment, raw artifacts, and an exact verdict. `prove-it-works` requires inspecting the real artifact or user path instead of compilation, cache state, or an agent report. Existing-fix guidance protects dirty checkouts and compares exact revisions in equivalent environments.

**Inference:** The claim matrix and evidence receipt are the strongest reusable model. Baseline worktrees are optional tools and must not mutate or bypass local-only evidence.

### Local suite

**Evidence:** `code-review` separates reported checks from independently reviewed findings and names evidence limits. `agile-sprint-review` makes stakeholder product acceptance a separate decision based on working behavior.

**Inference:** Verification cannot imply independent review, stakeholder acceptance, deployment authorization, or release readiness.

## Failure modes the design must prevent

- relying on a test run that predates the final relevant edit;
- trusting an agent, implementer, or cached CI report without exact provenance;
- reading “87 passed” without checking discovery, skips, missing fixtures, branch, and environment;
- treating compilation, syntax validation, or a unit test as proof of the public flow;
- using one targeted test to claim all acceptance criteria;
- checking generated output without inspecting the artifact;
- checking configuration syntax but claiming deployed effective state;
- claiming visual readiness without rendering the relevant states and viewports;
- comparing performance without equivalent workloads and environments;
- rerunning flaky or failing checks unchanged until one passes;
- triggering costly, destructive, externally visible, or credentialed checks without authority;
- collapsing product acceptance, deployment, and implementation verification into “ready.”

## Proposed contract

### Triggers

- before saying done, fixed, passing, ready, deployed, or compliant;
- explicit verify, prove, double-check, or show-it-works requests;
- completion gates from implementation, TDD, diagnosis, review, docs, configuration, visual, or external-state workflows.

### Non-triggers

- implementing missing behavior;
- stakeholder product acceptance;
- code review or security review;
- deployment, approval, merge, commit, or release authorization;
- open-ended test strategy or quality planning.

### Inputs and outputs

Input is the exact claim, acceptance criteria, final artifact/revision/environment, relevant changes, reported evidence, risk, and authority limits. Output is a claim matrix, fresh evidence receipt, independent-versus-reported provenance, one terminal state, gaps, and the smallest next action.

### Evidence taxonomy

- **Fresh:** gathered after the last relevant change against the final scope.
- **Direct:** capable of falsifying the exact claim, not merely a proxy.
- **Scope-matched:** covers the named artifact, revision, environment, inputs, and risk boundary.
- **Independently verified:** observed in the current verification run.
- **Reported-green:** supplied by an agent, CI job, or earlier run and not independently reproduced.
- **Partial:** directly proves separable claims while named claims remain unsupported.

Code behavior needs focused and proportionate broader tests; generated output needs a fresh build plus inspection; docs need parser/render/link or visual checks; configuration needs validation and effective-state evidence; external state needs authorized read-back; visuals need actual rendering; performance needs comparable measurements.

### Terminal states

- **VERIFIED:** every material claim has fresh, direct, scope-matched evidence.
- **NOT VERIFIED:** fresh evidence contradicts at least one material claim.
- **PARTIALLY VERIFIED:** separable claims are verified and others remain unchecked, but no named constraint prevents the next check.
- **INCONCLUSIVE:** evidence ran but is ambiguous, inconsistent, flaky, stale, or indirect.
- **BLOCKED:** access, authority, environment, dependency, cost, or safety prevents any material required claim, even if other claims are verified.

The five-state model keeps the issue's partial-evidence requirement explicit. Reported-green is provenance, not a verdict. Precedence is NOT VERIFIED for fresh contradiction, BLOCKED for a prevented material check, INCONCLUSIVE for ambiguous executed evidence, PARTIALLY VERIFIED for incomplete but unblocked separable coverage, and VERIFIED only for complete support.

## Composition rules

- `implement` owns changes and must call this protocol after the final relevant edit.
- `tdd` owns phase evidence; this protocol reruns the final regression and proportionate broader checks.
- `diagnosing-bugs` owns cause evidence; this protocol proves the original symptom and acceptance claims after remediation.
- `code-review` remains independent static and contextual review, not runtime proof.
- `agile-sprint-review` owns stakeholder/product acceptance.
- deployment and shipping workflows own production rollout and post-launch health.

## Authority and stale-evidence rules

Verification is source- and external-state-read-only unless a separate requested action requires state change. Destructive, costly, rate-limited, externally visible, privacy-sensitive, or credentialed checks pause for authority. Cached CI may count only when tied to the exact final revision and complete claim scope. A worktree or baseline comparison must preserve the dirty checkout and contain every decisive fixture or dependency.

## Routing and workflow eval plan

Positive cases cover pre-completion gates and explicit proof requests. Negative cases cover implementation, acceptance, deployment, review, and test-strategy requests. Ambiguous cases test stale CI, reported agent results, missing local-only fixtures, paid external checks, unavailable browsers, partial criteria, and deployment language.

Workflow evals must catch unsupported success, proxy evidence, skipped tests, stale results, lucky flaky passes, hidden environment differences, missing artifacts, authority expansion, and provenance loss. The published evals cover a post-test edit, a paid deployment plus unavailable visual check, and reported-green worktree tests missing ignored fixtures.

## Recommendation and implementation-ready handoff

**Recommendation:** Build as both a directly callable skill and the suite's shared completion protocol. Do not merge it into implementation because diagnosis, docs, reviews, configuration, and external-state tasks need the same gate independently.

**Implementation handoff:** Create `skills/engineering/verification-before-completion/` with the claim/evidence workflow, evidence taxonomy, five terminal states, `agents/openai.yaml`, and three adversarial evals; publish `docs/engineering/verification-before-completion.md`; wire every index and the plugin; then update `implement` to call it. A later explicit user request authorized implementation in the same working tree beyond issue #15's research-only boundary.

## Licensing and attribution

The reviewed Obra, Matt Pocock, and Addy Osmani sources are MIT-licensed. Relevant `cursor-team-kit` and `pstack` subtrees include MIT licenses even though `cursor/plugins` has no detected repository-wide license. This design uses original wording and structure and does not vendor upstream text, templates, or artifacts.

## Refresh: current revisions (2026-10-07)

**Local baseline:** `1cdbf74ad54ab67110847c74f5cb23ef06556613`  
**Decision:** Build a callable model-invoked skill that is also the shared completion protocol for implementation, TDD, diagnosis, review, documentation, configuration, visual, and external-state work. Every required source was re-read at its current revision.

### Revision ledger

| Source | 2026-08-23 pin | Current revision (2026-10-07) | Files reviewed | Material changes |
| --- | --- | --- | --- | --- |
| [obra/superpowers verification](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/verification-before-completion/SKILL.md) | `b36e0829c6d0140e93cfef2ca599b1b07d4a7797` | `8ca22dba9a94f28898bbce59f2537ff4d87c747d` | `skills/verification-before-completion/SKILL.md` | None. The fresh-command iron law, full-output reading, exit-status and failure counting, requirements checklist, and agent-report skepticism are unchanged |
| [mattpocock/skills implement](https://github.com/mattpocock/skills/blob/6fd947921b935b7e1e69293a200400f0fdd5c15f/skills/engineering/implement/SKILL.md) | `5b15a47f2d7150f545fbcacbfe381787fc0230dc` | `6fd947921b935b7e1e69293a200400f0fdd5c15f` | `skills/engineering/implement/SKILL.md` | `implement` now names its delegation explicitly - `tdd` at pre-agreed seams and `code-review` when done. Its completion behavior still commits to the branch and runs the full suite once at the end |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/1401c8b8030e023baeebb31781a6653fe8e93026/skills/code-review-and-quality/SKILL.md) | `5a5ea45e806f82273549fd85e60adb95d55f510d` | `1401c8b8030e023baeebb31781a6653fe8e93026` | `skills/code-review-and-quality/SKILL.md`; `skills/shipping-and-launch/SKILL.md` | Code review adds experiment-backed test checking (invert one added condition, run, restore) and dependency-upgrade review; shipping adds rollout decision thresholds and an error-budget release gate. The verify-the-verification step and the implementation-versus-deployment-versus-health separation are unchanged |
| [cursor/plugins](https://github.com/cursor/plugins/blob/d0ef80d86795816da932a153458c5dbe192d294e/cursor-team-kit/skills/verify-this/SKILL.md) | `46125561306434d8a1d7745d540d8932ab0cd2a2` | `d0ef80d86795816da932a153458c5dbe192d294e` | `cursor-team-kit/skills/verify-this/SKILL.md`; `pstack/skills/principle-prove-it-works/SKILL.md` | Both files remain at their reviewed paths. `verify-this` keeps the same three verdicts and baseline-versus-treatment frame, adding only an optional artifact-directory layout and a sensitivity note. `prove-it-works` now prefers a deterministic scripted check whose output is kept as a re-runnable artifact |

**Evidence:** All four upstream repositories moved since the 2026-08-23 pins; every required file fetched at the new HEAD and none changed path. The obra gate, the addyosmani verify-the-verification step, and the cursor claim frame survive in substance. The upstream direction since the pins reinforces this design: mattpocock's `implement` formalizes handing finished work to a reviewer, addyosmani's shipping gate leans on objective thresholds rather than judgement alone, and cursor's `prove-it-works` asks for scripted, re-runnable proof. None of these contradicts the claim matrix, evidence taxonomy, or five terminal states. Locally, the Agile suite the issue named was removed in commit `62dece2` and replaced by the ADLC suite. The lifecycle routing `skills/agile/agile-flow/SKILL.md` owned now belongs to `skills/adlc/adlc-flow/SKILL.md`, which routes an implemented slice to `code-review`, a reviewed slice to `verification-before-completion`, a verified slice to its declared delivery endpoint, and a combined acceptance that lacks evidence back to `verification-before-completion`. Named human sign-off, including the product-acceptance decision `skills/agile/agile-sprint-review/SKILL.md` used to carry, now belongs to `skills/adlc/adlc-gate/SKILL.md`, with the slice and combined acceptance checks defined by `skills/adlc/adlc-plan/SKILL.md` and tracked in its `references/PROGRESS.md` contract.

**Inference:** The analysis holds unchanged. Every upstream revision either matches the pinned evidence or adds a mechanism the claim matrix already subsumes. The separation of verification from review, human acceptance, and delivery authorization is now enforced by ADLC routing itself, which is stronger support than the Agile suite provided. The composition rules section needs only renames: `agile-flow` becomes `adlc-flow`, and `agile-sprint-review` becomes the `adlc-gate` decision plus the combined acceptance check in `adlc-plan`. The rule that verification cannot imply independent review, stakeholder acceptance, deployment authorization, or release readiness carries over intact.

**Skill conformance:** The built `skills/engineering/verification-before-completion/SKILL.md` in this worktree still matches the proposed contract. It builds the claim matrix (step 1), keeps the evidence taxonomy's fresh, direct, scope-matched, independently verified, reported-green, and partial distinctions (steps 3 and 4), and assigns exactly the five terminal states with the same precedence order (step 5). The PR #31 and PR #40 refinements - side-blind fix evidence, hollow-green guards, PASS/FAIL/SKIPPED/ERROR check states, the weakened-check scan, and the evidence receipt - are additions inside the contract, not drift from it. No contract element is missing or contradicted; the drift is noted as observation only.

**Errata:** The issue's required source "Local Agile skill completion and review gates" no longer resolves. Commit `62dece2` removed `skills/agile/agile-flow/SKILL.md` and `skills/agile/agile-sprint-review/SKILL.md`. Their successors are `skills/adlc/adlc-flow/SKILL.md` (completion and review routing), `skills/adlc/adlc-gate/SKILL.md` (named human sign-off), and `skills/adlc/adlc-plan/SKILL.md` with `skills/adlc/adlc-plan/references/PROGRESS.md` (combined acceptance checks and evidence). The original local-suite evidence applies to those successors by substitution.

**Verdict:** The original Decision still holds. The ADLC suite now routes every delivery slice through `verification-before-completion` as its shared completion gate while the skill stays directly callable, which is exactly the dual role the Decision chose.
