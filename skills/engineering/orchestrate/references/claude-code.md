# Claude Code native routing

Read this reference only when Claude Code is the active harness. Keep the controller in the main conversation; the controller skill is not a worker context.

Use Claude Code's native subagent mechanism and Claude models available to the current account. Do not call Codex, a CLI bridge, a provider proxy, or another harness. A successful native tool result is dispatch evidence; prose saying that an agent ran is not.

## Role and model resolution

Custom agents may be defined in `.claude/agents/` or `~/.claude/agents/`. Treat their frontmatter, the invocation parameters, the active environment, and the tool schema as runtime configuration. If the native call accepts a per-invocation model and the role is not locked, request it there; otherwise use the role's configured model. The effective model may be changed by an invocation override, the agent definition, `CLAUDE_CODE_SUBAGENT_MODEL`, or the main model according to the installed host. With `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1`, the effective subagent model is `CLAUDE_CODE_SUBAGENT_MODEL`, falling back to the main model when that variable is unset; this overrides a differing invocation or frontmatter request. A requested Haiku route therefore cannot be reported as successful under a forced Opus setting; if an exact model requirement conflicts with the force setting, leave the slice blocked rather than dispatching and hoping the observed model differs. A role lock or rejected override wins; do not retry it with invented fields.

Select a configured role by acceptance need. When the active account and configuration expose these aliases, use Haiku for narrow, highly verifiable lookup or mechanical checks, Sonnet for bounded implementation, and Opus for ambiguity, high-impact changes, or independent review. These are conditional routing choices, not universal defaults: preserve a user's explicit model choice, use the configured equivalent when an alias is absent, and report an unavailable exact request.

## Bundled roles

The full Claude plugin registers five native definitions from `assets/claude-agents/`: `orchestrate-explorer`, `orchestrate-researcher`, `orchestrate-worker`, `orchestrate-tester`, and `orchestrate-reviewer`. Use their actual exposed, potentially plugin-namespaced identifiers. Preserve explicit project role preferences.

Installing or linking only the skill does not register these definitions. When setup is requested, follow [setup.md](setup.md). A reviewer has Skill and repository read tools: include the current diff in its assignment or provide a readable diff artifact. Tool access and model availability must be checked in the active session.

When a requested Claude model or role cannot be dispatched, report the exact unsupported capability. If the user authorizes a qualitative fallback, use a supported configured Claude role and label it as the fallback; otherwise keep the dependent slice blocked. Never route the slice to Codex or claim that an unobserved model was used.
