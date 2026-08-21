# Module Design

Decompose around knowledge, invariants, and change. Folders and deployment units should express the design after the reasoning is clear.

## Find the module

1. **Name the capability.** Use domain language or a precise system responsibility.
2. **Name the owner.** Identify the actor, team, or policy authority that decides what correct means.
3. **Name the invariant.** State what must remain true and which state participates.
4. **Name the hidden knowledge.** Find difficult, volatile, or duplicated decisions that callers should not carry.
5. **Name the clients.** Record what each client needs, what it should not know, and whether roles differ.
6. **Name the change axis.** Use observed changes, incidents, duplicated edits, or credible roadmap pressure.
7. **Choose the scale.** Function, object, package, slice, bounded context, or deployable should follow the responsibility.

**Gate:** a proposed module is not ready until its responsibility, invariant, owner, clients, and hidden knowledge fit in a short paragraph without “and also” joining unrelated capabilities.

## Judge cohesion

Responsibilities belong together when several of these align:

- they protect the same invariant;
- they implement one domain capability or policy;
- they change for the same actor or business reason;
- they share a lifecycle or authoritative state;
- separating them would force callers to reconstruct hidden sequencing or rules;
- one failure or transaction policy governs them.

Shared data, call frequency, or residence in one folder is weak evidence by itself. Co-location removes network costs but does not establish shared responsibility.

## Judge depth

Depth is relational: compare the complete client interface with the cohesive behavior and knowledge hidden behind it.

Ask:

- Can the interface expose a capability instead of a sequence of internal steps?
- Can common policy, ordering, validation, error handling, or configuration disappear from callers?
- Are defaults safe and useful for the common client?
- Does the interface reveal only domain concepts that clients already need?
- Does deleting the module spread material complexity back into several callers?
- Is the hidden complexity cohesive, or is a small surface disguising a god module?

A generic method can be shallow if clients must understand a large behavioral state space. A thin module can be valuable if it isolates protocol translation, security policy, validation, a foreign model, failure, or migration.

## Shape client interfaces

A module may expose several coherent interfaces when clients have different roles, permissions, knowledge, or compatibility timelines. Apply interface segregation to client views without fragmenting the module's conceptual model into one interface per method.

For each client interface, record:

- client role and purpose;
- operations, commands, queries, or events;
- domain types and units;
- preconditions, postconditions, invariants, and effects;
- error and time behavior;
- compatibility promise;
- facts intentionally hidden.

Many valuable modules exist to cause effects. Separate the decision from the effect where it makes policy easier to test and reason about, and keep the effect honest in the operation's name, result type, idempotency, failure modes, and tests. An operation that writes, charges, or notifies should say so in its interface.

## Choose an organizing shape

| Shape                  | Strength                                           | Cost                                                   | Prefer when                                                        |
| ---------------------- | -------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| **Domain module**      | Concentrates capability, language, and invariants  | May contain several internal technical concerns        | Business concepts and change axes dominate                         |
| **Logical layer**      | Limits attention by responsibility or abstraction  | Feature changes may cross several layers               | Layer policy is stable and dependencies remain directional         |
| **Vertical slice**     | Localizes a use case and reduces cross-layer edits | Can duplicate policy or fragment shared invariants     | Use cases evolve independently and shared concepts remain explicit |
| **Bounded context**    | Protects model meaning and ownership               | Translation and consistency across contexts cost work  | The same word or entity has legitimately different models          |
| **Deep shared module** | Hides reusable difficult knowledge                 | Becomes a bottleneck or god module if cohesion is weak | Several clients need the same policy or algorithm                  |

Combine shapes deliberately. A bounded context can contain vertical slices; a slice can use internal layers; several slices can depend on one deep policy module.

## Red flags

- The module is named `utils`, `common`, `manager`, or `service` because its responsibility is unclear.
- One interface is the union of every operation any client might need.
- Callers pass configuration or flags that select internal algorithms they should not know.
- A folder boundary exists, but imports freely bypass the public surface.
- A small interface hides unrelated responsibilities and shared mutable state.
- A new service or event bus is proposed before ownership or failure isolation requires distribution.
- A thin translator is removed even though it protects a domain, trust, protocol, or vendor boundary.

## Primary sources

- [Parnas, On the Criteria To Be Used in Decomposing Systems into Modules](https://dl.acm.org/doi/10.1145/361598.361623)
- [Stevens, Myers, and Constantine, Structured Design](https://doi.org/10.1147/sj.132.0115)
- [Ousterhout, Modular Design](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter18/lecture.php%3Ftopic%3DmodularDesign)
- [Fowler, Presentation-Domain-Data Layering](https://martinfowler.com/bliki/PresentationDomainDataLayering.html)
- [Bogard, Vertical Slice Architecture](https://www.jimmybogard.com/vertical-slice-architecture/)
