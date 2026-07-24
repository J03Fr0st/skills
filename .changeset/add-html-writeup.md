---
"j03fr0st-skills": minor
---

Add the `html-writeup` skill: deliver findings as a single self-contained HTML document — prose at a readable measure, plus tables, diagrams, code, callouts and stat rows — then verify it in a real browser before handing it over.

- Document shell using `color-scheme: light dark` with `light-dark()` tokens, a measure-based grid with a wide-escape column for tables and diagrams, fluid `clamp()` type, and print rules.
- Component vocabulary: callouts, tables, stat rows, code blocks, badges, collapsible detail, footnotes, contents.
- Mermaid loaded through an import map pinned to an exact version, with optional SRI `integrity`.
- A craft reference covering hierarchy dimensions, tight-then-generous rhythm, restraint, and writing — headings state their conclusion so the argument survives skimming.
- Space-aware navigation: contents list, sticky scrollspy rail, or ARIA tabs, chosen by measured page length and by whether sections are read in sequence or instead of each other. Tabs are a progressive upgrade over plain sections, so diagrams size themselves before any panel is hidden, printing shows every panel, and deep links open the right tab.
- Verification step covering both silent failure modes — a syntax error card and raw diagram source left by a blocked module — plus overflow, heading order, and a squint test on the rendered page.
