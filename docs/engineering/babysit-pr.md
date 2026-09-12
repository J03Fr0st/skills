# Babysit PR

`babysit-pr` carries an existing pull request through review feedback, CI failures and completion. It is model-invoked for requests to babysit or resume a PR, and can also be invoked explicitly.

The default endpoint is confirmed merge. That endpoint does not grant permission to merge: the skill retains the user's existing action scope and performs the final merge when authorized. Ask to stop at merge-ready when you want that earlier endpoint. It continues independent repairs while another item needs a decision and reports a precise handback when no autonomous work remains.

## Examples

- “Babysit this PR; fix CI and review findings, commit and push the repairs. I'll merge it.”
- “Babysit PR 123 and merge when ready using the repository's normal method.”
- “Get this PR merge-ready, then stop.”
- “Resume babysitting this PR from the saved run record.”

Replies, thread resolution and other externally visible actions follow the established user scope and host rules. Repeated permission prompts are unnecessary once the relevant action is authorized.

## How it works

The agent observes the PR, evaluates feedback, diagnoses failures, verifies a batch of repairs, pushes it within scope and resumes observation. A green build or queue entry remains progress until the selected endpoint is verified. Required reviews, conflicts, late bot feedback and failures on a newer commit can reopen work.

A bundled Python helper reads GitHub through authenticated `gh`, including paginated feedback and thread metadata. It detects changes and returns periodic snapshots while quiet. The helper never edits, posts, reruns CI or merges. The agent verifies required gates separately before declaring readiness.

Requirements are Python 3.10+ and GitHub CLI with access to the target PR. An Enterprise hostname is supported explicitly. Other forges require equivalent native observation tools; they have no bundled adapter. State lives in a private directory outside tracked source, with observations separate from decisions and pending writes.

Monitoring is session-bound unless a supported durable scheduler is explicitly established. The skill saves a resume record when interrupted and does not claim that a stopped watcher is still active. The first version owns one PR; it does not manage stacks or scan every authored PR. Single-writer ownership is coordinated by the agent, not enforced by a distributed lock.

## Composition and evidence

The skill composes diagnosis, implementation and verification without duplicating their full workflows. It follows the writing-for-agents hierarchy: the common loop stays in SKILL.md, watch mechanics and recovery branches live in references.

The [research report](../research/pr-babysitter-2026-09-12/report.md) records all nine preferred sources and compares the relevant OpenAI, pstack and Compound Engineering workflows. This is an original implementation; no upstream watcher is vendored.

Run helper regression tests with:

```text
python -m unittest discover -s skills/engineering/babysit-pr/scripts -p test_watch_pr.py -v
```

The skill directory also contains agent evaluation scenarios for late feedback, authority, races, retries and interruption. Those scenarios are specifications until exercised in a controlled agent harness; passing helper tests does not establish end-to-end agent performance.
