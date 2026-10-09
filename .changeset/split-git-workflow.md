---
"j03fr0st-skills": minor
---

Split `git-workflow` into three model-invoked skills so each request type
triggers on its own:

- `pr-description` writes PR titles and bodies from the final diff, closing with
  a merge-danger line.
- `git-worktrees` owns selecting, preparing, retiring, and recovering isolated
  checkouts.
- `git-workflow` keeps commits, branches, rebases, stacks, backports, local
  integration, policy, and recovery. Merging a PR on its forge now belongs only
  to `babysit-pr`.

`git-kit.mjs` drops the `pr-context` command and PR templates; `pr-description`
uses plain Git commands and its own assets instead.
