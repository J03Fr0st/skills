# The document shell

One `.html` file. Everything inline, so it opens offline from a double-click and travels as a single attachment. No build step, no local server, no webfonts.

## Scaffold

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ what this write-up answers }}</title>
    <style>
      :root {
        color-scheme: light dark;

        --bg:      light-dark(#fafaf9, #0c0a09);
        --surface: light-dark(#ffffff, #1c1917);
        --ink:     light-dark(#1c1917, #f5f5f4);
        --muted:   light-dark(#57534e, #a8a29e);
        --border:  light-dark(#e7e5e4, #292524);
        --accent:  light-dark(#0f766e, #2dd4bf);
        --mark:    light-dark(#fef3c7, #422006);

        /* Type ramp — five sizes, ≥1.25 between steps. Sizes closer than that
           read as muddy rather than hierarchical. */
        --text-xs:   0.75rem;    /* eyebrows, captions, table headers */
        --text-sm:   0.875rem;   /* secondary, footnotes */
        --text-base: clamp(1rem, 0.96rem + 0.2vw, 1.0625rem);
        --text-lg:   1.35rem;    /* h3, lede */
        --text-xl:   1.75rem;    /* h2 */
        --text-2xl:  clamp(2.1rem, 1.6rem + 2vw, 2.8rem); /* h1 */

        /* Spacing — 4pt base. Named by role, so rhythm is a choice, not arithmetic. */
        --space-2xs: 0.25rem;
        --space-xs:  0.5rem;
        --space-sm:  0.75rem;
        --space-md:  1rem;
        --space-lg:  1.5rem;
        --space-xl:  2.5rem;
        --space-2xl: clamp(3rem, 6vw, 4.5rem);  /* between sections */

        --measure: 68ch;
        --wide: 900px;
        --radius: 10px;
      }
      * { box-sizing: border-box; }
      html { -webkit-text-size-adjust: 100%; }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--ink);
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif;
        font-size: var(--text-base);
        line-height: 1.65;
        -webkit-font-smoothing: antialiased;
      }

      /* Prose holds a readable measure; .wide breaks out for tables and diagrams. */
      main {
        display: grid;
        grid-template-columns: 1fr min(var(--measure), calc(100% - 3rem)) 1fr;
        padding: clamp(2rem, 5vw, 4rem) 0 6rem;
        row-gap: var(--space-md);   /* tight *within* a section… */
      }
      main > * { grid-column: 2; }
      main > .wide {
        grid-column: 1 / -1;
        width: min(100% - 3rem, var(--wide));
        margin-inline: auto;
      }

      h1, h2, h3 { line-height: 1.15; text-wrap: balance; margin: 0; }
      h1 { font-size: var(--text-2xl); letter-spacing: -0.02em; }
      h2 {
        font-size: var(--text-xl); letter-spacing: -0.015em;
        margin-top: var(--space-2xl);  /* …generous *between* them. */
      }
      h3 { font-size: var(--text-lg); margin-top: var(--space-lg); }
      p, li { text-wrap: pretty; }
      p { margin: 0; }
      a { color: var(--accent); text-underline-offset: 2px; }
      strong { font-weight: 650; }
      mark { background: var(--mark); color: inherit; padding: 0 0.15em; }

      .lede { font-size: var(--text-lg); color: var(--muted); text-wrap: pretty; line-height: 1.45; }
      .meta {
        font-size: var(--text-xs); color: var(--muted);
        text-transform: uppercase; letter-spacing: 0.08em;
      }
      /* header is one tight group: eyebrow, title, lede belong together */
      header { display: grid; gap: var(--space-xs); }

      :where(a, summary, [tabindex]):focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 3px;
        border-radius: 3px;
      }
      /* anchor links from the contents list don't hide headings under the top edge */
      [id] { scroll-margin-top: 2rem; }

      @media (prefers-reduced-motion: no-preference) {
        html { scroll-behavior: smooth; }
      }

      @media print {
        :root { color-scheme: light; }
        body { font-size: 10.5pt; }
        main { display: block; padding: 0; max-width: none; }
        main > .wide { width: auto; }
        h2 { break-after: avoid; }
        figure, table, .callout, .stats { break-inside: avoid; }
        a::after { content: " (" attr(href) ")"; font-size: 0.85em; color: #555; }
        a[href^="#"]::after { content: ""; }
        @page { margin: 18mm; }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p class="meta">{{ context — repo, date, scope }}</p>
        <h1>{{ the question this answers }}</h1>
        <p class="lede">{{ the answer, in one or two sentences }}</p>
      </header>

      <h2 id="section-one">{{ section }}</h2>
      <p>{{ prose at a readable measure }}</p>

      <figure class="wide">
        <figcaption>{{ what the diagram shows }}</figcaption>
        <pre class="mermaid">
flowchart LR
  accTitle: {{ short title }}
  accDescr: {{ the relationships, spelled out — see DIAGRAMS.md }}
  a["Start"] --> b["Next"] --> c["Done"]
        </pre>
      </figure>
    </main>

    <script type="importmap">
      {
        "imports": {
          "mermaid": "https://cdn.jsdelivr.net/npm/mermaid@11.16.0/dist/mermaid.esm.min.mjs"
        }
      }
    </script>
    <script type="module">
      import mermaid from "mermaid";
      mermaid.initialize({
        startOnLoad: true,
        theme: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "neutral",
        securityLevel: "loose",
        fontFamily: "inherit",
        flowchart: { useMaxWidth: true },
      });
      matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () =>
        location.reload(),
      );
    </script>
  </body>
</html>
```

Drop the import map and module script entirely when the write-up has no diagrams — then the file has **zero** external requests.

## Why each piece is there

- **`color-scheme: light dark` + `light-dark()`** — one declaration per token instead of a duplicated `prefers-color-scheme` block, and it also themes native UI (scrollbars, form controls). Supported in every engine since 2024 (Chrome 123, Firefox 120, Safari 17); for older browsers keep a plain `--bg: #fafaf9` fallback line above each token.
- **The three-column grid** — prose sits in a `68ch` centre column, near the 45–75 character measure that long-form reading wants. Anything tagged `.wide` escapes to `--wide`, so a table or diagram is never squeezed into the prose column. Keep `--wide` a clear step up from the measure rather than near-full-bleed: once a wide block reaches the window edges, its captions hang far to the left of the headings above them and the page reads as broken alignment instead of deliberate emphasis.
- **`clamp()` type** — scales between phone and desktop without breakpoint jumps.
- **`text-wrap: balance` on headings, `pretty` on body** — evens out heading line lengths and stops single-word orphans, the tell that separates a typeset document from a dumped one.
- **`theme` chosen in JS** — Mermaid can't read CSS variables, so its theme is picked to match the page and re-rendered on system change.
- **`securityLevel: "loose"`** — needed for `<br/>` in labels. Safe because *you* author the diagram source; never paste untrusted diagram text into a loose page.
- **`fontFamily: "inherit"`** — diagrams use the page's system font rather than fetching a webfont.
- **Print rules** — `@page` margins, `break-inside: avoid` on the things that look broken when split, and link URLs printed inline so a paper copy keeps its references.

## Pinning and integrity

A floating `@11` can change under you. Pin the exact version, and — when the write-up will be shared or kept — add an `integrity` entry so a tampered or swapped CDN file is refused rather than executed:

```html
<script type="importmap">
  {
    "imports": {
      "mermaid": "https://cdn.jsdelivr.net/npm/mermaid@11.16.0/dist/mermaid.esm.min.mjs"
    },
    "integrity": {
      "https://cdn.jsdelivr.net/npm/mermaid@11.16.0/dist/mermaid.esm.min.mjs": "sha384-…"
    }
  }
</script>
```

Compute the hash for the exact URL you pinned:

```bash
curl -sL <url> | openssl dgst -sha384 -binary | openssl base64 -A
```

The browser enforces this: on a mismatch it blocks the module outright, and **every diagram degrades to its raw source** as plain text with a single console error. So the hash and the version must move together — a stale hash is worse than no hash. Ship integrity only with a hash you just computed for that exact URL, and confirm the diagrams still render afterwards.

## Layout and typography

- **Let the diagrams and tables carry the weight.** Prose is framing, not narration. If a diagram needs a paragraph to be understood, redraw the diagram.
- **System fonts only.** A `<link>` to a font service breaks self-containment and adds a request that fails offline.
- **Every size comes off a token.** Ad-hoc values (`padding: 13px`, `font-size: 1.05rem`) are what make a page feel assembled rather than designed. If a value isn't in the ramp or the space scale, it needs a reason.
- **Restraint over decoration.** One accent, one surface, one border, one radius. The calm comes from whitespace and hierarchy, not gradients and shadows — the scaffold has no rules under headings and no shadows anywhere, because space and weight already separate the sections.

Hierarchy, rhythm, and the writing are in [CRAFT.md](CRAFT.md); this file only gets the structure right.

## Considered choices, not defaults

A generated page announces itself through a handful of tells. Each has a deliberate counterpart, which is what the scaffold uses:

| Tell | Instead |
| --- | --- |
| Indigo/purple accent on everything | An accent chosen for the surface — swap for the project's real palette when it has one |
| Gradient fills and layered shadows | Flat surfaces separated by a single hairline border |
| Everything at `border-radius: 1rem` | One radius token, applied consistently |
| Uniform card grid regardless of content | Sections shaped to their content; wide things go wide |
| Padding equally generous everywhere | Tight within a group, generous between groups |
| Sizes a step apart (1rem/1.05rem/1.1rem) | A ramp with ≥1.25 between steps |
| Lorem ipsum | Real sentences, which is what exposes wrapping and overflow |

**This scaffold is a starting point, not the look.** Generated design currently clusters around three recognisable palettes: warm cream with a high-contrast serif and a terracotta accent; near-black with a single acid-green or vermilion accent; and broadsheet — hairline rules, zero radius, dense columns. The defaults here (warm stone, hairline borders) sit near that third cluster, which is fine for a plain findings doc and worth moving away from when the write-up has a subject with its own world. Where the request pins a direction, follow it exactly; where it leaves the palette free, spend that freedom on something truer to the subject than the default.

**Contrast is checked, not assumed.** Every pair in the scaffold clears WCAG AA (4.5:1) in both themes — muted text sits at 7.3:1 on light and 7.8:1 on dark. Re-check after changing a color; `--muted` on `--surface` is the pair that usually slips.

Where color carries meaning, back it with a label, icon, or shape — color alone excludes readers who can't distinguish it.
