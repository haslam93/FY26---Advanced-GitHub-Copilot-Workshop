# Module 08 — Models & Context

[![Module](https://img.shields.io/badge/Module-08_Models_%26_Context-0078d4?logo=github&logoColor=white)](.)
[![Estimated Time](https://img.shields.io/badge/Time-25_min-informational)](.) [![Level](https://img.shields.io/badge/Level-Advanced-red)](.)

> **Learning objectives:** Understand which AI models are available in GitHub Copilot, how premium request multipliers work, and how to manage context windows effectively for large codebases.

> **Data accuracy note:** Model table data sourced from [GitHub Docs — Supported Models](https://docs.github.com/en/copilot/reference/ai-models/supported-models) on **2026-02-23**. Model availability changes frequently — always verify against live docs.

---

## Model Landscape (as of 2026-02-23)

GitHub Copilot provides access to models from **Anthropic**, **Google**, **OpenAI**, **xAI**, and **GitHub**. Model availability depends on your Copilot plan.

### Speed vs Reasoning Quadrant

```mermaid
quadrantChart
    title GitHub Copilot Models — Speed vs Reasoning Depth
    x-axis Fast Response --> Deep Reasoning
    y-axis Low Cost --> Higher Cost

    quadrant-1 Powerful & Expensive
    quadrant-2 Fast & Economical
    quadrant-3 Balanced Standard
    quadrant-4 Fast Deep Thinkers

    GPT-5 mini: [0.12, 0.08]
    GPT-4o: [0.18, 0.22]
    Raptor mini: [0.15, 0.12]
    Claude Haiku 4.5: [0.20, 0.18]
    Gemini 3 Flash: [0.22, 0.16]
    Grok Code Fast 1: [0.25, 0.14]
    Claude Sonnet 4.6: [0.55, 0.58]
    Gemini 3 Pro: [0.52, 0.62]
    GPT-5.2: [0.60, 0.65]
    GPT-5.3-Codex: [0.70, 0.72]
    Claude Opus 4.6: [0.80, 0.88]
    Claude Opus 4.6 fast: [0.85, 0.92]
```

---

## Premium Request Multipliers

When your plan includes a **monthly premium request allowance**, each model consumes a different fraction of that budget.

```mermaid
xychart-beta
    title "Premium Request Multipliers by Model"
    x-axis ["GPT-4o", "Claude Haiku 4.5", "Gemini 3 Flash", "GPT-5.1-Codex-Mini", "Grok Code Fast 1", "Claude Sonnet 4.6", "Gemini 3 Pro", "GPT-5.2", "Claude Opus 4.5", "Claude Opus 4.6"]
    y-axis "Multiplier (× per request)" 0 --> 4
    bar [0, 0.33, 0.33, 0.33, 0.25, 1, 1, 1, 3, 3]
```

> **Claude Opus 4.6 fast mode (preview)** has a 30× multiplier and is not shown on this chart to maintain scale.

---

## Model Selection Decision Tree

```mermaid
flowchart TD
    A[What is your task?] --> B{Code generation\nor completion?}

    B -- "Yes — familiar code\nor boilerplate" --> C[GPT-4o or GPT-5 mini\n0× — zero cost]
    B -- "Yes — complex logic,\nalgorithms, refactoring" --> D{Need deep\nreasoning?}
    D -- "No" --> E[Claude Sonnet 4.6\nor GPT-5.2 — 1×]
    D -- "Yes — architectural\ndecisions" --> F[Claude Opus 4.6\n3× — approve thoughtfully]

    B -- "No — chat,\nexplain, document" --> G{Response\nspeed priority?}
    G -- "Fast" --> H[Claude Haiku 4.5\nor Gemini 3 Flash — 0.33×]
    G -- "Quality" --> E

    A --> I{Accessibility\nor free plan?}
    I --> J[GPT-4o, GPT-4.1,\nGPT-5 mini, Claude Haiku 4.5,\nRaptor mini — all free]

    style C fill:#2e7d32,color:#fff
    style J fill:#1565c0,color:#fff
    style F fill:#b71c1c,color:#fff
```

---

## Module Structure

```
08-models-context/
├── README.md                    ← This file (model table + multipliers)
├── docs/
│   ├── models-reference.md      ← Full model table with live data (2026-02-23)
│   ├── context-management.md    ← Managing context windows effectively
│   └── model-selection-guide.md ← Practical guide for enterprise devs
```

---

## Context Window Quick Reference

| Model | Context Window | Notes |
|---|---|---|
| GPT-4o | 128k tokens | Strong code understanding |
| Claude Sonnet 4.6 | 200k tokens | Excellent for large codebases |
| Claude Opus 4.6 | 200k tokens | Best for deep analysis |
| Gemini 3 Pro | 1M tokens | Largest context available |
| GPT-5.2 | 128k tokens | Strong code generation |

> **1 token ≈ 4 characters.** A 200k token context can hold approximately 150,000 words — the equivalent of a large novel, or a mid-size C# project.

---

## Quick Tips

| Tip | Detail |
|---|---|
| **Default to GPT-4o for completions** | Zero cost — use it heavily in Edit mode |
| **Escalate to Sonnet for Agent mode** | Complex multi-step tasks benefit from stronger reasoning |
| **Use Gemini 3 Pro for large files** | 1M token context handles the largest enterprise codebases |
| **Reserve Opus for architecture reviews** | 3× cost is justified for high-stakes design decisions |
| **Free plan? All 0× models are always free** | Your allowance is not consumed by zero-cost models |

---

## Related Modules

- [Module 01 — Customization](../01-customization/README.md) (per-model instruction files)
- [Module 02 — VS Code Agents](../02-vscode-agents/README.md) (model selection in Agent mode)
- [Module 09 — Copilot on GitHub.com](../09-copilot-on-github/README.md) (Coding Agent model options)
