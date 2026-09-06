# TDD Skill Research

**Research date:** 2026-08-23  
**Local baseline:** `5f82174f4f41a2e636a67ae11ca9fbba5c47f596`  
**Decision:** Build a model-invoked `tdd` discipline skill with explicit red, green, refactor, test-quality, and exception gates.

## Scope and method

This review covers every source named in issue #13, the local testing-skill guidance, and recent community evidence. Each upstream link pins the reviewed revision. Evidence describes what sources contain; inference interprets it; recommendation defines the original local design.

The supporting Last30Days scan found 63 Reddit, Hacker News, and GitHub items, but Reddit was partial after rate limiting and only 31 dated items were from the last seven days. The results indicate live concerns, not measured consensus.

## Recent community signal

**Evidence:** A recent [large-project migration discussion](https://www.reddit.com/r/ClaudeWorkflows/comments/1vvxwj2/workflow_safe_migration_strategy_for_large/) emphasized small vertical slices and characterization tests. A [discussion of agent skill enforcement](https://www.reddit.com/r/ClaudeCode/comments/1vtha5e/i_built_procoder_a_senior_developer_layer_for_ai/) argued that agents can skip advisory steps. [ProofRun](https://github.com/yebiguo/ProofRun) and similar proof receipts reflect demand for command evidence rather than a narrative claim that tests ran.

**Inference:** A useful TDD skill must make red and green observable, catch wrong-red failures, and disclose exceptions. Merely saying “use TDD” is too easy to satisfy ceremonially.

**Recommendation:** Require fresh focused-command evidence at each phase, while keeping an explicit practical-harness escape path that cannot be mistaken for TDD.

## Revision and path ledger

| Source | Revision | Files reviewed |
| --- | --- | --- |
| Local Agile and writing guidance | `5f82174f4f41a2e636a67ae11ca9fbba5c47f596` | `skills/agile/agile-flow/SKILL.md`; `skills/writing-for-agents/SKILL.md`; `skills/writing-for-agents/references/SKILL-MECHANICS.md`; `skills/writing-for-agents/references/TESTING-SKILLS.md` |
| [mattpocock/skills TDD](https://github.com/mattpocock/skills/blob/5b15a47f2d7150f545fbcacbfe381787fc0230dc/skills/engineering/tdd/SKILL.md) | `5b15a47f2d7150f545fbcacbfe381787fc0230dc` | `skills/engineering/tdd/SKILL.md`; [`tests.md`](https://github.com/mattpocock/skills/blob/5b15a47f2d7150f545fbcacbfe381787fc0230dc/skills/engineering/tdd/tests.md); [`mocking.md`](https://github.com/mattpocock/skills/blob/5b15a47f2d7150f545fbcacbfe381787fc0230dc/skills/engineering/tdd/mocking.md) |
| [obra/superpowers TDD](https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/skills/test-driven-development/SKILL.md) | `b36e0829c6d0140e93cfef2ca599b1b07d4a7797` | `skills/test-driven-development/SKILL.md`; [`writing-good-tests.md`](https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/skills/test-driven-development/writing-good-tests.md) |
| [addyosmani/agent-skills TDD](https://github.com/addyosmani/agent-skills/blob/5a5ea45e806f82273549fd85e60adb95d55f510d/skills/test-driven-development/SKILL.md) | `5a5ea45e806f82273549fd85e60adb95d55f510d` | `skills/test-driven-development/SKILL.md`; [`references/testing-patterns.md`](https://github.com/addyosmani/agent-skills/blob/5a5ea45e806f82273549fd85e60adb95d55f510d/references/testing-patterns.md); [`evals/cases/test-driven-development.json`](https://github.com/addyosmani/agent-skills/blob/5a5ea45e806f82273549fd85e60adb95d55f510d/evals/cases/test-driven-development.json) |
| [wshobson/agents TDD workflows](https://github.com/wshobson/agents/tree/2b49247f1347d9cbd90edf869e5412563c3945cf/plugins/tdd-workflows) | `2b49247f1347d9cbd90edf869e5412563c3945cf` | `plugins/tdd-workflows/.claude-plugin/plugin.json`; `plugins/tdd-workflows/commands/tdd-cycle.md`; `plugins/tdd-workflows/commands/tdd-red.md`; `plugins/tdd-workflows/commands/tdd-green.md`; `plugins/tdd-workflows/commands/tdd-refactor.md`; `plugins/tdd-workflows/agents/tdd-orchestrator.md`; `plugins/tdd-workflows/agents/code-reviewer.md` |
| [cursor/plugins pstack TDD](https://github.com/cursor/plugins/blob/46125561306434d8a1d7745d540d8932ab0cd2a2/pstack/skills/tdd/SKILL.md) | `46125561306434d8a1d7745d540d8932ab0cd2a2` | `pstack/skills/tdd/SKILL.md`; `pstack/.cursor-plugin/plugin.json`; `pstack/LICENSE` |

## Source evidence

### Matt Pocock

**Evidence:** The skill strongly favors tests through public seams, expected values derived independently of production algorithms, mocks only at boundaries, and vertical tracer-bullet slices. It asks for human confirmation of seams and treats refactoring as outside TDD.

**Inference:** Its test-quality rules are valuable. Mandatory confirmation at each seam is too interruptive, and refactor belongs in the conventional loop when behavior stays green.

### Obra

**Evidence:** The workflow requires observing a correct red failure, writing minimum green code, and refactoring while green. It includes strong shortcut rationalizations and mutation-oriented tests. Its delete-and-restart response to production-first code assumes the code is task-owned and safe to discard.

**Inference:** Wrong-red detection and rationalization resistance should be load-bearing. Deleting pre-existing or user-authored work is unacceptable.

### Addy Osmani

**Evidence:** The skill discovers repository-specific commands, distinguishes focused and full suites, includes pressure evals, and covers several ecosystems. It also includes fixed test-pyramid ratios and browser/debugging guidance beyond the core loop.

**Inference:** Repository discovery and pressure cases generalize; fixed coverage proportions do not.

### Wshobson

**Evidence:** The plugin exposes explicit red, green, refactor, and orchestration phases with recovery and resumable artifacts. It uses a much larger default workflow, fixed thresholds, bulk test specification, repeated approval stops, and autonomous commit guidance.

**Inference:** Phase gates are useful, but the local skill should be one concise loop without framework state or commit behavior.

### Cursor pstack

**Evidence:** The skill forces red only when a stable, executable, affordable signal exists and otherwise requires disclosure and the closest practical verification.

**Inference:** This is the necessary real-world exception, but it needs objective criteria and a different outcome for explicit versus implicit TDD so it cannot become a routine escape.

## Failure modes the design must prevent

- adding tests after production code and calling the sequence TDD;
- accepting import, syntax, setup, missing-fixture, or unrelated failures as red;
- accepting an already-green test as proof that the new requirement is absent;
- asserting private calls or duplicating the production algorithm in expected values;
- mocking owned behavior until the test cannot catch a realistic regression;
- writing a speculative horizontal suite before one vertical behavior works;
- deleting or overwriting pre-existing or user-authored code to manufacture red;
- treating rerun-to-green as proof when the test is flaky;
- forcing unit-test ceremony onto prose, metadata, or generated artifacts;
- using a missing harness as a silent excuse to skip test-first work;
- treating TDD evidence as proof of packaging, docs, configuration, deployment, or acceptance.

## Proposed contract

### Triggers

- explicit TDD, test-first, or red-green-refactor requests;
- requests for a regression test before a fix;
- an `implement` behavior slice with a practical executable seam.

### Non-triggers

- diagnosis where the failing behavior or responsible seam is not yet established;
- requests only to run or verify existing tests;
- documentation, metadata, and static-content changes with no behavior-bearing seam;
- code review or broad test strategy advice without requested implementation.

### Inputs and outputs

Input is one observable behavior, repository test commands and conventions, the nearest stable seam, and any diagnosis or acceptance evidence. Output is a sequence of fresh red, green, and post-refactor command results, the resulting coherent code/test slice, test-quality caveats, bounded exceptions, and broader verification still required.

### Core workflow

1. Define one behavior, a realistic wrong implementation the test would reject, and the focused command.
2. **Red:** execute the test and confirm the expected behavioral failure.
3. **Green:** apply the minimum production change, rerun the focus, then run nearby affected tests.
4. **Refactor:** change structure only while green and rerun after the final edit.
5. Repeat for another observable slice or hand final claims to `verification-before-completion`.

## Exception policy

| Condition | Policy |
| --- | --- |
| Explicit TDD, but no practical red path | Stop before production edits and offer a choice between bounded harness investment and an explicitly non-TDD path |
| TDD selected implicitly by `implement`, but no practical red path | Return control with the reason, use the closest safe executable check, and do not claim TDD |
| Legacy or user-authored implementation already exists | Preserve it; add characterization or regression evidence without claiming red-first authorship |
| Agent wrote production code first in the same task | Reverse only the safe, non-overlapping task-owned delta, then establish red; otherwise disclose the sequence |
| Slow suite | Use a focused phase command and defer the relevant broader suite to final verification |
| Flaky signal | Prove and isolate the flake; a lucky pass is not green evidence |
| Prose or metadata | Use artifact checks outside TDD |
| Generated output | Test or verify the generator or observable behavior, not hand-edited generated files |

A practical red path requires an observable seam, deterministic signal, locally runnable command, and setup proportionate to the authorized task.

## Composition rules

- `implement` owns repository safety, scope, sequencing, and delivery; it calls TDD per behavior slice.
- `diagnosing-bugs` owns reproduction and cause when intended versus actual behavior is uncertain.
- `verification-before-completion` owns the fresh final evidence after all edits; phase results are inputs, not a substitute.
- `code-review` independently evaluates the resulting change and does not perform the TDD loop.

## Routing and workflow eval plan

Positive cases include explicit test-first changes, regression-test-first fixes, and behavior slices routed from implementation. Negative cases include docs-only work, completion-only test runs, diagnosis before a stable symptom, and review requests. Ambiguous cases cover existing user code, no harness, flaky tests, and tests that fail for the wrong reason.

Pressure evals should combine authority, deadlines, and a dictated fix. They must detect production-first shortcuts, invalid red, excessive mocking, coupled expected values, broad-suite ritual, and false TDD claims. The published evals cover a late retry fix, a slow/flaky legacy suite, and a documentation-only exception.

## Recommendation and implementation-ready handoff

**Recommendation:** Build a separate model-invoked `tdd` skill. Do not merge it into `implement`; direct TDD requests and regression-test-first diagnosis handoffs need the same canonical discipline.

**Implementation handoff:** Create `skills/engineering/tdd/` with `SKILL.md`, `agents/openai.yaml`, and three pressure/routing evals; publish `docs/engineering/tdd.md`; wire indexes and the plugin; and use `verification-before-completion` as the final gate. A later explicit user request authorized implementation alongside this research, superseding the research-only limit of issue #13 for the working-tree task.

## Licensing and attribution

The reviewed Matt Pocock, Obra, Addy Osmani, and Wshobson sources are MIT-licensed. `cursor/plugins` has no repository-wide detected license, while `pstack/LICENSE` explicitly applies MIT within that subtree. The local skill uses original wording and structure and does not vendor upstream reference files or eval fixtures.
