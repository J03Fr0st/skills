# Agile artifact model

Create the smallest durable set that preserves product intent, flow, evidence, and learning. Reuse an existing tracker or document before adding a local file.

## Canonical artifacts

| Question                                 | Preferred source                                          |
| ---------------------------------------- | --------------------------------------------------------- |
| Why does the product exist and for whom? | Existing product context, README, or roadmap              |
| What makes work Ready or Done?           | Working agreements                                        |
| What could be delivered next?            | Existing issue tracker; local backlog only as fallback    |
| What is this cycle trying to achieve?    | One cycle record                                          |
| What behavior exists and is it verified? | Code, tests, CI, demonstrations, and operational evidence |
| Why was a consequential decision made?   | Existing ADR convention                                   |

When the repository needs a local convention, use:

```text
docs/agile/
|-- working-agreements.md
|-- backlog.md                       # only without a canonical tracker
|-- cycles/
|   `-- <start-date>-<goal-slug>.md
`-- decisions/                       # only when no ADR convention exists
```

## Working agreements

Keep only stable decision rules: Definition of Ready, Definition of Done, required verification, review and acceptance authority, risk tiers, work-in-progress policy, and cadence. Put repository commands and coding standards in their existing sources rather than caching them here.

## Artifact lifecycle

- Refine a backlog item in place.
- Create one cycle record during planning.
- Append material delivery changes and evidence to that record.
- Add product decisions during review.
- Add one learning experiment during the retrospective.
- Promote a decision to an ADR only when it is consequential and durable.

Keep raw interviews, agent transcripts, scratch plans, copied CI logs, and generated status summaries ephemeral. Promote their conclusions or links, not their bulk. Use human-readable Markdown by default; add JSON or JSONL only when an actual automation consumes it.
