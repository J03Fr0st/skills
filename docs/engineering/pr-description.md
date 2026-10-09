# PR description

`pr-description` writes pull request titles and bodies from the final diff. It is
model-invoked and can also be requested directly.

Try: “Write the PR description for this branch,” “Rewrite PR 88's title and body
to match what it does now,” or “Draft the PR text before I publish.” A text-only
request returns the title and body without touching Git or the forge.

The skill reads the project's title rules and PR template, inspects the full
merge-base diff (locally or through the forge's diff API), and writes for the
reviewer. Titles describe the final outcome. Bodies explain motivation, relevant
decisions, actual verification, and material risks, with detail proportional to
reviewer uncertainty, and close with a merge-danger line: whether the change is
a one-way or two-way door, and what breaks, for whom, if it is wrong. Required
project templates and naming conventions remain authoritative. PRs credit the
human author only; agent "Generated with" footers are left out unless a
repository policy requires AI-use disclosure.

When creating or updating a PR is authorized, it passes the body through a UTF-8
file and re-reads the saved metadata. Branches, commits, and pushes belong to
[git-workflow](git-workflow.md); CI repair, review follow-up, and merging belong
to [babysit-pr](babysit-pr.md).

## References

| Need | Reference |
| --- | --- |
| Wording and evidence for a fix, feature, refactor, migration, dependency, or stacked PR | [Examples](../../skills/engineering/pr-description/references/examples.md) |
| Starting structure for short, standard, or migration PRs | [Assets](../../skills/engineering/pr-description/assets/) |

## Design and evidence

This skill was split out of `git-workflow` so PR-writing requests trigger on
their own; the [split record](../research/2026-10-09-git-workflow-split.md)
explains the boundary. The writing guidance comes from the
[git-workflow research](../research/2026-09-26-git-workflow.md): EveryInc informed
outcome-led PR writing, and Cursor pstack and Matt Pocock informed review context
and evidence. The merge-danger line follows Matt Pocock's `pr` skill, recorded in
the [2026-09 source sweep](../research/2026-09-27-source-repos-sweep.md).
