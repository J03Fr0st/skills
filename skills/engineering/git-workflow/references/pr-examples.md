# PR examples

Read when choosing wording or evidence for a particular change type. These are
invented examples, not verified results. Replace evidence placeholders with
observed outcomes and follow the project's template and title convention.

| Change | Example title | Body content that earns its space |
| --- | --- | --- |
| Bug fix | Prevent duplicate charges when payment requests retry | Trigger and previous failure; how the behavior changes; reproduction result and remaining integration gaps |
| Feature | Let workspace owners export audit history | Who gains the capability, scope/permissions, evidence for successful export and denied access |
| Refactor | Centralize token expiry checks | Why consolidation is needed, intended behavior preservation, evidence across existing callers; name any intentional behavior change |
| Migration | Preserve existing subscriptions during plan migration | Compatibility window, migration evidence, rollout sequence, irreversible steps, recovery limits |
| Dependency update | Upgrade the parser to reject malformed headers | Relevant upstream change and local compatibility evidence; disclose untested integrations |
| Stacked change | Store revocation epochs for subsequent session checks | This slice's role, named parent, what consumes it now, and known follow-on work; do not claim enforcement before it exists |

Example fix body:

> A timeout after a successful payment could cause a retry to create a second
> charge. Retries now reuse an idempotency key for the same payment attempt.
>
> Validation: [reproduction command and observed before/after result].
> [Name any integration check not run and its practical limit.]

Example mechanical refactor body:

> Token expiry checks now use one implementation so callers apply the same
> boundary condition. Behavior is intended to remain unchanged.
>
> Validation: [actual regression checks and outcome].

## Editing checks

| Weak wording | Revision rule |
| --- | --- |
| “Update files” | Name the resulting behavior or concrete structural change |
| “Add retry.ts and edit payment.ts” | Explain the payment outcome; file changes are visible in the diff |
| “Fully tested” | State which behavior was exercised, the result, and material gaps |
| “Fix retries” when scope also changes charge identity | Cover both outcomes in title/opening or find a precise shared outcome |
| “Safe rollback” for an irreversible migration | State the actual recovery procedure and its limits |

**Complete when:** examples have guided the wording without introducing invented
facts, unearned guarantees, or sections that answer no reviewer question.
