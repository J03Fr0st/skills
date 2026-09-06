# Planning and Task Breakdown

Use `planning-and-task-breakdown` when clear requirements need technical decomposition across dependent changes or sessions. It is model-invoked and can also be requested directly.

The result is a plan with observable slices, acceptance checks, dependencies, a ready frontier, and a final integration check. The skill inspects the current system before naming owners or files and preserves unresolved decisions instead of guessing them.

## When it fits

A direct small change goes to `implement`. Product ambiguity goes to `grilling` or explicit Agile refinement. Cycle goals and capacity belong to `agile-sprint-plan`; this skill owns technical execution order.

A planning request normally includes saving a local plan. Chat-only requests stay inline. Existing plans and trackers remain canonical, and remote tracker writes use the user's existing authorization. If implementation is already requested, the plan feeds `implement` immediately.

## Example

“Plan a tenant-aware export feature into slices, including retries and permission checks. Save the plan locally; do not implement yet.”

The plan should name the dependencies, show which slices are ready, and specify evidence for the combined export behavior.

## Design basis

The [preferred-source research](../research/preferred-skill-repositories-workflow-gap-research.md) records all six repositories and revisions. Matt Pocock contributes dependency-aware tickets; Superpowers contributes execution checkpoints; Addy Osmani contributes vertical slicing and canonical plan ownership. The local wording preserves direct implementation and existing authority.
