# Runnable helpers and templates

Read this when collecting local Git context or starting a PR/commit draft. The
bundled [git-kit.mjs](../scripts/git-kit.mjs) uses Node.js 20+ and Git on PATH,
requires no npm install, and works from any directory. `SKILL_DIR` below is the
absolute path of the directory containing this skill's `SKILL.md`. Run `--help`
for the CLI contract.

## Inspect without changing Git state

```sh
node "SKILL_DIR/scripts/git-kit.mjs" status --repo "PATH_TO_REPO"
node "SKILL_DIR/scripts/git-kit.mjs" pr-context --repo "PATH_TO_REPO" --base "upstream/release/2" --head "HEAD"
```

`status` emits JSON with the checkout root, HEAD, branch (`null` when detached),
parsed `changes`, and `worktrees` inventory. `pr-context` requires an explicit
base and emits the merge base, commit range, and `changedFiles` with rename and
line-count metadata. It includes no file patches and excludes uncommitted
changes; check `workingTreeDirty` before treating the range as the whole task.
Paths keep Unicode and whitespace; non-UTF-8 filename bytes are unsupported.

These are local snapshots. Fetch deliberately through the normal workflow when
fresh remote state is needed. Neither command verifies forge rules, checks,
active task ownership, or whether a worktree can be retired. For an unborn branch,
invalid ref, or unavailable repository, use the reported error to resolve the
missing state. They perform no commits, pushes, merges, or cleanup.

## Start a draft

```sh
node "SKILL_DIR/scripts/git-kit.mjs" template pr-short.md
node "SKILL_DIR/scripts/git-kit.mjs" template pr-standard.md --output "PATH_TO_NEW_PR_BODY.md"
node "SKILL_DIR/scripts/git-kit.mjs" template commit.txt --output "PATH_TO_NEW_COMMIT_MESSAGE.txt"
```

Output goes to stdout unless `--output` names a new file. The parent directory
must exist. Existing files, including symlinks, are refused rather than replaced;
choose another path or deliberately edit the existing file. Relative destinations
are relative to the invoking shell's directory, not `--repo` or the skill directory.

| Asset | Use |
| --- | --- |
| [pr-short.md](../assets/pr-short.md) | Small change needing an outcome, reason, and verification |
| [pr-standard.md](../assets/pr-standard.md) | Change needing review context and related work |
| [pr-migration.md](../assets/pr-migration.md) | Compatibility, rollout, and recovery need explicit treatment |
| [commit.txt](../assets/commit.txt) | Plain imperative subject with optional motivation |
| [commit-conventional.txt](../assets/commit-conventional.txt) | Repository requires a Conventional Commit subject/footer |

Repository templates take priority. These assets are starting points: remove
placeholders and optional sections that add no information, and keep verification
claims tied to observed results. The helper does not generate or validate prose.
Use [PR writing](pr-writing.md) to finish a draft.

## Use the finished text

For an authorized PR publication, pass the reviewed UTF-8 body file to the forge
CLI. For example, after replacing every placeholder:

```sh
gh pr create --base "BASE_BRANCH" --head "HEAD_BRANCH" --title "REVIEWED_TITLE" --body-file "PATH_TO_REVIEWED_BODY.md"
```

Choose draft/ready and repository identity according to the task; verify the saved
PR afterwards. This command publishes, unlike the local helpers.

For a commit message, create the template file, replace its subject placeholder
and add any body, then commit the filled file. `--cleanup=strip` removes the
`#` guidance lines; the `-c` pins the comment character for this invocation only:

```sh
git -c core.commentChar="#" commit --file "PATH_TO_FILLED_COMMIT_MESSAGE.txt" --cleanup=strip
```

This commits whatever is staged, so inspect the index first; use the
[selected-path recipe](recipes.md) when unrelated staging exists. For an
explicitly requested persistent setup, configure `commit.template` locally to a
stable absolute file path after preserving any existing setting. The helper
itself changes no Git configuration.

**Complete when:** context is tied to verified refs or the draft has been created
at the requested destination, and any subsequent publication is separately
verified under the main skill's endpoint.
