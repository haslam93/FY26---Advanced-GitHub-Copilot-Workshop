# Model Selection Guide

> **Practical guide for enterprise developers:** which model to reach for, when, and why.

---

## The 30-Second Rule

> **Default:** Start with **GPT-4o** (0× cost).  
> **Upgrade:** Switch to **Claude Sonnet 4.6** for multi-file Agent tasks.  
> **Escalate:** Use **Claude Opus 4.6** only for critical architectural decisions.

---

## Decision Matrix

| Task type | Duration | Recommended model | Cost | Reason |
|---|---|---|:---:|---|
| Inline code completion | Instant | GPT-4o | 0× | Fast, accurate, zero cost |
| Explain code | < 2 min | GPT-4o or Claude Haiku 4.5 | 0× / 0.33× | Concise explanations |
| Write a single test | < 2 min | GPT-4o | 0× | Well within context, no need to upgrade |
| Refactor a single class | < 5 min | GPT-4o | 0× | Single file fits easily |
| Refactor multiple classes | 5–15 min | Claude Sonnet 4.6 | 1× | 200k context, strong multi-step reasoning |
| Agent mode: full feature | 15–30 min | Claude Sonnet 4.6 | 1× | Balances cost and capability |
| Large legacy file analysis | Varies | Gemini 3 Pro | 1× | 1M token context for large files |
| Architecture review | 30+ min | Claude Opus 4.6 | 3× | Deepest reasoning — justify the cost |
| Security / threat modelling | 30+ min | Claude Opus 4.6 | 3× | High-stakes, needs careful analysis |
| Quick Q&A on free plan | < 2 min | GPT-4o | 0× (free) | Always available |

---

## Model Profiles

### GPT-4o — The Everyday Workhorse

- **Best for:** Code completions, simple refactors, documentation
- **Context:** 128k tokens (~12,800 lines of C#)
- **Cost:** **0× — never consumes premium allowance**
- **Avoid when:** Task requires understanding of a very large codebase simultaneously

```text
// When to use GPT-4o
- Adding a new method to an existing class
- Generating XML doc comments
- Fixing a single compiler error
- Explaining what a method does
- Writing a Dockerfile
```

---

### Claude Haiku 4.5 — Fast and Cheap Chat

- **Best for:** Summarisation, Q&A, quick explanations
- **Context:** 200k tokens
- **Cost:** **0.33× — uses very little allowance**
- **Avoid when:** Task needs deep code reasoning or multi-step planning

```text
// When to use Claude Haiku 4.5
- "Summarise this spec document in bullet points"
- "What is the purpose of this class?"
- "Translate this error message into plain English"
```

---

### Claude Sonnet 4.6 — The Agent Mode Standard

- **Best for:** Complex multi-file refactors, Agent mode sessions, code review
- **Context:** 200k tokens
- **Cost:** **1× — standard rate**
- **The right default for paid plans when GPT-4o isn't enough**

```text
// When to use Claude Sonnet 4.6
- Migrating a Web API 2 controller to ASP.NET Core 8
- Writing a full xUnit test class with edge cases
- Analysing a 2,000-line legacy service and proposing a refactor plan
- Background Agent tasks on GitHub.com
```

---

### Gemini 3 Pro / 3.1 Pro — The Large Context Champion

- **Best for:** Tasks where you must attach a very large file or multiple large files
- **Context:** **1,000,000 tokens** — holds entire enterprise projects
- **Cost:** **1×**

```text
// When to use Gemini 3 Pro
- "Analyse this 10,000-line WCF service and create a migration plan"
- "Given this entire database schema (500 tables), identify foreign key inconsistencies"
- "Review this 300-page technical specification document"
```

---

### Claude Opus 4.6 — The Architect

- **Best for:** High-stakes decisions, threat modelling, complex algorithm design
- **Context:** 200k tokens
- **Cost:** **3× — use deliberately**

```text
// When to justify 3× cost (enterprise examples)
- "Review this microservices migration proposal for the Benefits platform
   and identify security, scalability, and operational risks"
- "Design a CQRS architecture for the permit submission workflow that handles
   100k submissions/day and satisfies MFIPPA data residency requirements"
- "Analyse this authentication flow for AODA compliance and OAuth 2.0 best practices"
```

---

## Plan-Based Availability

| Plan | Zero-cost models | Premium budget | Max model |
|---|---|---|---|
| **Copilot Free** | GPT-4o, GPT-4.1, GPT-5 mini, Raptor mini, Claude Haiku 4.5 | Limited | Claude Haiku 4.5 |
| **Copilot Individual** | All 0× models | 300 premium req/month | Claude Opus 4.6 |
| **Copilot Business** | All 0× models | 300 premium req/month per seat | Claude Opus 4.6 |
| **Copilot Enterprise** | All 0× models | Custom | Claude Opus 4.6 |

> **Enterprise context:** Most enterprise developers will be on Copilot Business or Enterprise. The 300 premium request/month default can be increased by your GitHub admin.

---

## Estimating Monthly Premium Usage

| Daily workflow | Est. requests/day | Est. monthly | Cost at 1× |
|---|---|---|---|
| Code completions only (GPT-4o) | 50+ | 1,000+ | **0** |
| Mixed: completions + occasional Agent | 5 agent sessions | 100 | 100 premium requests |
| Heavy Agent mode user | 2–3 sessions/day | 300 | 300 premium requests |
| Architecture review (Opus) | 1 session | 5 opus = 15 requests | 15 premium requests |

> Agent mode sessions tend to use **5–30 premium requests per session** depending on duration and model.

---

## Switching Models Mid-Session

You can switch models at any point in a Copilot Chat session:

1. Click the model name in the status bar of the chat panel
2. Select a different model
3. Your chat history carries over — but the new model will re-process context from scratch

**Tip:** Start a long refactor session with `GPT-4o`, then upgrade to `Claude Sonnet 4.6` if you need deeper reasoning on a specific step.

---

## Related

- [Models Reference](models-reference.md) — Full model table with context windows and multipliers
- [Context Management](context-management.md) — Managing what goes into the window
- [Module 01 — copilot-instructions.md](../../01-customization/docs/always-on-instructions.md)
