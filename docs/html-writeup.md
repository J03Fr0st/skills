# HTML Write-up

Deliver findings as a **write-up**: one self-contained `.html` file that opens straight from a
double-click, offline, with no build step — and survives being emailed as a single attachment.

- **Invocation:** model-invoked. Fires when you want findings, an analysis, an audit, a
  comparison, or a design doc presented as a visual document rather than terminal text; when
  you ask for an HTML report or standalone page; or when you want a Mermaid diagram rendered.
  You can also invoke it by name.

## What it does

1. **Outlines the spine** — names the one question the write-up answers, then picks a form for
   each section: prose for judgement, a table for things compared on shared axes, a diagram for
   anything graph-shaped, a stat row for the numbers that matter. Nothing is prose by default.
2. **Builds the page** from a document shell plus a component vocabulary — callouts, tables,
   code blocks, stat rows, collapsible evidence, footnotes, contents.
3. **Verifies it in a real browser** — diagrams drew their shape, console clean, no horizontal
   overflow, headings in order — plus a squint test on the rendered page, since hierarchy that
   looks flat to a blurred eye is decorative rather than real. Then hands you the absolute path.

## What makes the output good

- **Typography built for reading.** Prose sits at a ~68ch measure (the 45–75 character range
  long-form reading wants) in a grid that lets tables and diagrams break out to a wider column.
  Fluid `clamp()` sizing, `text-wrap: balance` on headings and `pretty` on body text.
- **A type ramp with real contrast.** Five sizes with ≥1.25 between steps — sizes a hair apart
  read as muddy rather than hierarchical.
- **Rhythm, not uniform spacing.** Tight within a group, generous between sections, so the
  reader feels a new idea start instead of scanning an even grey texture.
- **Headings that state their conclusion.** Read the headings alone and you get the argument.
- **Navigation sized to the page.** Under ~2 screens, nothing; past that a contents list, and past
  ~6 a sticky rail that tracks your position. Sections you read *instead of* each other — one per
  service, per option — become tabs; a narrative stays continuous, because hiding half an argument
  behind a control makes it worse.
- **One-line theming.** `color-scheme: light dark` plus `light-dark()` tokens — no duplicated
  media-query block, and native UI (scrollbars, controls) themes itself too.
- **Contrast that's checked, not assumed.** Every foreground/background pair clears WCAG AA in
  both themes.
- **Print-ready.** `@page` margins, `break-inside: avoid` on figures and tables, and link URLs
  printed inline so a paper copy keeps its references.
- **Tamper-evident CDN.** Diagrams load Mermaid through an import map pinned to an exact
  version, optionally with an SRI `integrity` hash — browsers block a mismatched file outright.

## Why it's reliable

A finished-looking page can still be broken in two ways, and neither throws: a diagram with a
syntax error becomes a red **error card**, and a blocked or failed module leaves the diagram's
**raw source** sitting in the page as plain text. The skill never claims success unseen — it
opens the page and checks for both, plus overflow and heading order.

## References

- `skills/html-writeup/references/SHELL.md` — document shell: theming, typography, layout,
  print, and the pinned-CDN pattern.
- `skills/html-writeup/references/COMPONENTS.md` — callouts, tables, stat rows, code blocks,
  badges, collapsible detail, footnotes, contents.
- `skills/html-writeup/references/DIAGRAMS.md` — Mermaid selection and syntax rules, and when
  to hand-build SVG instead.
- `skills/html-writeup/references/CRAFT.md` — the quality bar: hierarchy dimensions, rhythm,
  restraint, writing, and the squint/scan checks on the rendered page.
- `skills/html-writeup/references/NAVIGATION.md` — contents, sticky rail, and accessible tabs,
  chosen by page length and section shape.
