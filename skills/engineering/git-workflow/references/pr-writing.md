# PR titles and descriptions

## Establish the final scope

Read the project's title rules, PR template, and contribution requirements. For
an existing PR, use its base repository, base branch, and head revision. For a new
PR, resolve the intended target branch. Inspect the full commit range and final
merge-base diff, using the forge's diff API if local refs are unavailable; state
that limitation when it affects confidence.

For a runnable local range snapshot or a starter body file, use
[tooling](tooling.md). Its templates supplement the project's required structure.

Build a brief internal scope map: the resulting outcome, material behavior
changes, supporting evidence, and residual uncertainty. Use the final diff to
correct stale commit subjects and discard superseded implementation history.
For a known stack or series, identify this PR's contribution and known dependencies
or follow-on work. An unknown series stays unknown.

For an empty range, report that no changes are available to describe. For missing
evidence, state the gap rather than inventing behavior or validation.

## Write for the reviewer

For wording and evidence patterns by change type, read [PR examples](pr-examples.md).

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

Respect required template fields. Scale additional detail to reviewer uncertainty:
a small risky change may need more explanation than a large mechanical rename.
Use a diagram or table when it makes a relationship clearer. Simple changes can
be one or two sentences plus relevant validation.

Keep the description about the resulting change. File inventories and the
conversation's implementation chronology usually add no review context. Preserve
useful existing issue links, demonstrations, and required disclosures when
rewriting. Mark unrun checks honestly; retain material negative results.

## Deliver or apply

For a text-only request, return the title and body. For authorized creation or
metadata updates, use a structured tool argument or a UTF-8 body file with
`gh ... --body-file` so newlines and literal shell characters survive unchanged.
Set base/head explicitly when publishing; choose draft/ready from the task's
readiness and repository policy. Verify the saved metadata after the write.

**Complete when:** the title and opening cover the final scope, every material
claim is grounded, required fields are present, and the requested text or saved
PR metadata has been checked against the source diff and verification evidence.
