# Contributing

Use Node.js 24 LTS and npm 11. Install locked dependencies and run local checks:

```bash
npm ci --ignore-scripts
npm run check
```

`npm run check` tests repository tooling and validates skill metadata, publication
entries, local Markdown file links, eval structure, synchronized versions, and
workflow permissions, timeouts, and action pins.
It does not prove that a skill changes agent behavior or validate remote links.
Run meaningful paired scenario evaluations for behavioral changes and record
what was exercised and what remains unproven.

## Add or change a skill

Read [AGENTS.md](AGENTS.md) and the [preferred sources](docs/source-repos.md).
Keep the skill and its references, assets, scripts, and evals together. Use
`scripts/list-skills.sh` to inspect discovery. Add the top-level README entry,
bucket entry, human-facing docs page, and plugin manifest path for a new skill.

Use `npm run changeset` for a released behavior change. A new skill normally
receives a minor changeset; fixes normally receive a patch. Documentation and
tooling-only changes need a changeset only when they affect the distributed
package. Keep research reports under `docs/research/`; prefer cited findings and
pinned source paths over copied upstream files or raw session dumps.

After changing either plugin manifest, run `claude plugin validate . --strict`.
This command validates the marketplace at the root; `npm run validate` checks
the referenced skill entries and version relationship. Direct strict validation
of the plugin manifest also warns about the root `CLAUDE.md`, which is intentional
checkout context and is not distributed context for installed skills.

## Pull requests

Use a focused branch and a Conventional Commit PR title. Explain the resulting
behavior, evidence, and limitations. PRs require the `Repository checks` status,
resolved conversations, and an up-to-date branch. A second maintainer's approval
is not required for this individually maintained library. Squash merging keeps
one logical change per commit; feature branches are deleted after merge.

## Releases

The release workflow creates or updates the Changesets version PR. Its
`npm run version:skills` command updates the package, plugin manifest, and root
lockfile versions together, then validates the result. Review and merge the
version PR after checks pass. The workflow tags private-package releases; it
does not publish this repository to npm.

GitHub does not start ordinary PR workflows for changes made by `GITHUB_TOKEN`.
The release job explicitly dispatches CI on the bot-created version branch.
This uses the workflow-dispatch exception and needs no personal access token.
If that dispatch fails, a maintainer can run `gh workflow run ci.yml --ref
changeset-release/main`. Keep the release workflow's PR creation permission
enabled; it does not grant permission to bypass branch checks.

See [GitHub administration](docs/github-administration.md) for the managed
settings and recovery procedure.
