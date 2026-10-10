# Changelog

## 0.5.0

### Minor Changes

- [#48](https://github.com/J03Fr0st/skills/pull/48) [`1b38fcf`](https://github.com/J03Fr0st/skills/commit/1b38fcff8517cabdc71b1b54f168b8f8ff4b1d2b) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - `pr-description` now writes PR bodies as a brief summary with the smallest
  useful visual (pseudocode, a call, component, or file tree, Mermaid, or a diff
  sketch), before/after evidence, optional review notes, and a merge-danger
  section with separate door and blast-radius fields. Adapted from Matt Pocock's
  `pr` skill and Dex Horthy's `show-me`. Repository PR templates stay
  authoritative.

## 0.4.0

### Minor Changes

- [#46](https://github.com/J03Fr0st/skills/pull/46) [`4ffeb90`](https://github.com/J03Fr0st/skills/commit/4ffeb90f9943dff771d329ce736f49ec75045490) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Split `git-workflow` into three model-invoked skills so each request type
  triggers on its own:
  
  - `pr-description` writes PR titles and bodies from the final diff, closing with
    a merge-danger line.
  - `git-worktrees` owns selecting, preparing, retiring, and recovering isolated
    checkouts.
  - `git-workflow` keeps commits, branches, rebases, stacks, backports, local
    integration, policy, and recovery. Merging a PR on its forge now belongs only
    to `babysit-pr`.
  
  `git-kit.mjs` drops the `pr-context` command and PR templates; `pr-description`
  uses plain Git commands and its own assets instead.

## 0.3.1

### Patch Changes

- [#43](https://github.com/J03Fr0st/skills/pull/43) [`e6257aa`](https://github.com/J03Fr0st/skills/commit/e6257aaf1e6504291eacb61aa1d1dec397c07e29) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Make `git-workflow` trigger on everyday PR requests. Its description now names the words people use ("create/open/raise a PR", `gh pr create`, commit, push) and tells the agent to load it before writing any PR title or body, so harness PR defaults no longer replace the skill's title and description rules. `ship-it` now routes plain "create a PR" requests to `git-workflow`, and two trigger evals were added.

## 0.3.0

### Minor Changes

- [#28](https://github.com/J03Fr0st/skills/pull/28) [`6e7c084`](https://github.com/J03Fr0st/skills/commit/6e7c08458882a8b99f23b27827f130b30e039d44) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Strengthen `tdd` with guidance from all preferred source repositories: property-test selection, compile-then-runtime red for typed languages, surprising-red triage, reporting every observed failure, a "testing addressed" gate, risk-based slice selection, plan input handled as data, and a new test-quality reference with two added evals.

## 0.2.2

### Patch Changes

- [#31](https://github.com/J03Fr0st/skills/pull/31) [`4ad305f`](https://github.com/J03Fr0st/skills/commit/4ad305fb0e60639742067e98c125d82b864943e0) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Fold selected Cursor pstack principles into existing skills:
  
  - `coding-standards` adds a Types rule: tagged unions, exhaustive handling, branded identifiers, and schema-derived types.
  - `codebase-design` flags scattered domain conditionals and phase-named modules, and deletes internal-only legacy shapes in the same change as the caller migration.
  - `implement` routes repeated mechanical changes through a rerunnable codemod kept in the diff.
  - `writing-for-agents` promotes repeatedly restated rules into checks.

## 0.2.1

### Patch Changes

- [#38](https://github.com/J03Fr0st/skills/pull/38) [`c6a7335`](https://github.com/J03Fr0st/skills/commit/c6a73358417a07c103025b29293908f11bef90e0) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Strengthen the five ADLC skills with a shared portable content-hash helper,
  full upstream approval-chain checks, revision-bound decisions and delivery
  evidence, explicit conditional approval handling, and declared delivery endpoints.
  Preserve existing authorization and progress across turns and plan revisions;
  add regression checks and scenario fixtures for the lifecycle boundaries.

- [#40](https://github.com/J03Fr0st/skills/pull/40) [`45dc9ee`](https://github.com/J03Fr0st/skills/commit/45dc9eeac03b14730b4364d02db4105c031a6b9b) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Fold the 2026-10 source-repository sweep into eight engineering skills:
  structural prevention for recurring root causes in `diagnosing-bugs`, a
  "build what was asked" rule in `implement`, agent-proof design red flags in
  `codebase-design`, a ranked mechanism ladder in `compound-learnings`, a test
  value bar in `tdd` and `code-review`, file-based worker results in
  `orchestrate`, and a measured-claims reference in
  `verification-before-completion`.

## 0.2.0

### Minor Changes

- [#30](https://github.com/J03Fr0st/skills/pull/30) [`62dece2`](https://github.com/J03Fr0st/skills/commit/62dece20175d79e9d052329c5d7cd478b244e18f) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add the user-invoked ADLC (agentic development lifecycle) suite:

  - `adlc-intent` interviews the human and records problem, outcome, non-goals, and success signal in `intent.md`.
  - `adlc-spec` turns approved intent into observable behavior and numbered acceptance criteria in `spec.md`.
  - `adlc-plan` composes `planning-and-task-breakdown` and adds acceptance coverage, separate verifiers, and rollback in `plan.md`.
  - `adlc-gate` self-checks exit criteria and records a named human decision against the artifact's content hash, so any later edit makes the approval stale.
  - `adlc-flow` routes work from its evidenced stage to the next command or the existing engineering delivery skills.

- [#9](https://github.com/J03Fr0st/skills/pull/9) [`c4da30c`](https://github.com/J03Fr0st/skills/commit/c4da30cfe228961a15ec5f6a7651419dee809e2d) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add the `code-review` skill with quick, standard, and deep levels. Standard is
  a bounded single-reviewer default; deep review adds independent defects,
  specification, and standards/architecture passes plus evidence-based candidate
  validation. All levels share a defect-first finding gate, merge-base scope,
  repository-rule awareness, and concise findings-first output.

- [#18](https://github.com/J03Fr0st/skills/pull/18) [`7405922`](https://github.com/J03Fr0st/skills/commit/7405922c950b68942ba09d04add24b46cc85adeb) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add coding-standards with a project-first shared baseline, conditional backend
  and frontend references, documentation, and paired evaluation scenarios.

- [`bd4a7b5`](https://github.com/J03Fr0st/skills/commit/bd4a7b56db0effb22c131e5121ca7a6e20db3a86) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add four composable engineering execution skills:

  - `implement` coordinates authorized repository changes while preserving dirty state and external-action boundaries.
  - `tdd` requires observable red, green, and refactor evidence with bounded, explicit exceptions.
  - `diagnosing-bugs` separates read-only root-cause investigation from later remediation.
  - `verification-before-completion` maps final claims to fresh, scope-matched evidence and honest terminal states.

  The suite includes revision-pinned research, adversarial eval cases, human-facing documentation, review handoffs, and plugin publication metadata.

- [`bd4a7b5`](https://github.com/J03Fr0st/skills/commit/bd4a7b56db0effb22c131e5121ca7a6e20db3a86) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add `grilling`, a model-invoked productivity skill for dependency-aware, live stress-testing of consequential plans, decisions, and ideas.

- [#32](https://github.com/J03Fr0st/skills/pull/32) [`041a04f`](https://github.com/J03Fr0st/skills/commit/041a04f677912e95aa0b6479b78ba9b54ca2d851) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add ship-it to coordinate finished changes through review, verification, PR publication and the requested delivery endpoint using existing workflow skills.

- [`bd4a7b5`](https://github.com/J03Fr0st/skills/commit/bd4a7b56db0effb22c131e5121ca7a6e20db3a86) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add a scoped, behavior-preserving simplify skill with contract checks, runnable
  evaluation fixtures, documentation, and implementation/design routing.

- [#34](https://github.com/J03Fr0st/skills/pull/34) [`f659326`](https://github.com/J03Fr0st/skills/commit/f659326d8f56f804f26a8afc8ac476cdd07c167d) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add compound-learnings and property-based-testing skills, and fold findings from
  the 2026-09 preferred-source sweep into code-review, git-workflow,
  verification-before-completion, tdd, security-review, orchestrate, planning,
  research, and ADLC skills. link-skills.sh no longer deletes directories it did
  not create.

- [`bd4a7b5`](https://github.com/J03Fr0st/skills/commit/bd4a7b56db0effb22c131e5121ca7a6e20db3a86) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add planning-and-task-breakdown, research, security-review, prototype, and handoff.
  Connect their ownership boundaries to implementation, document
  the workflow, and add focused blast-radius and project-verification guidance.

- [`82e32e8`](https://github.com/J03Fr0st/skills/commit/82e32e89e5151fdefda11c3dc934905bd1123ed9) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add babysit-pr with a resumable GitHub watch loop, explicit completion endpoints, and scoped recovery guidance.

- [`78c22f7`](https://github.com/J03Fr0st/skills/commit/78c22f77130d30f3ad79361d80bb4b7b5e77c79f) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add the `codebase-design` skill for designing cohesive modules and explicit relationships. It expands the deep-module vocabulary with evidence-gated DRY, KISS, and YAGNI guidance, dependency direction, communication contracts, SOLID trade-offs, distributed reliability, seam-aligned testing, production evidence, architecture enforcement, and progressive deepening and alternative-design workflows.

- [#29](https://github.com/J03Fr0st/skills/pull/29) [`e1af4df`](https://github.com/J03Fr0st/skills/commit/e1af4df870ac789e8840989f6dfd2a5617adc8d2) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add git-workflow for repository-aware branching, worktree lifecycle, PR titles and descriptions, and verified integration.

  Include policy decisions, common recipes, recovery, PR examples, integration pitfalls, environment setup, and scenario/mechanics evaluations.

  Provide directly runnable Git context helpers and PR/commit draft templates with exclusive file creation.

- [#30](https://github.com/J03Fr0st/skills/pull/30) [`62dece2`](https://github.com/J03Fr0st/skills/commit/62dece20175d79e9d052329c5d7cd478b244e18f) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add a portable orchestrate skill for native Codex and Claude Code subagents,
  with bounded assignments, recovery of interrupted writers, and verification
  of integrated results.

  Bundle five native roles for each host, register the Claude plugin agents,
  and provide a conflict-safe project installer for standalone setup.

  Make role-specific skill loading explicit and allow Claude agents to invoke
  skills while retaining their existing tool and ownership boundaries.

- [#11](https://github.com/J03Fr0st/skills/pull/11) [`5f82174`](https://github.com/J03Fr0st/skills/commit/5f82174f4f41a2e636a67ae11ca9fbba5c47f596) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add the `writing-for-agents` skill for the documents agents consume: skills,
  `AGENTS.md`, `CLAUDE.md`, and reference files reached by a pointer. It carries
  the two-loads model, context pointers, the information hierarchy, completion
  criteria, leading words, and a pruning discipline in the body, with three
  branch references for skill mechanics, instruction files, and verification.

  The skill merges three upstream lines of work and resolves where they conflict.
  Descriptions open with bounded identity, list trigger branches pushily, and never
  summarize the process, which reconciles the shortcut evidence against the
  undertriggering evidence. Verification is a proportionate tier rather than a
  universal baseline requirement, with a discipline document still gated on a
  documented baseline failure before it ships.

- [#8](https://github.com/J03Fr0st/skills/pull/8) [`7ecaaf3`](https://github.com/J03Fr0st/skills/commit/7ecaaf39b827cd2dc91711c8c32598999e76deb7) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add the `writing-for-humans` skill for clear, specific, genre-aware prose with
  separate writing, diagnosis, editing, rewriting, and sample-grounded voice
  modes. It includes meaning-preservation guardrails, false-positive-aware
  editorial lenses, a deterministic literal and Markdown-structure checker, and
  evaluation cases for accuracy, restraint, cleanup, voice transfer, and
  leaving a sound draft alone.

### Patch Changes

- [#33](https://github.com/J03Fr0st/skills/pull/33) [`e0f63b5`](https://github.com/J03Fr0st/skills/commit/e0f63b5df6db134338b1b34c652f72309efe1be4) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Route quick explanations and known-cause fixes away from the full `diagnosing-bugs` investigation while preserving the evidence-led workflow for unresolved causes.

- [#36](https://github.com/J03Fr0st/skills/pull/36) [`a5bcb88`](https://github.com/J03Fr0st/skills/commit/a5bcb884f1aa322e90ed4acb544e8b0b3c4ea2d0) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Teach `orchestrate` to track changes across parallel writers. In Claude Code, a concurrent writer gets an isolated worktree only when that worktree's base contains the slice's prerequisites. The root records each writer's change set and integrates change sets one at a time with checks after each. Slice state and evidence go to the plan's delivery record, such as an ADLC `progress.md`.

- [#35](https://github.com/J03Fr0st/skills/pull/35) [`7b74173`](https://github.com/J03Fr0st/skills/commit/7b7417333b8fc39e51faef232b9b7759d57d8f8d) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Refine the ADLC suite from its first field use. Add a living `progress.md` delivery record that `adlc-flow` routes from, and add `/adlc-gate slice <id>` for sign-offs during delivery. Open items now carry a `decide by` stage. Spec and plan gates require the human to reply to the draft, and plan approvals list each decision the plan makes. Gates show ready-to-send decision lines, allow an opt-in sole approver, and describe commit attestation accurately. The hash now has a PowerShell equivalent and an LF `.gitattributes` rule, and intent interviews record the problem and why-now in the human's own words.

- [#19](https://github.com/J03Fr0st/skills/pull/19) [`9970739`](https://github.com/J03Fr0st/skills/commit/9970739dd3e8720ce3ee2b31ef5ac6a6a4199bc6) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Synchronize plugin metadata during releases and add repository validation,
  cross-platform checks, dependency maintenance, and contribution guidance.

## 0.1.0

### Minor Changes

- [`4750653`](https://github.com/J03Fr0st/skills/commit/4750653426f4dfa0decf57e330efcbe6838c3f2d) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add the `html-writeup` skill: deliver findings as a single self-contained HTML document — prose at a readable measure, plus tables, diagrams, code, callouts and stat rows — then verify it in a real browser before handing it over.

  - Document shell using `color-scheme: light dark` with `light-dark()` tokens, a measure-based grid with a wide-escape column for tables and diagrams, fluid `clamp()` type, and print rules.
  - Component vocabulary: callouts, tables, stat rows, code blocks, badges, collapsible detail, footnotes, contents.
  - Mermaid loaded through an import map pinned to an exact version, with optional SRI `integrity`.
  - A craft reference covering hierarchy dimensions, tight-then-generous rhythm, restraint, and writing — headings state their conclusion so the argument survives skimming.
  - Space-aware navigation: contents list, sticky scrollspy rail, or ARIA tabs, chosen by measured page length and by whether sections are read in sequence or instead of each other. Tabs are a progressive upgrade over plain sections, so diagrams size themselves before any panel is hidden, printing shows every panel, and deep links open the right tab.
  - Verification step covering both silent failure modes — a syntax error card and raw diagram source left by a blocked module — plus overflow, heading order, and a squint test on the rendered page.

- [`0ba158a`](https://github.com/J03Fr0st/skills/commit/0ba158a1bdc16c2217f6bffe357c755ebb05ba8e) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add Codex metadata alongside each skill's Claude Code frontmatter so the set works in both harnesses without generated copies.

  - Add an `agents/openai.yaml` beside every `SKILL.md` with Codex UI metadata (`interface.display_name`, `interface.short_description`).
  - Mark every user-invoked skill with `policy.allow_implicit_invocation: false`, the Codex analog of `disable-model-invocation: true`, so Codex excludes it from implicit invocation while explicit `$skill` invocation still works.
  - Document the dual-harness invocation model in `.agents/invocation.md`, `CLAUDE.md`, and the promoted-bucket READMEs.
  - Add `AGENTS.md` as a symlink to `CLAUDE.md` so Codex reads the same repo instructions.

### Patch Changes

- [`5ec3e33`](https://github.com/J03Fr0st/skills/commit/5ec3e33e6b445baa995aa5d490cfdee44dcf92e8) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Pin the transitive `js-yaml` dependency branches used by Changesets to patched,
  major-compatible releases.

All notable changes to this skills library will be documented here.
