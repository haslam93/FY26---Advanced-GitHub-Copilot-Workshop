# Prompt Files

Prompt files are reusable workflows stored in `.github/prompts/*.prompt.md`.

Good prompt files:

- describe one repeatable outcome
- state required inputs
- ask for verification
- constrain risky behavior
- produce a predictable output shape

This repository includes prompts for code review, test generation, legacy explanation, and .NET modernization.

## Example

```markdown
---
name: "Code Review"
description: "Review selected code for correctness and security"
---

Review `${selection}`. Report only high-confidence findings with file locations,
impact, and a concrete fix. Ignore style-only feedback.
```

Prompt files are an IDE-oriented public-preview feature and are not a GitHub.com or Copilot CLI customization mechanism. Use the prompt picker or slash-command UI exposed by the supported editor.
