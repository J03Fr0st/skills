# Changelog

## 0.2.0

### Minor Changes

- [#4](https://github.com/J03Fr0st/skills/pull/4) [`190062c`](https://github.com/J03Fr0st/skills/commit/190062cd4330455bf0c8195a8142c6f8d7df9086) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add a composable Agile software-delivery suite:

  - `agile-refine` shapes one valuable, Ready backlog item and embeds deep Grill Me refinement for consequential uncertainty.
  - `agile-sprint-plan` plans one coherent cycle around an observable goal and realistic capacity.
  - `agile-sprint-review` makes evidence-backed product acceptance decisions from working behavior.
  - `agile-retro` turns delivery evidence into one bounded improvement experiment.
  - `agile-flow` gives humans one explicit router while preserving the repository's existing delivery workflow and artifacts.

  Backlog items and cycle records record the items blocking them and note when an agent drafted them. Refinement shapes work that changes no observable behavior — migrations, mechanical renames, gating decisions — as enabling items verified by preservation rather than by a demonstration that does not exist.

- [#9](https://github.com/J03Fr0st/skills/pull/9) [`c4da30c`](https://github.com/J03Fr0st/skills/commit/c4da30cfe228961a15ec5f6a7651419dee809e2d) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add the `code-review` skill with quick, standard, and deep levels. Standard is
  a bounded single-reviewer default; deep review adds independent defects,
  specification, and standards/architecture passes plus evidence-based candidate
  validation. All levels share a defect-first finding gate, merge-base scope,
  repository-rule awareness, and concise findings-first output.

- [`78c22f7`](https://github.com/J03Fr0st/skills/commit/78c22f77130d30f3ad79361d80bb4b7b5e77c79f) Thanks [@J03Fr0st](https://github.com/J03Fr0st)! - Add the `codebase-design` skill for designing cohesive modules and explicit relationships. It expands the deep-module vocabulary with evidence-gated DRY, KISS, and YAGNI guidance, dependency direction, communication contracts, SOLID trade-offs, distributed reliability, seam-aligned testing, production evidence, architecture enforcement, and progressive deepening and alternative-design workflows.

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
