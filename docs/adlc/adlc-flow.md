# ADLC Flow

`adlc-flow` is the explicit router for the ADLC suite and the one command humans need to remember.

- **Invocation:** user-invoked only.
- **Output:** the work item's evidenced stage and exactly one next command or authorized delivery handoff.

## Routing

| Evidenced state | Route |
| --- | --- |
| No intent, or a fuzzy idea | `/adlc-intent` |
| Intent, spec, or plan is draft or stale | `/adlc-gate <stage>` |
| An artifact was rejected | The same stage's command, with the reasons |
| Intent approved, no spec | `/adlc-spec` |
| Spec approved, no plan | `/adlc-plan` |
| Plan approved, slices open | `implement`, or `orchestrate` for independent slices |
| Slices done | `code-review`, plus `security-review` when the spec calls for it |
| Reviewed | `verification-before-completion`, then `git-workflow` |

The router is read-only. It checks each artifact's `status` against its content hash, so an approval edited after sign-off counts as a draft, and an upstream change sends the work back to the earliest stale gate.

See the [ADLC research](../research/2026-09-26-adlc.md) for sources and design decisions.
