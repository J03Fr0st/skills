# Changelog

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
