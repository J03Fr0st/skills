---
name: tdd
description: Drive behavior changes through observable red, green, and refactor evidence. Use when the user asks for test-first development, TDD, red-green-refactor, a regression test before a fix, or when an implementation workflow needs a behavioral slice protected by an executable test. Route diagnosis of an unknown cause to diagnosing-bugs, broad completion proof to verification-before-completion, review-only work to code-review, and non-behavioral edits to proportionate artifact checks.
---

# Test-Driven Development

Use tests as a design and evidence loop, not as decoration added after implementation. Every meaningful phase needs fresh command output from the actual test target.

## Entry contract

Start from one observable behavior: an example, invariant, acceptance criterion, or reproduced defect. Locate the closest stable seam where a test can express that behavior without copying implementation details.

Test public effects at the narrowest useful level. Prefer real collaborators inside the ownership boundary and substitute only slow, nondeterministic, unsafe, or externally controlled dependencies. A test that only proves how mocks were called is weak evidence unless the call protocol is itself the contract.

Before accepting a test, name a realistic wrong implementation it would reject, derive expected values independently from the production algorithm, and confirm that assertions observe stable behavior rather than private structure.

## 1. Define the slice

Write down:

- the behavior that changes;
- the smallest example that distinguishes old from new behavior;
- the test target and exact command;
- the expected red failure;
- the broader verification that will still be needed later.

For a bug, use the diagnosis evidence and reproduce the defect at the responsible seam. Do not use a speculative fix as the test specification.

**Complete when:** the proposed test can fail for the missing or broken behavior and does not depend on the implementation shape you intend to write.

## 2. Red: prove the test can detect the gap

Add one focused test, then run its exact target before production code changes.

Red is valid only when:

- the test is discovered and executed;
- it fails, rather than skips or aborts in setup;
- the failure is the expected behavioral mismatch;
- it would become green if the requested behavior were correctly present.

A syntax error, missing fixture, unavailable service, unrelated failure, or test that was already green is not red evidence. Repair the test or harness until the signal is valid. If the requested behavior already exists, report that discovery and reassess the work instead of manufacturing a failure.

Record the command and the decisive failure.

**Complete when:** a fresh run demonstrates that the test detects the exact missing or broken behavior.

## 3. Green: make only that behavior pass

Change the minimum production code needed for the red test. Avoid unrelated cleanup, speculative generality, or a second behavior in the same slice.

Run the same test target again. Green is valid only when the test executes and passes for the intended reason. Then run the nearest relevant existing tests to detect local regressions.

If another failure appears, distinguish a task-caused regression from an unrelated or flaky failure. Do not weaken assertions, delete coverage, or broaden mocks merely to obtain green.

Record the command and result.

**Complete when:** the focused test and nearest relevant tests pass with the minimum behavior in place.

## 4. Refactor while green

Improve names, duplication, structure, or test clarity only where the completed slice provides evidence for the change. Keep behavior fixed.

Run the focused and nearby tests after the final refactor. If they fail, the refactor phase is not complete. A green result captured before the last edit is stale.

**Complete when:** the slice is clear, behavior is unchanged from green, and fresh tests pass after the final edit.

## 5. Repeat or hand off

Repeat red-green-refactor for the next independently observable behavior. Do not batch several red tests and then implement all of them unless the tests express one indivisible contract.

After the final slice, hand the broader acceptance claim to `verification-before-completion`. TDD evidence proves the exercised behaviors; it does not by itself prove packaging, documentation, configuration, migration safety, visual output, deployment, or product acceptance.

## Bounded exceptions

An exception changes the evidence strategy; it never permits an unsupported success claim.

| Situation | Response |
| --- | --- |
| Documentation, metadata, or content-only edit | Use parser, renderer, link, literal, or structural checks instead of inventing a unit test |
| Generated or vendored output | Change the owned source or generator, regenerate, and verify the resulting diff; do not test-drive edits to generated output |
| Disposable exploratory spike | Mark it non-production and discard it or restart test-first before integration |
| Legacy code with no harness | First seek a characterization test at the nearest stable seam; never delete or overwrite pre-existing or user-authored code to manufacture red |
| Slow suite | Run a focused test in each phase and the broader relevant suite at the final verification gate |
| Flaky test | Demonstrate the flake separately; do not treat a rerun-to-green as evidence for the behavior change |
| Irreproducible or environment-blocked defect | Return to `diagnosing-bugs`; do not write a guessed regression test |

If strict test-first sequencing was not followed, say so plainly. Tests added after production code can be useful coverage, but they are not red-green-refactor evidence.

Non-behavioral artifact exceptions are outside application TDD and do not require a harness decision. Their deterministic parser, renderer, link, literal, structural, or generation check is the correct evidence loop, but it must not be labeled red-green-refactor.

For behavior-bearing work, when the user explicitly requested TDD and no practical red path exists, stop before production edits and offer the concrete choice: invest in the smallest harness that could produce red, or authorize an honestly non-TDD implementation with alternative evidence. When TDD was selected implicitly by `implement`, return control with the reason red is impractical and the closest safe executable check.

## Resist shortcut rationalizations

| Shortcut | Required response |
| --- | --- |
| "Tests later are equivalent" | A later test does not prove it could detect the pre-change gap; obtain red first or disclose the exception |
| "This is too small to test" | Use the smallest behavioral assertion that could fail, or classify the work under a bounded exception |
| "The suite already passes" | Show the exact existing test fail for the new requirement, or add a focused test that does |
| "I checked it manually" | Keep manual evidence as a supplement when a repeatable automated seam is practical |
| "Time is short" | Reduce the slice and test target, not the honesty of the evidence |

## Handoff

Report the behavior slices and, for each, the red command and expected failure, green command and result, final refactor command and result, test-quality caveats, exceptions taken, and broader checks still owed. Never label work TDD-complete when red was skipped or invalid.
