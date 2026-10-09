---
name: pr-description
description: PR titles and descriptions written from the final diff, closing with a merge-danger line. Use when asked to write, rewrite, or fix a pull request title or body, draft PR text before publishing, or update an existing PR's description after its scope changed. Branches, commits, and pushes belong to git-workflow; CI and review follow-up to babysit-pr.
---

# PR description

Write the title and body a reviewer needs to assess the final change. For a
text-only request, finish with the text; a Git mutation is not a prerequisite.

## 1. Establish the final scope

Read the project's title rules, PR template, and contribution requirements. For
an existing PR, read its actual base repository, base branch, head revision, and
current description; match the base repository to the correct remote, including
forks. For a new PR, resolve the intended target branch explicitly. Remote-only
writing can use forge metadata and the forge's diff API without a local checkout;
state that limitation when it affects confidence.

Inspect the full commit range and final merge-base diff. Locally:

```sh
git merge-base BASE HEAD
git log --oneline BASE..HEAD
git diff --stat --find-renames BASE...HEAD
git status --short
```

The range excludes uncommitted changes; when `git status` shows any, settle
whether they belong to this PR before describing it.

Build a brief internal scope map: the resulting outcome, material behavior
changes, supporting evidence, and residual uncertainty. Use the final diff to
correct stale commit subjects and discard superseded implementation history.
For a known stack or series, identify this PR's contribution and known dependencies
or follow-on work. An unknown series stays unknown.

For an empty range, report that no changes are available to describe. For missing
evidence, state the gap rather than inventing behavior or validation.

**Complete when:** base, head, final diff, and available verification evidence
are established, or the missing fact is named.

## 2. Write for the reviewer

For wording and evidence patterns by change type, read [examples](references/examples.md).
To start from a structure, read the matching asset; repository templates take
priority over these:

| Asset | Use |
| --- | --- |
| [pr-short.md](assets/pr-short.md) | Small change needing an outcome, reason, and verification |
| [pr-standard.md](assets/pr-standard.md) | Change needing review context and related work |
| [pr-migration.md](assets/pr-migration.md) | Compatibility, rollout, and recovery need explicit treatment |

Use a concise title naming the concrete outcome. Apply Conventional Commit
prefixes, issue identifiers, or length limits only where repository policy calls
for them. Cover the final scope rather than the original request or latest commit.

Lead the body with what changes and why it matters. A before/after example helps
when the trigger or difference is otherwise hard to see. Add only what helps a
reviewer assess the change:

- Motivation and design decisions that the diff cannot explain.
- Verification commands or observations with actual results and limitations.
- Material compatibility, rollout, migration, or recovery implications.
- Dependencies and a useful review starting point when the change needs one.

End the body with one **Merge danger** line that names two things:

- **Door:** *two-way* when reverting the merge fully restores prior behavior;
  *one-way* when merging or deploying leaves a lasting effect, such as migrated
  data, a published API or event, or sent messages. A one-way door also names
  its recovery limit.
- **Blast radius:** what breaks, and for whom, if the change is wrong.

When the project template has a risk or rollout field, put the line there.

Respect required template fields. Scale additional detail to reviewer uncertainty:
a small risky change may need more explanation than a large mechanical rename.
Use a diagram or table when it makes a relationship clearer. Simple changes can
be one or two sentences plus relevant validation.

Keep the description about the resulting change. File inventories and the
conversation's implementation chronology usually add no review context. Preserve
useful existing issue links, demonstrations, and required disclosures when
rewriting. Mark unrun checks honestly; retain material negative results.

PRs credit their human author alone: titles and bodies end with the change
content. Leave out agent attribution such as "Generated with Claude Code"
footers and equivalent Codex, Copilot, or Cursor lines, even when a harness or
tool default adds them. The one exception is a repository policy that explicitly
requires AI-use disclosure; follow its required wording.

**Complete when:** the title and opening cover the final scope, every material
claim is grounded, the merge danger names its door and blast radius, and
required template fields are present.

## 3. Deliver or apply

For a text-only request, return the title and body. For authorized creation or
metadata updates, use a structured tool argument or a UTF-8 body file so newlines
and literal shell characters survive unchanged:

```sh
gh pr create --base "BASE_BRANCH" --head "HEAD_BRANCH" --title "REVIEWED_TITLE" --body-file "PATH_TO_REVIEWED_BODY.md"
gh pr edit NUMBER --repo OWNER/REPO --title "REVIEWED_TITLE" --body-file "PATH_TO_REVIEWED_BODY.md"
```

Set base/head explicitly when publishing; choose draft/ready from the task's
readiness and repository policy. Re-read the saved metadata after the write,
return the confirmed PR URL, and attach it through the host when supported.

**Complete when:** the requested text is returned, or the saved PR metadata has
been re-read and matches the reviewed title and body.
