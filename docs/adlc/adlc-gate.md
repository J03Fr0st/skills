# ADLC Gate

`adlc-gate` puts a named human decision between each ADLC stage and the next.

- **Invocation:** user-invoked only, with the stage: `/adlc-gate intent`, `/adlc-gate spec`, or `/adlc-gate plan`.
- **Output:** an `## Approvals` row in the artifact and an updated `status`.

## How it works

1. **Self-check.** The agent evaluates the stage's exit criteria in a pass/fail table labelled *Agent self-check, not approval*.
2. **Decision.** The human types `approved`, `approved-with-conditions`, `rejected`, or `waived`, with their name and role. Silence, partial praise, and names taken from git config do not count.
3. **Record.** The gate appends the decision, approver, date, and reviewed content hash to the artifact and sets its status.

## The content hash

The reviewed revision is a hash of the artifact without its `status` line and `## Approvals` section:

```bash
sed -e '/^status:/d' -e '/^## Approvals/,$d' <artifact> | git hash-object --stdin
```

Recording the approval leaves that hash unchanged, while any later edit to the body changes it. A changed hash makes the approval stale, and `adlc-flow` and the downstream stages treat the artifact as a draft until it passes the gate again.

The gate is advisory. For hard enforcement, a project can add a hook that blocks delivery until the plan is approved. The human should commit approvals so git authorship attests the sign-off.
