# Path-Specific Instructions

Place path-specific files under `.github/instructions/` and use front matter to define their scope.

```markdown
---
name: "Test Standards"
description: "Conventions for C# test files"
applyTo: "**/*Tests.cs"
---

- Use xUnit and Moq.
- Follow Arrange, Act, Assert.
- Run the focused test project after editing.
```

Use path-specific instructions when a rule would be noisy or wrong outside a file family. Examples include test frameworks, frontend accessibility rules, infrastructure policy, or generated-code restrictions.

Avoid overlapping globs with contradictory requirements. Test the instruction by opening a matching and non-matching file and asking Copilot which rules apply.
