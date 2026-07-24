# J03Fr0st Skills

[![skills.sh](https://skills.sh/b/J03Fr0st/skills)](https://skills.sh/J03Fr0st/skills)

J03Fr0st's public library of original agent skills.

This repository currently contains the library infrastructure only. Skills will
be added under `skills/` as they are created.

## Install

```bash
npx skills@latest add J03Fr0st/skills
```

## Claude Code plugin

```text
/plugin marketplace add J03Fr0st/skills
/plugin install j03fr0st-skills@j03fr0st
```

## Repository structure

- `skills/` — original skills, added when ready
- `docs/` — human-facing skill documentation
- `scripts/` — maintainer helpers
- `.claude-plugin/` — Claude Code plugin metadata
- `.changeset/` — versioning metadata
- `.github/workflows/` — release automation

## Attribution

The repository shell is based on
[`mattpocock/skills`](https://github.com/mattpocock/skills). No upstream skills
are included.
