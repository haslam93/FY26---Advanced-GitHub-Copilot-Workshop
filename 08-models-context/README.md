# Module 08 - Models and Context

> **Time:** 25 minutes
> **Goal:** Select models by task characteristics and manage context deliberately without relying on a model list that quickly becomes stale.

Model availability, pricing, multipliers, and previews change frequently. Treat the live model picker and the [supported models documentation](https://docs.github.com/en/copilot/reference/ai-models/supported-models) as the source of truth.

## Choose by task

| Task | Start with | Escalate when |
|---|---|---|
| Completion and small edits | Fast general-purpose model | Suggestions repeatedly miss local conventions |
| Multi-file implementation | Balanced coding/reasoning model | The task requires deep architecture analysis |
| Large repository analysis | Model with strong long-context performance | Retrieval misses important files |
| Review or security reasoning | Deliberative model | Findings need a second independent pass |

## Context principles

1. Put stable rules in instruction files.
2. Attach the smallest relevant files and selections.
3. Ask the agent to search before assuming.
4. Split independent work across subagents when context isolation helps.
5. Compact or start a new session when earlier discussion is no longer useful.

See:

- [Model selection guide](docs/model-selection-guide.md)
- [Context management](docs/context-management.md)
- [Live model reference](docs/models-reference.md)
