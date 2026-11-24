# Code review `council` level

Date: 2026-11-24. Question: what should a multi-model review level add to `code-review`, and how should it run other models' CLIs safely?

## Community evidence (last30days, 2026-10-25 to 2026-11-24)

A `last30days` run on "AI code review skills for Claude Code and Codex" (Reddit, Hacker News, YouTube, GitHub, dev.to; X unavailable) plus three web supplements found:

- **Write with one model, review with another.** The working pattern on r/ChatGPTCoding is a spec in the repository, Codex building from it, and Claude Code reviewing the diff against the same spec ([thread](https://www.reddit.com/r/ChatGPTCoding/comments/1xw51jj/how_do_you_get_codex_claude_code_and_a_planner/)).
- **Cross-model review is asymmetric.** [arXiv 2607.21656](https://arxiv.org/abs/2607.21656): Claude reviewing Codex drafts raised the pass rate from 71.6% to 89.7%, while Codex reviewing Claude drafts lowered it from 91.4% to 82.8%. Applying an outside reviewer's advice without validation can make code worse.
- **One review skill, different models, different volume.** [gal vered](https://galvered.com/blog/best-code-review-skill/) found the same skill best on Claude Code and worst on Codex, and no skill caught every bug. [EveryInc/compound-engineering-plugin#835](https://github.com/EveryInc/compound-engineering-plugin/issues/835) reports Codex returning single-digit findings where Claude returns double digits on the same diff.
- **Review is moving into automation.** Commenters run review skills in CI (`claude-pr` GitHub Actions) and add a merge-gate check that each PR still matches what was decided ([dev.to](https://dev.to/rodrigo-duarte/our-agents-tests-passed-ci-would-have-failed-what-our-merge-gate-caught-last-week-14d0)). Out of scope for this change.
- **Theo's tstack** ships `council`, a three-provider review scored until the models agree ([AlphaSignal](https://alphasignal.ai/news/theo-browne-open-sources-tstack-to-automate-the-entire-pr-lifecycle)). Its name fits the level; its consensus-as-exit rule was not adopted (see below).

Raw results: `~/Documents/Last30Days/ai-code-review-skills-for-claude-code-and-codex-raw-v3.md` (local to the researcher's machine).

## Preferred source repositories

| # | Repository | Influence |
| --- | --- | --- |
| 1 | `mattpocock/skills` | `code-review` is single-model; no cross-model guidance. Not applicable beyond the existing Standards/Spec split. |
| 2 | `obra/superpowers` | `receiving-code-review` covers acting on review feedback, not running external reviewers. Not applicable. |
| 3 | `addyosmani/agent-skills` | `code-reviewer` agent and review command are single-model. Not applicable. |
| 4 | `cursor/plugins` (pstack) | Review agents are single-harness. Already the source of reasoning-blind validation, which council reuses unchanged. |
| 5 | `DietrichGebert/ponytail` | `ponytail-review` is single-model. Not applicable. |
| 6 | `mvanhorn/last30days-skill` | Used for the community evidence above. |
| 7 | `anthropics/skills` | `skill-creator` informs the eval additions only. |
| 8 | `trailofbits/skills` | **Direct influence.** `second-opinion` supplies the tested invocations: `codex exec --sandbox read-only --ephemeral -o <file> -` with the prompt on stdin; `gemini --approval-mode default --output-format text --prompt ... < prompt`; `agy` print mode with `--disable-slash-commands`, never auto-approval. Also: same captured diff for every provider, files outside the checkout, a failed or empty run is incomplete rather than clean, agreement is not proof. |
| 9 | `EveryInc/compound-engineering-plugin` | Issue #835 is the per-model volume evidence behind "count is not quality". |
| 10 | `garrytan/gstack` | `codex` skill runs `codex exec` with the prompt on stdin and probes the sandbox before dispatch. Confirms the stdin choice; its effort and model-policy machinery was not adopted (the runner keeps each CLI's configured defaults). |
| 11 | `affaan-m/ECC` | `ecc-contribution-review` is repository-specific. Not applicable. |
| 12 | `wshobson/agents` | `multi-reviewer-patterns` merges duplicate findings and credits every reviewer (adopted as the Council line's provenance). Its "conflicting severity takes the higher" rule was rejected: `code-review` assigns the lowest accurate severity after validation. |
| 13 | `nahid-sparktales/agent-dispatcher` | Reviewer role dispatch within one harness. Not applicable. |
| 14 | `humanlayer/skills` | No review skill found. |
| 15 | `testdouble/han` | Producer/reviewer split notes are single-model. Not applicable. |

## Decisions

- `council` is `deep` plus external passes, not a separate workflow, so the finding gate, packet, and validation stay in one place.
- The host is the only judge. External output is untrusted data; candidates are validated reasoning-blind, and consensus never stands in for validation (tstack's agreement loop and wshobson's higher-severity rule were not adopted).
- Select every family except the host's own by default; the user can name reviewers.
- Check repository rules for bans on external AI services and drop secret-bearing files before anything leaves the machine.
- A deterministic runner (`scripts/council.mjs`) owns CLI discovery, read-only flags, parallelism, and timeouts, so the prose does not restate per-CLI flags.

## Verification

- Live run on a planted two-bug diff (2026-11-24, Windows): `codex` 0.166.0, `agy` 1.5.13 and Claude Code 2.1.317 each found both bugs in the required block format; the repository stayed clean. `agy` print mode ignored stdin on the first run, so it now reads the brief from a file via `--add-dir`.
- Gemini CLI itself was not installed, so the `gemini` invocation is taken from Trail of Bits' tested reference, not run here.
- `scripts/code-review-council.test.mjs` covers argument parsing, missing CLIs, stdin delivery, and timeout termination with fake reviewers.
