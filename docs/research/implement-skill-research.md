# Implement Skill Research

**Research date:** 2026-08-23  
**Local baseline:** `5f82174f4f41a2e636a67ae11ca9fbba5c47f596`  
**Decision:** Build a model-invoked `implement` coordinator with separate TDD, diagnosis, verification, and review skills.

## Scope and method

This review covers every source named in issue #12, the local delivery seam, and recent community evidence. Source evidence, inference, and recommendation are separated below. Links pin the exact upstream revision reviewed so later source drift is visible.

The Last30Days scan queried recent Reddit, Hacker News, GitHub, and web material about agent implementation, TDD, debugging, and completion verification. It returned 63 items: 16 Reddit threads, 15 Hacker News stories, and 32 GitHub items. Reddit collection became partial after an HTTP 429, and only 31 dated items were from the final seven days, so the scan is directional rather than a consensus measure.

## Recent community signal

**Evidence:** A recent [ClaudeCode discussion](https://www.reddit.com/r/ClaudeCode/comments/1vtha5e/i_built_procoder_a_senior_developer_layer_for_ai/) focused on enforcement because advisory skills can be skipped. A [ClaudeWorkflows discussion](https://www.reddit.com/r/ClaudeWorkflows/comments/1vw6t8v/workflow_balancing_ai_generation_and_review/) advocated one writer and one reader instead of unconstrained fan-out. Another [ClaudeWorkflows migration discussion](https://www.reddit.com/r/ClaudeWorkflows/comments/1vvxwj2/workflow_safe_migration_strategy_for_large/) emphasized vertical slices and characterization tests. [ProofRun](https://github.com/yebiguo/ProofRun) represents the concurrent interest in rerunnable proof receipts.

**Inference:** Community interest is clustering around bounded execution, independent checking, and proof that a gate actually ran. An instruction file cannot enforce runtime behavior by itself, but it can make skipped gates visible and testable.

**Recommendation:** Make every implementation phase end in an observable criterion, preserve evidence provenance, and keep parallel execution opt-in.

## Revision and path ledger

| Source | Revision | Files reviewed |
| --- | --- | --- |
| Local Agile flow | `5f82174f4f41a2e636a67ae11ca9fbba5c47f596` | `skills/agile/agile-flow/SKILL.md` |
| Local agent-writing guidance | `5f82174f4f41a2e636a67ae11ca9fbba5c47f596` | `skills/writing-for-agents/SKILL.md`; `skills/writing-for-agents/references/SKILL-MECHANICS.md`; `skills/writing-for-agents/references/TESTING-SKILLS.md` |
| [mattpocock/skills](https://github.com/mattpocock/skills/blob/5b15a47f2d7150f545fbcacbfe381787fc0230dc/skills/engineering/implement/SKILL.md) | `5b15a47f2d7150f545fbcacbfe381787fc0230dc` | `skills/engineering/implement/SKILL.md` |
| [obra/superpowers executing-plans](https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/skills/executing-plans/SKILL.md) | `b36e0829c6d0140e93cfef2ca599b1b07d4a7797` | `skills/executing-plans/SKILL.md` |
| [obra/superpowers subagent-driven-development](https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/skills/subagent-driven-development/SKILL.md) | `b36e0829c6d0140e93cfef2ca599b1b07d4a7797` | `skills/subagent-driven-development/SKILL.md` |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/5a5ea45e806f82273549fd85e60adb95d55f510d/skills/incremental-implementation/SKILL.md) | `5a5ea45e806f82273549fd85e60adb95d55f510d` | `skills/incremental-implementation/SKILL.md` |
| [wshobson/agents](https://github.com/wshobson/agents/blob/2b49247f1347d9cbd90edf869e5412563c3945cf/plugins/conductor/commands/implement.md) | `2b49247f1347d9cbd90edf869e5412563c3945cf` | `plugins/conductor/commands/implement.md` |
| [cursor/plugins outcome-oriented execution](https://github.com/cursor/plugins/blob/46125561306434d8a1d7745d540d8932ab0cd2a2/pstack/skills/principle-outcome-oriented-execution/SKILL.md) | `46125561306434d8a1d7745d540d8932ab0cd2a2` | `pstack/skills/principle-outcome-oriented-execution/SKILL.md` |
| [cursor/plugins verifiable units](https://github.com/cursor/plugins/blob/46125561306434d8a1d7745d540d8932ab0cd2a2/pstack/skills/principle-sequence-verifiable-units/SKILL.md) | `46125561306434d8a1d7745d540d8932ab0cd2a2` | `pstack/skills/principle-sequence-verifiable-units/SKILL.md` |

## Source evidence

### Matt Pocock

**Evidence:** The skill supplies the clearest high-level router: read the specification or tickets, implement through TDD, check progress, run final tests, and review. It assumes the current branch, commits work, and permits delegation without first defining repository-state or authority gates.

**Inference:** The routing seam is useful, but unconditional commits and an underspecified dirty-tree model are unsafe as a repo-neutral default.

### Obra

**Evidence:** `executing-plans` checks a plan before execution, tracks task state, works in batches, and stops on blockers. `subagent-driven-development` adds base-pinned diffs, task briefs, durable state, independent review, and bounded correction loops. Both assume more ceremony, worktree use, agent availability, and commit authority than this repository should impose automatically.

**Inference:** Durable handoff state and explicit stop conditions should survive; automatic isolation, delegation, and commits should not.

### Addy Osmani

**Evidence:** `incremental-implementation` favors thin vertical, contract-first, and risk-first slices, strict scope control, rollback awareness, and checks after each increment. Its commit-per-slice pattern and fixed size heuristics are not universally appropriate.

**Inference:** The coherent slice plus targeted evidence is the right default unit, but its size should follow causality and risk rather than line count.

### Wshobson

**Evidence:** The Conductor command loads canonical context, records resumable status, verifies by phase, and can configure TDD. It also assumes Conductor schemas, approval menus, bulk staging, automatic commits, and stop-on-any-failure behavior.

**Inference:** Reuse canonical artifacts and phase evidence; do not import framework-specific state or mutation authority.

### Cursor pstack

**Evidence:** Outcome-oriented execution permits planned, reversible intermediate breakage within declared migration phases. Sequence-verifiable-units starts from a known-good baseline, makes one causally coherent change, checks it, and then advances.

**Inference:** Default slices should stay green. A temporary red state is defensible only at an explicit migration boundary with bounded blast radius, rollback, and a named green endpoint.

## Failure modes the design must prevent

- treating a plan as mandatory when a direct request is already sufficient;
- overwriting, hiding, staging, or claiming unrelated dirty-tree work;
- acting on an unproven diagnosis;
- starting parallel workers on shared files, contracts, schemas, or ordering;
- using a worktree whose base is stale or whose ignored fixtures are missing;
- batching unrelated changes before any observable check;
- interpreting an unrelated baseline failure as task-owned remediation scope;
- silently resolving product, API, data, security, or external-state ambiguity;
- claiming completion from stale, delegated, skipped, or proxy evidence;
- inferring commit, push, issue update, release, or deployment authority from implementation authority.

## Proposed contract

### Triggers

- direct requests to implement, build, add, change, refactor, or complete software work;
- a selected issue, specification, or plan entering active delivery;
- a fix request after the responsible cause is known;
- `agile-flow` reaching selected active work.

### Non-triggers

- diagnosis or investigation without requested remediation;
- planning, comparison, research, or design with an explicit no-change boundary;
- review-only work;
- requests only to verify an already-created result;
- commit, push, release, or deployment requests, which need their own authority and workflow.

### Inputs

The latest user request, repository instructions, an optional issue/specification/plan, current branch and HEAD, complete dirty-tree state including untracked files, nearby source and tests, and the evidence expected at completion.

### Outputs

A bounded repository change plus a handoff naming observable outcome, task-owned files, preserved pre-existing state, exact fresh evidence, decisions made, unresolved human gates, and residual risk.

### Workflow

1. **Frame:** establish outcome, rules, authority, baseline, dirty paths, and acceptance evidence.
2. **Sequence:** divide work into small vertical or risk-first units; choose TDD, diagnosis, design, and optional parallel routes explicitly.
3. **Execute:** inspect the responsible seam, make one coherent change, run the narrowest decisive check, and reconcile scope.
4. **Prove:** run `verification-before-completion`, then hand off without implying commit or publication.

## Composition rules

| Skill | Ownership boundary |
| --- | --- |
| `agile-flow` | Selects implementation when evidenced work is active and carries the canonical delivery artifact forward |
| `diagnosing-bugs` | Owns unknown causes and returns confirmed or honest uncertain diagnosis evidence |
| `tdd` | Owns red-green-refactor for one observable behavior slice |
| `codebase-design` | Owns consequential module, ownership, or seam decisions |
| Repository security workflow | Owns dedicated security or privacy analysis and its independent evidence |
| `verification-before-completion` | Owns the final claim/evidence verdict after the last relevant edit |
| `code-review` | Independently reviews the completed diff read-only when requested or required |

## Routing and workflow eval plan

Positive routing cases cover direct implementation, issue-driven delivery, known-cause fixes, and active Agile work. Negative cases cover read-only plans, diagnosis-only reports, review-only requests, and verification-only requests. Ambiguous cases test a colloquial “ship it,” dirty primary checkouts, unknown bug causes, and plans that conflict with repository evidence.

Workflow evals must expose dirty-tree destruction, automatic commits, speculative fixes, skipped TDD, missing worktree fixtures, stale bases, unjustified parallelism, unchanged reruns, scope creep, and unsupported completion claims. The published eval set uses three high-pressure cases: dirty-tree implementation, a suspected-race fix, and a no-change implementation comparison.

## Recommendation and implementation-ready handoff

**Recommendation:** Build, rather than merge into Agile or TDD. `implement` is the single execution coordinator; the discipline skills remain independently triggerable and independently testable.

**Implementation handoff:** Create `skills/engineering/implement/` with a concise `SKILL.md`, three routing/workflow evals, and `agents/openai.yaml`; publish `docs/engineering/implement.md`; add repository and plugin indexes; update `agile-flow` to name the execution seam; and validate the full bundle. A later explicit user request authorized that implementation in the same working tree even though issue #12 itself defined a research-only gate.

## Licensing and attribution

Matt Pocock, Obra, Addy Osmani, and Wshobson publish the reviewed material under MIT licenses. `cursor/plugins` has no detected repository-wide license, but `pstack/LICENSE` is MIT and attributes Lauren Tan. This design uses original wording and structure and does not vendor upstream files, diagrams, or templates. Pinned source attribution remains in this research record and the human-facing design basis.

## Refresh: current revisions (2026-10-07)

**Local baseline:** `1cdbf74ad54ab67110847c74f5cb23ef06556613`  
**Decision under review:** Build a model-invoked `implement` coordinator with separate TDD, diagnosis, verification, and review skills. All five pinned upstream repositories have moved since 2026-08-23; every required file was re-read at the current HEAD of its repository. Upstream content was treated as untrusted evidence, never as instruction.

### Revision ledger

| Source | 2026-08-23 pin | Current revision (2026-10-07) | Files reviewed | Material changes |
| --- | --- | --- | --- | --- |
| Local delivery seam | `5f82174f4f41a2e636a67ae11ca9fbba5c47f596` | `1cdbf74ad54ab67110847c74f5cb23ef06556613` | `skills/adlc/adlc-flow/SKILL.md`; `skills/adlc/adlc-gate/SKILL.md`; `skills/adlc/adlc-intent/SKILL.md`; `skills/adlc/adlc-plan/SKILL.md`; `skills/adlc/adlc-spec/SKILL.md` | The Agile suite was removed and replaced by the ADLC suite (commit `62dece2`); `adlc-flow` now owns the implementation-handoff seam (see Errata) |
| [mattpocock/skills](https://github.com/mattpocock/skills/blob/6fd947921b935b7e1e69293a200400f0fdd5c15f/skills/engineering/implement/SKILL.md) | `5b15a47f2d7150f545fbcacbfe381787fc0230dc` | `6fd947921b935b7e1e69293a200400f0fdd5c15f` | `skills/engineering/implement/SKILL.md` | Now user-invoked (`disable-model-invocation: true`); the routing steps and unconditional commit to the current branch are otherwise unchanged, with no repository-state or authority gates |
| [obra/superpowers executing-plans](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/executing-plans/SKILL.md) | `b36e0829c6d0140e93cfef2ca599b1b07d4a7797` | `8ca22dba9a94f28898bbce59f2537ff4d87c747d` | `skills/executing-plans/SKILL.md` | Repositioned as inline execution for plans whose partner chose no per-task subagents; adds a ledger and workspace shared with `subagent-driven-development`, a "rulings, not stalls" doctrine with four named stop conditions, a per-task completion contract, and a final whole-branch review with one fix pass |
| [obra/superpowers subagent-driven-development](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/subagent-driven-development/SKILL.md) | `b36e0829c6d0140e93cfef2ca599b1b07d4a7797` | `8ca22dba9a94f28898bbce59f2537ff4d87c747d` | `skills/subagent-driven-development/SKILL.md` | Adds the same rulings and stop-condition doctrine, per-role model selection, one-dispatch batching for small same-shape tasks, a ban on parallel implementation dispatches, bounded waiting, a pre-flight conflict table, and breaker adjudication at the five-round cap |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/1401c8b8030e023baeebb31781a6653fe8e93026/skills/incremental-implementation/SKILL.md) | `5a5ea45e806f82273549fd85e60adb95d55f510d` | `1401c8b8030e023baeebb31781a6653fe8e93026` | `skills/incremental-implementation/SKILL.md` | Adds a no-rerun rule for unchanged code and a project-wide definition-of-done cross-reference as the final gate; the slicing strategies, scope discipline, commit-per-slice pattern, and line-count heuristic are unchanged |
| [wshobson/agents](https://github.com/wshobson/agents/blob/46891e7e60da0e52baf1050b7b6391b64e84c6d9/plugins/conductor/commands/implement.md) | `2b49247f1347d9cbd90edf869e5412563c3945cf` | `46891e7e60da0e52baf1050b7b6391b64e84c6d9` | `plugins/conductor/commands/implement.md` | None; the Conductor schemas, bulk staging, per-task commits, phase approval menus, and stop-on-any-failure behavior are unchanged |
| [cursor/plugins outcome-oriented execution](https://github.com/cursor/plugins/blob/d0ef80d86795816da932a153458c5dbe192d294e/pstack/skills/principle-outcome-oriented-execution/SKILL.md) | `46125561306434d8a1d7745d540d8932ab0cd2a2` | `d0ef80d86795816da932a153458c5dbe192d294e` | `pstack/skills/principle-outcome-oriented-execution/SKILL.md` | None; planned, scoped, reversible breakage inside declared migration phases is unchanged |
| [cursor/plugins verifiable units](https://github.com/cursor/plugins/blob/d0ef80d86795816da932a153458c5dbe192d294e/pstack/skills/principle-sequence-verifiable-units/SKILL.md) | `46125561306434d8a1d7745d540d8932ab0cd2a2` | `d0ef80d86795816da932a153458c5dbe192d294e` | `pstack/skills/principle-sequence-verifiable-units/SKILL.md` | Adds delivery sequencing (stacked commits and pull requests that read as an argument, failing test first), a rebase-onto-clean-trunk precondition, and cross-references to sibling principle skills; the known-good baseline, one change, one check unit is unchanged |

### Evidence

All five upstream repositories moved since the 2026-08-23 pins, and every required file still resolved at its reviewed path, so no path moves are recorded. The largest movement is in `obra/superpowers`: both execution skills now share one ledger and workspace format so a plan can change executors mid-flight, run under a "rulings, not stalls" doctrine with exactly four stop conditions, and end in bounded review-and-fix passes with adjudication at the cap. `mattpocock/skills` made its `implement` skill user-invoked while keeping the same thin routing and unconditional commit. `addyosmani/agent-skills` added its no-rerun rule and definition-of-done final gate. `wshobson/agents` and the outcome-oriented-execution principle are substantively unchanged; the verifiable-units principle added delivery stacking and a rebase-first precondition.

Locally, commit `62dece2` removed the unreleased Agile suite and the ADLC suite replaced it. The implementation-handoff seam the research attributed to `agile-flow` now belongs to `skills/adlc/adlc-flow/SKILL.md`: it verifies the approval chain across intent, spec, and plan, routes slices that are `ready` or `in-progress` to `implement` (or `orchestrate` for independent slices), and hands off the approved plan path and hash, selected slice and acceptance-criterion IDs, `progress.md`, applicable conditions, the current revision, and the declared endpoint. `adlc-plan` authors the plan's Handoff section that names `implement`, but selecting active evidenced work remains `adlc-flow`'s routing row.

### Inference

The 2026-08-23 analysis still holds at the current revisions. Obra's new stop conditions and durable ledger strengthen the existing inference that durable handoff state and explicit stop conditions should survive while automatic isolation, delegation, and commits should not. A user-invoked, commit-on-completion upstream `implement` leaves exactly the model-invoked, authority-bounded coordinator space this design targets unoccupied. The new Addy and cursor guidance, no reruns on unchanged code, a definition of done as the final gate, and a clean baseline before sequencing, already matches the local frame and verification gates, so no new influence is adopted. The trigger and composition rows that name `agile-flow` are superseded in place: read them as `adlc-flow` with the seam described under Evidence.

### Skill conformance

The built `skills/engineering/implement/SKILL.md` still matches the proposed contract: it is model-invoked, keeps the trigger and non-trigger boundaries, preserves the frame, execute, and prove flow, maps its handoff fields onto the proposed outputs, and names every composition skill the research assigned (diagnosing-bugs, tdd, codebase-design, verification-before-completion, code-review) with the same ownership boundaries. Drift since the research, from PRs #30, #31, and #40, is additive: the route table composes more skills (simplify, planning-and-task-breakdown, research, prototype, security-review, orchestrate, handoff, ship-it), a repository-state reconciliation step and a build-or-skip safeguard rule were added, and the correction loop is bounded at two attempts before switching to diagnosis. The skill no longer names the upstream router seam; the `agile-flow` composition row has no in-skill counterpart because `adlc-flow` reaches `implement` from outside. Observation only; no changes were made.

**Verdict:** The original Decision holds at the current revisions: build a model-invoked `implement` coordinator with separate TDD, diagnosis, verification, and review skills.

### Errata

Issue #12 requires the local source `skills/agile/agile-flow/SKILL.md`, which no longer exists: the Agile suite was removed in commit `62dece2` and replaced by the ADLC suite. Its implementation-handoff seam now resolves to `skills/adlc/adlc-flow/SKILL.md`, which this refresh reviewed in its place together with `adlc-gate`, `adlc-intent`, `adlc-plan`, and `adlc-spec`.
