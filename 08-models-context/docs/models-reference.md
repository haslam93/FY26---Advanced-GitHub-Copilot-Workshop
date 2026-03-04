---
last-updated: 2026-02-23
source: https://docs.github.com/en/copilot/reference/ai-models/supported-models
---

# Models Reference

> **⚠️ Last verified: 2026-02-23.** GitHub Copilot's model roster evolves frequently.
> Always cross-check against [GitHub Docs — Supported Models](https://docs.github.com/en/copilot/reference/ai-models/supported-models) before making plan/billing decisions.

---

## Full Model Table

| Model | Provider | Context Window | Premium Multiplier | Free Plan | Best For |
|---|---|---|:---:|:---:|---|
| **GPT-4o** | OpenAI | 128k | **0×** | ✅ | Code completion, everyday tasks |
| **GPT-4.1** | OpenAI | 1M | **0×** | ✅ | Large-context code tasks |
| **GPT-5 mini** | OpenAI | 128k | **0×** | ✅ | Fast chat, lightweight tasks |
| **Raptor mini** | GitHub | 32k | **0×** | ✅ | Quick completions, low-latency |
| **Grok Code Fast 1** | xAI | 128k | **0.25×** | ❌ | Code-focused fast responses |
| **Claude Haiku 4.5** | Anthropic | 200k | **0.33×** | ✅ | Fast chat, summarisation |
| **Gemini 3 Flash** | Google | 1M | **0.33×** | ❌ | Fast large-context tasks |
| **GPT-5.1-Codex-Mini** | OpenAI | 128k | **0.33×** | ❌ | Lightweight code generation |
| **Claude Sonnet 4** | Anthropic | 200k | **1×** | ❌ | Balanced coding + reasoning |
| **Claude Sonnet 4.5** | Anthropic | 200k | **1×** | ❌ | Balanced coding + reasoning |
| **Claude Sonnet 4.6** | Anthropic | 200k | **1×** | ❌ | Balanced coding + reasoning |
| **Gemini 2.5 Pro** | Google | 1M | **1×** | ❌ | Large-context analysis |
| **Gemini 3 Pro** | Google | 1M | **1×** | ❌ | Large-context code + reasoning |
| **Gemini 3.1 Pro** | Google | 1M | **1×** | ❌ | Large-context code + reasoning |
| **GPT-5.1** | OpenAI | 128k | **1×** | ❌ | Strong general code generation |
| **GPT-5.1-Codex** | OpenAI | 128k | **1×** | ❌ | Code-specialised generation |
| **GPT-5.1-Codex-Max** | OpenAI | 128k | **1×** | ❌ | Maximum code generation |
| **GPT-5.2** | OpenAI | 128k | **1×** | ❌ | Improved reasoning + code |
| **GPT-5.2-Codex** | OpenAI | 128k | **1×** | ❌ | Code-specialised GPT-5.2 |
| **GPT-5.3-Codex** | OpenAI | 128k | **1×** | ❌ | Latest code-specialised model |
| **Claude Opus 4.5** | Anthropic | 200k | **3×** | ❌ | Deep reasoning, architecture |
| **Claude Opus 4.6** | Anthropic | 200k | **3×** | ❌ | Deep reasoning, architecture |
| **Claude Opus 4.6 fast mode** *(preview)* | Anthropic | 200k | **30×** | ❌ | Ultra-fast Opus (preview only) |

---

## Models by Multiplier Tier

### Zero-cost (0×) — included in all plans

These models do **not** consume your premium request allowance. Use freely.

| Model | Provider | Availability |
|---|---|---|
| GPT-4o | OpenAI | All plans |
| GPT-4.1 | OpenAI | All plans |
| GPT-5 mini | OpenAI | All plans |
| Raptor mini | GitHub | All plans |

### Discounted (0.25× – 0.33×)

| Model | Multiplier | Provider |
|---|:---:|---|
| Grok Code Fast 1 | 0.25× | xAI |
| Claude Haiku 4.5 | 0.33× | Anthropic |
| Gemini 3 Flash | 0.33× | Google |
| GPT-5.1-Codex-Mini | 0.33× | OpenAI |

### Standard (1×)

| Model | Provider |
|---|---|
| Claude Sonnet 4 | Anthropic |
| Claude Sonnet 4.5 | Anthropic |
| Claude Sonnet 4.6 | Anthropic |
| Gemini 2.5 Pro | Google |
| Gemini 3 Pro | Google |
| Gemini 3.1 Pro | Google |
| GPT-5.1 | OpenAI |
| GPT-5.1-Codex | OpenAI |
| GPT-5.1-Codex-Max | OpenAI |
| GPT-5.2 | OpenAI |
| GPT-5.2-Codex | OpenAI |
| GPT-5.3-Codex | OpenAI |

### Higher cost (3×) — use intentionally

| Model | Provider | Notes |
|---|---|---|
| Claude Opus 4.5 | Anthropic | Best for deep architecture decisions |
| Claude Opus 4.6 | Anthropic | Latest Opus, strongest reasoning |

### Very high cost (30×) — preview only

| Model | Provider | Notes |
|---|---|---|
| Claude Opus 4.6 fast mode | Anthropic | Preview feature — confirm billing before use |

---

## Free Plan Model Access

GitHub Copilot Free provides access to a curated subset of models:

| Model | Note |
|---|---|
| GPT-4o | Full capability |
| GPT-4.1 | Full capability |
| GPT-5 mini | Full capability |
| Raptor mini | Full capability |
| Claude Haiku 4.5 | Discounted at 0.33× on paid plans; free on Free plan |
| Goldeneye | GitHub internal model — Free plan only |

> **Goldeneye** is GitHub's proprietary model, optimised for Copilot-specific tasks. It is not listed in the main model picker for paid plans.

---

## Retired Models (no longer available)

These models were available in earlier versions of GitHub Copilot and are now retired:

| Model | Provider | Replaced by |
|---|---|---|
| o3 | OpenAI | GPT-5.x series |
| o4-mini | OpenAI | GPT-5 mini |
| Claude Sonnet 3.5 | Anthropic | Claude Sonnet 4+ |
| Gemini 2.0 Flash | Google | Gemini 3 Flash |

> If you see these models referenced in older documentation or workshop materials, they are no longer available. Use the current equivalents listed above.

---

## How to Change Models in VS Code

1. Open Copilot Chat (`` Ctrl+Alt+I ``)
2. Click the model selector dropdown (bottom-left of the chat panel)
3. Choose from available models
4. The selection persists across sessions for that workspace

Alternatively, the `.vscode/settings.json` can pin a default model:

```json
{
  "github.copilot.chat.defaultModel": "claude-sonnet-4-6"
}
```

---

## Enterprise Recommendations

| Use case | Recommended model | Rationale |
|---|---|---|
| Daily code completions | GPT-4o | Zero cost, fast, excellent for .NET/C# |
| Agent mode (large refactors) | Claude Sonnet 4.6 | 200k context, strong multi-step reasoning |
| Large legacy codebase analysis | Gemini 3 Pro or Gemini 3.1 Pro | 1M token context for large enterprise codebases |
| Architecture review | Claude Opus 4.6 | Deepest reasoning — worth the 3× for critical decisions |
| Budget-conscious chat | Claude Haiku 4.5 | Fast, cheap, good for Q&A |
| Free/trial accounts | GPT-4o | Always available, zero cost |

---

## Source & Update Policy

- **Source:** [https://docs.github.com/en/copilot/reference/ai-models/supported-models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
- **Verified:** 2026-02-23
- **Update frequency:** GitHub updates model availability without notice. Check before major procurement or planning decisions.

To update this file, re-fetch the page above and update the table, then update `last-updated` in the frontmatter.
