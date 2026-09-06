---
name: verification-before-completion
description: Verify completion claims with fresh, claim-specific evidence and honest terminal states. Use before saying work is done, fixed, passing, ready, deployed, or compliant; when asked to verify, prove, double-check, or show that something works; or when another implementation, TDD, debugging, review, documentation, configuration, visual, or external-state workflow needs a final evidence gate. Do not replace implementation, product acceptance, deployment authorization, or code review.
---

# Verification Before Completion

Turn a completion claim into falsifiable checks, run them after the final relevant change, and report exactly what the evidence supports.

## Operating boundary

Verification is read-only with respect to source and external state unless remediation or a required state change was separately authorized. It inspects or tests an outcome; it does not silently implement missing work, accept a product outcome, deploy, approve, merge, commit, or expand authority. If a check would be destructive, costly, rate-limited, externally visible, privacy-sensitive, or dependent on credentials outside the granted scope, stop and ask before running it.

Reported evidence can guide verification, but it remains reported until independently reproduced in the current run. A passing command from before the last relevant edit is stale.

## 1. Make the claim falsifiable

Replace vague completion language with the exact claims that must be true. Derive them from the user's request, acceptance criteria, applicable repository rules, and the actual changed artifacts.

Build a small claim matrix:

| Claim | Direct evidence | Required scope | Risk if missed |
| --- | --- | --- | --- |
| Observable outcome | Command, inspection, render, query, or measurement that could disprove it | Target, environment, revision, and inputs | Concrete consequence |

Include negative requirements and preservation claims such as "retries do not duplicate," "unrelated files are unchanged," or "the document still renders."

**Complete when:** each success claim has evidence capable of falsifying it.

## 2. Select scope-appropriate evidence

Prefer direct evidence over proxies:

| Artifact or claim | Strong evidence |
| --- | --- |
| Code behavior or bug fix | Focused regression or acceptance test, then the nearest relevant broader checks |
| Build, package, or generated output | Fresh build or generation command plus inspection of the produced artifact |
| Documentation | Parser, renderer, link or literal check, and visual inspection when layout matters |
| Configuration or migration | Parser or validator, dry run when faithful, and inspection of effective state or migration behavior |
| External or deployed state | Read-back from the actual target system after an authorized write |
| Visual interface | Render in the relevant viewport or application and inspect the changed states, including error and responsive states when in scope |
| Performance | Representative measurement against a comparable baseline with method and variance recorded |

An exit code is not sufficient when a command can skip the decisive test, omit untracked fixtures, validate only syntax, or produce an artifact that still needs inspection. Confirm what actually ran.

Choose the smallest evidence set that covers every material claim. Do not run broad suites by ritual when focused evidence is decisive, and do not use a focused unit test to support a broader integration or deployment claim.

When a user-facing claim lacks a repeatable harness, read [references/PROJECT-VERIFICATION.md](references/PROJECT-VERIFICATION.md) to identify the launch, interaction, observation, and teardown needed to verify it.

**Complete when:** every claim is paired with proportionate direct evidence and any authority gate is visible.

## 3. Gather fresh evidence

Run checks after the last relevant edit against the actual final files, revision, environment, and inputs. Capture:

- exact command, query, or inspection;
- time or relation to the final change;
- scope and environment;
- exit status and decisive output;
- skips, warnings, missing fixtures, retries, or coverage gaps.

If another agent or CI reported green, label that evidence **reported-green** until reproduced. When independent reproduction is impractical, preserve its provenance and narrow the claim.

Do not rerun a failing check unchanged merely to obtain a lucky pass. Investigate inconsistent results or classify them as inconclusive.

**Complete when:** the evidence is fresh, attributable, and its coverage is understood.

## 4. Challenge the evidence

Before assigning a verdict, ask:

- Did the decisive test, file, fixture, environment, and branch actually participate?
- Was the check run after all relevant edits?
- Does the evidence prove the requested outcome or only a proxy such as compilation?
- Are skips, flakes, warnings, cached output, or unavailable dependencies masking the result?
- Does a negative claim need an adversarial or boundary case?
- Has a reported result been distinguished from an independently observed one?

Inspect the final diff or artifact when the claim includes scope, generated output, formatting, or preservation of existing work.

## 5. Assign an honest verdict

Use one terminal state:

- **VERIFIED:** fresh direct evidence supports every material claim in the stated scope.
- **NOT VERIFIED:** fresh evidence contradicts at least one material claim.
- **PARTIALLY VERIFIED:** some separable claims are verified and other claims remain unchecked, but no named constraint prevents the next check.
- **INCONCLUSIVE:** evidence ran but is ambiguous, inconsistent, flaky, stale, or too indirect to decide.
- **BLOCKED:** a named access, authority, environment, dependency, cost, or safety constraint prevents any material required claim from being decided, even if other claims were verified.

Never collapse partial, inconclusive, reported-green, or blocked evidence into "done." Product acceptance remains a stakeholder decision, and deployment state is verified only against the target environment after authorized deployment.

Apply verdict precedence consistently: fresh contradictory evidence yields NOT VERIFIED; otherwise a prevented material check yields BLOCKED; otherwise ambiguous executed evidence yields INCONCLUSIVE; otherwise incomplete separable coverage yields PARTIALLY VERIFIED; only complete support yields VERIFIED.

## Evidence receipt

Report:

1. **Verdict and scope** - the exact claim and terminal state.
2. **Fresh evidence** - commands or inspections with decisive outcomes.
3. **Provenance** - independently verified versus reported-green evidence.
4. **Gaps** - skips, untested boundaries, unavailable environments, or stale results.
5. **Next action** - the smallest action needed when the verdict is not VERIFIED.

Use positive completion language only when the verdict and scope support those exact words.
