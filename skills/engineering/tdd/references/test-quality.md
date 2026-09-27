# Test quality

Load this file when a test must be designed or judged. A test is worth keeping only if it fails when the behavior it names breaks, and stays green when only the structure changes.

## Four properties of a useful test

| Property | A test fails it when… |
| --- | --- |
| Behavior-sensitive | it passes against a realistic wrong implementation: it asserts only "does not throw", checks truthiness instead of the value, or verifies mocks rather than outcomes |
| Structure-insensitive | a refactor that changes no behavior breaks it: it asserts private methods, exact mock call counts, internal snapshots, or an order that does not matter |
| Deterministic | its result depends on the real clock, timezone, locale, network, unseeded randomness, sleeps, or scheduling |
| Isolated | its result depends on test order or on a fixture another test mutates |

When two properties conflict, keep behavior-sensitivity. A brittle test that catches regressions can be repaired; an inert test gives false confidence.

## Example or property

An example test asserts one point. A property asserts a rule over an input domain and lets a generator search for a counterexample. Use a property only when the code has one of these shapes:

| Shape | Rule |
| --- | --- |
| Roundtrip or inverse | `decode(encode(x)) == x` |
| Idempotence | `f(f(x)) == f(x)` |
| Invariant | a stated condition holds before and after the operation |
| Oracle | `new(x) == reference(x)` for a rewrite or optimization |
| Cheap checker | `is_sorted(sort(x))` |
| Algebraic law | commutativity, associativity, or identity |

From weakest to strongest: no crash, type preservation, invariant, idempotence, roundtrip or oracle. Assert the strongest rule the code supports. If only "no crash" is available, first check whether a small refactor would expose a stronger rule; otherwise use examples.

A property test asserts nothing in two ways:

- **Tautology:** the expected value recomputes the implementation, so a bug they share cannot fail the test.
- **Vacuity:** input filters reject almost every generated case, so the test passes having exercised almost nothing. Constrain the generator rather than filtering its output.

When a generator shrinks to a counterexample, check the input against the contract before trusting the failure. In descending authority, the contract comes from an external specification, then types, then documentation, then existing tests, then the function name. Input outside a documented precondition means the generator is too broad. An edge case that no source settles is a question for the user, not a bug.

## Test doubles

Use the real collaborator inside the ownership boundary. Substitute only what is slow, unsafe, nondeterministic, or controlled by someone else. Prefer the smallest honest double: a fake with real behavior over a stub, and a stub over a mock that asserts calls. Assert call protocol only when the protocol is itself the contract, for example a payment request sent exactly once.

## Arrange, act, assert

- Name the behavior in the caller's terms, such as `refund_over_original_amount_is_rejected`, not `test_bug_4417` or `calls_validate_amount`. Put an issue link in a comment.
- Build inputs through a helper that defaults irrelevant fields. Set the one or two values the test depends on in the test body, so a reader sees them without opening a fixture.
- Test one behavior per test. Several inputs for the same behavior belong in one parameterized case.
- Make the assertion specific to the defect: the value, message, count, or order that was wrong.

## Choosing the next slice

Pick by risk. Coverage percentages are not a slice-selection rule. Useful candidates:

- error branches, rejected input, and the denied case of every permission check;
- zero, one, and many; empty and absent; minimum and maximum; off-by-one boundaries;
- Unicode, special characters, and injection-shaped strings where user input reaches a parser or query;
- a sentinel value such as `null`, an empty collection, or a fallback enum that now carries a new meaning, proving consumers act on the new state truthfully;
- a guard or early return added around setup, caching, loading, or cleanup;
- concurrent or repeated calls when the behavior promises idempotence or exactly-once effects.

## Mirror tests

A test that compares generated output, a copied list, or a shim against a hard-coded fixture proves nothing about the generator. Ask: if the source of truth changed and the fixture did not, would this test fail? If not, assert against the source or regenerate the fixture in the test.
