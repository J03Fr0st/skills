---
name: security-review
description: Review security and privacy risks read-only when a dedicated audit, threat model, dependency-risk assessment, or independent security gate is requested or needed. Routine changed-code review belongs to code-review; authorized remediation belongs to implement.
---

# Security Review

Identify credible abuse paths and the evidence needed to close them. A review verdict applies only to the inspected scope and threat assumptions.

## 1. Establish scope and trust boundaries

Read the request, governing rules, target revision or working files, deployment assumptions, and relevant code. Identify assets, actors, entry points, privileges, and where data or authority crosses a boundary. For a diff, trace affected callers and controls beyond changed lines.

Use existing access and safe local inspection. Preserve source and external state during the audit. Isolated fixtures with synthetic data may exercise a claim within scope; live exploitation, accessing another person's data, destructive checks, and remediation require their own authorization.

**Complete when:** the reviewed surface, important assets, trust boundaries, and unavailable evidence are explicit.

## 2. Trace concrete abuse cases

Read only the applicable sections of [references/SURFACES.md](references/SURFACES.md): identity/data for access and privacy, execution/supply chain for packages or tools, and state/availability for workflows or resource use.

For each material boundary, follow attacker-controlled input through its transformations, controls, and sensitive operation. Name the attacker's required access and intended impact. Look for existing authorization, validation, isolation, idempotency, and resource limits that invalidate the suspected path.

Use `research` for version-specific advisories or uncertain external contracts. Confirm affected versions and runtime reachability; a scanner alert or dangerous-looking API is a lead rather than a finding by itself.

**Complete when:** each material abuse case is supported, contradicted by a verified control, or recorded as an unresolved coverage gap.

## 3. Validate findings proportionately

Prefer a safe local reproduction or focused test of the decisive boundary. When code and control flow establish the path directly, cite them and state any environmental prerequisite. Keep scanner output distinct from verified findings, and redact secrets and personal data from evidence.

A finding contains:

- affected location and revision;
- attacker capability, reachable trigger, and failed control;
- concrete impact and severity rationale;
- inspected evidence or reproduction result;
- smallest remediation direction and verification that would close it.

Separate pre-existing findings from change-introduced ones. Whole-system audits may include either; diff reviews must make that provenance visible. Unconfirmed suspicion belongs in limitations or next checks, with the uncertainty named.

**Complete when:** each finding has a defensible path and impact, and neither scanner severity nor reviewer confidence substitutes for evidence.

## 4. Return the scoped verdict

Lead with actionable findings. If none are confirmed, say “No confirmed findings in the inspected scope,” then identify coverage and limitations. State whether the requested gate was fully assessed, has confirmed failures, or remains undecided because of named gaps. Avoid claims that the system is secure, compliant, or penetration-tested beyond the evidence.

Return remediation and closing checks to `implement` when changes are already authorized. After a fix, reassess the affected boundary and let `verification-before-completion` assess the final completion claim. A review-only request ends with the findings and unresolved checks.

**Complete when:** the reader can distinguish confirmed risk, verified controls, and unknowns, and each needed follow-up has a concrete next check.
