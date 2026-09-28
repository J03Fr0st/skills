# ADLC Gate

`adlc-gate` puts a named human decision between each ADLC stage and the next.

- **Invocation:** user-invoked only, with the stage: `/adlc-gate intent`, `/adlc-gate spec`, `/adlc-gate plan`, or `/adlc-gate slice <id>` for a decision during delivery.
- **Output:** an `## Approvals` row in the artifact and an updated `status`, or a Decisions row in `progress.md` for a slice.

## How it works

1. **Self-check.** The agent evaluates the stage's exit criteria in a pass/fail table labelled *Agent self-check, not approval*. Spec and plan gates fail when the human never responded to the draft, or when an upstream condition or area of concern that is due is only owned rather than decided.
2. **Decision.** The gate shows ready-to-send lines. The human types `approved`, `approved-with-conditions`, `rejected`, or `waived`, with their name and role. A plan approval lists each plan decision by ID, so one word never covers choices nobody saw. Silence, partial praise, and names taken from git config do not count. A single-owner project can declare a *sole approver* at the intent gate; later gates then accept the decision word alone.
3. **Record.** The gate appends the decision, approver, date, and reviewed content hash to the artifact and sets its status.

## The content hash

The reviewed revision is a hash of the artifact without its `status` line and `## Approvals` section:

```bash
sed -e '/^status:/d' -e '/^## Approvals/,$d' <artifact> | git hash-object --stdin
```

In PowerShell without Git Bash, the equivalent is:

```powershell
$f = New-TemporaryFile; [IO.File]::WriteAllText($f, ((Get-Content -Raw <artifact>) -replace '(?m)^status:.*\n' -replace '(?ms)^## Approvals.*')); git hash-object --no-filters $f; Remove-Item $f
```

The hash assumes LF line endings, so `adlc-intent` adds a `.gitattributes` rule such as `docs/adlc/** text eol=lf`. Without it, `core.autocrlf=true` changes every hash on a fresh checkout.

Recording the approval leaves that hash unchanged, while any later edit to the body changes it. A changed hash makes the approval stale, and `adlc-flow` and the downstream stages treat the artifact as a draft until it passes the gate again.

The gate is advisory. For hard enforcement, a project can add a hook that blocks delivery until the plan is approved. The Approvals row is the record of the human decision; git authorship shows only who ran the commit. The agent commits an approval only when asked, naming the approver and reviewed hash in the message.
