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
| Plan approved, no `progress.md` | `/adlc-plan` to write it |
| A carried item or required sign-off is due and undecided | `/adlc-gate slice <id>` |
| A slice is implemented | `code-review`, plus `security-review` when the spec calls for it |
| A slice is reviewed | `verification-before-completion` |
| A slice is verified | `git-workflow` |
| Slices ready or in progress | `implement`, or `orchestrate` for independent slices |

The router is read-only. It checks each artifact's `status` against its content hash, so an approval edited after sign-off counts as a draft, and an upstream change sends the work back to the earliest stale gate. During delivery it reads slice state from `progress.md` and trusts only states backed by reachable evidence. Delivery returns to the router after each slice changes state.

See the [ADLC research](../research/2026-09-26-adlc.md) for sources and design decisions.
