# Module 05 - App Modernization

> **Time:** 35 minutes
> **Goal:** Use Copilot to understand legacy code, plan an incremental migration, and verify behavior after each change.

This module uses organization-neutral .NET Framework and Java 8 snippets. They are intentionally small and contain recognizable legacy patterns without requiring external services.

## Modernization loop

1. **Inventory** frameworks, dependencies, configuration, tests, and runtime assumptions.
2. **Plan** the smallest safe migration steps before editing.
3. **Change one concern** at a time: project format, hosting, dependency injection, async code, logging, then language features.
4. **Verify behavior** after every step with builds, tests, and focused reviews.
5. **Document remaining risk** instead of hiding unsupported or uncertain behavior.

## Samples

| Sample | Legacy patterns to find | Suggested target |
|---|---|---|
| [`dotnet-sample/`](dotnet-sample/) | Web API 2, `Web.config`, direct construction, synchronous repository | ASP.NET Core on a supported .NET release |
| [`java-sample/`](java-sample/) | Servlet API, manual JSON, mutable collections | Java 21 and Spring Boot 3 |

## Demo prompts

```text
Explain every legacy pattern in this folder and rank the migration risks.
```

```text
Create an incremental migration plan. Do not edit files until the plan identifies verification steps.
```

```text
Modernize only the configuration and dependency injection boundary. Preserve routes and response shapes.
```

Use the reusable [`modernize-dotnet.prompt.md`](../.github/prompts/modernize-dotnet.prompt.md) prompt for selected C# code.

## Guides

- [Modernizing the .NET sample](docs/dotnet-modernization.md)
- [Modernizing the Java sample](docs/java-modernization.md)
