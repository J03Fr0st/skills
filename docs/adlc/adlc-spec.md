# ADLC Spec

`adlc-spec` turns an approved intent into behavior an agent can build against and a verifier can check.

- **Invocation:** user-invoked only.
- **Output:** a draft `spec.md` with observable behavior, numbered acceptance criteria, constraints, boundaries, and owned areas of concern.

## How it works

The skill starts only from an intent that is approved and unchanged since sign-off. It records that intent's path and content hash as the spec's source.

Every intent outcome becomes observable behavior and at least one acceptance criterion (`AC-001`, `AC-002`, …). Each criterion names a scenario, action, expected result, and verification method. Security, compliance, performance, and compatibility constraints are applied while writing, not after building. Always / ask first / never boundaries tell the implementing agent where human decisions are still required.

The spec contains no file paths or code. When the behavior would contradict the intent, the skill stops and routes back to `/adlc-intent`. The draft ends at `/adlc-gate spec`.
