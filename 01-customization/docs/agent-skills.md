# Agent Skills

A skill is a reusable capability packaged with instructions and optional scripts or resources. Skills are a better fit than a long prompt when the workflow has multiple steps or supporting files.

The repository includes `.github/skills/presentation-qa/SKILL.md`, which describes how to validate slide content and visual output.

## Skill design checklist

- Give the skill a narrow trigger and clear outcome.
- State required tools and dependencies.
- Describe the ordered workflow.
- Include safety boundaries.
- Define completion and validation criteria.
- Keep supporting resources inside the skill folder.

Use the `/skills` command in Copilot CLI to inspect available skills and current client behavior.
