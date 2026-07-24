---
name: html-writeup
description: Self-contained HTML write-ups — a single shareable .html document carrying prose, diagrams, tables, and code, verified in a real browser. Use when the user wants findings, an analysis, an audit, a comparison, or a design doc presented as a visual document rather than terminal text; asks for an HTML report or standalone page; or wants a Mermaid diagram rendered.
---

# HTML Write-up

Deliver findings as a **write-up**: one **self-contained** `.html` file that opens straight from a double-click, offline, with no build step. It reads like a considered document — measured typography, diagrams where they beat prose, tables where they beat lists — and it survives being emailed as a single attachment.

Reach for this when the answer is too structured for the terminal: something with sections, comparisons, or relationships worth drawing.

## 1. Outline the spine

A write-up answers one question. Name it, then lay out the sections that get the reader there.

For each section, pick the form that carries the point with the least ceremony:

| The point is… | Use |
| --- | --- |
| A judgement, a narrative, a because | Prose |
| Things compared on shared axes | A table |
| Something graph-shaped — flow, hierarchy, sequence | A diagram |
| A handful of numbers that matter | A stat row |
| What the code actually says | A code block |
| A caveat that would derail the paragraph | A callout |

Lead with the conclusion — the reader should get the finding from the top of the page, with the evidence below it.

**Done when:** every section names its question and its form, and nothing is prose by default.

## 2. Build the page

Assemble from three references, loaded as needed:

- [references/SHELL.md](references/SHELL.md) — the document shell: theming, typography, layout, print, and the pinned-CDN pattern. Always start here.
- [references/COMPONENTS.md](references/COMPONENTS.md) — the write-up vocabulary: callouts, tables, code blocks, stat rows, footnotes, contents.
- [references/DIAGRAMS.md](references/DIAGRAMS.md) — Mermaid selection and syntax, and when to hand-build SVG instead.
- [references/CRAFT.md](references/CRAFT.md) — the quality bar: hierarchy, rhythm, restraint, and the writing. Read it before the prose, not after.
- [references/NAVIGATION.md](references/NAVIGATION.md) — contents, sticky rail, and tabs, chosen by how long the page runs. Reach for it when the write-up has more than a handful of sections, or sections the reader picks between.

Write real content — placeholder text hides the wrapping and overflow problems that only real sentences reveal. Headings state their conclusion, so the argument survives being skimmed.

Save to the OS temp dir unless the user names a path — `%TEMP%` on Windows, `$TMPDIR` (fallback `/tmp`) elsewhere — as `<slug>-<timestamp>.html`, so each run gets a fresh file and nothing lands in the repo.

**Done when:** every section from step 1 is built in its chosen form, and the only external request in the file is the pinned diagram CDN (or none, when the write-up has no Mermaid).

## 3. Verify in a browser

The page always *looks* finished — a broken diagram is a red **error card**, and a blocked CDN leaves the diagram's **raw source** sitting in the page as plain text. Neither crashes anything. Open it and look.

Work down this ladder until one rung works:

1. Browser tooling on the file directly, reading the console for errors.
2. Blocked from `file://` or `localhost`? Serve the directory (`python -m http.server <port>`) and open `http://127.0.0.1:<port>/<file>`.
3. No browser tooling? Open it for the user (`start` / `open` / `xdg-open`) and say what a healthy page looks like, so they confirm.

Check, in the live page:

- **Diagrams** — each drew its shape (the SVG's `aria-roledescription` says which), no error card, no raw source left visible.
- **Console** — clean. An integrity failure reports itself here and nowhere else.
- **Width** — `document.documentElement.scrollWidth` fits the window; wide tables and diagrams scroll inside their own container, never the page.
- **Headings** — one `h1`, and no level skipped below it.
- **Length** — measure `document.body.scrollHeight / window.innerHeight`. Past ~2 screens the page has earned a contents list, past ~6 a sticky rail; sections the reader picks between want tabs. Add what the measurement calls for, per NAVIGATION.md, then re-check.

Then look at the page, because craft doesn't show up in the DOM. Take a screenshot and apply the **squint test** from CRAFT.md: blurred, the most important thing should still be obvious and the sections should read as distinct blocks. Read the headings alone and check they carry the argument.

**Done when:** the four checks pass and the page survives the squint. Fix and re-open until it does.

Close by giving the user the absolute path — one file, shareable, opens offline.
