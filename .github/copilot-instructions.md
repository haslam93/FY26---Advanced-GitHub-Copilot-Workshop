# Copilot Instructions — GitHub Copilot Advanced Workshop Repo

<!--
  WORKSHOP NOTE: This file is .github/copilot-instructions.md
  It is automatically detected by VS Code and applied to EVERY chat request
  in this workspace. No configuration required.

  See Module 01 for a full explanation of how this file works:
  ../01-customization/docs/always-on-instructions.md
-->

## Language & Runtime

- Primary language: **C# 12 / .NET 8**
- Target framework: `net8.0` for all new code
- Use `global using` directives in `GlobalUsings.cs` — do not repeat common namespaces in every file
- Nullable reference types are **enabled** — always handle nullability explicitly

## Naming Conventions

- Classes, interfaces, methods, properties: `PascalCase`
- Local variables, parameters: `camelCase`
- Private fields: `_camelCase` (underscore prefix)
- Constants: `UPPER_SNAKE_CASE`
- Interfaces: `IInterfaceName` prefix
- Async methods: suffix with `Async` (e.g. `GetWorkItemAsync`)

## Code Style

- Use `var` only when the type is obvious from the right-hand side
- Prefer expression-bodied members for single-line properties and simple methods
- Always use `async`/`await` — never `.Result` or `.Wait()` on Tasks
- Prefer `IEnumerable<T>` / `IReadOnlyList<T>` over concrete collection types in method signatures
- Use `record` types for immutable DTOs and value objects
- Prefer pattern matching (`is`, `switch` expressions) over `as` casts + null checks

## XML Documentation

- All `public` and `protected` members require XML doc comments
- Format:
  ```csharp
  /// <summary>Brief one-line description.</summary>
  /// <param name="workItemId">The unique identifier of the work item.</param>
  /// <returns>The work item, or null if not found.</returns>
  /// <exception cref="ArgumentNullException">Thrown when <paramref name="workItemId"/> is null.</exception>
  ```
- Do not use XML docs on `private` members unless the logic is non-obvious

## Error Handling

- Use typed exceptions over generic `Exception` where possible
- Never swallow exceptions silently — always log before re-throwing
- Use `ArgumentNullException.ThrowIfNull()` (.NET 6+) for guard clauses
- Centralise error handling with middleware in ASP.NET Core apps — do not scatter try/catch in controllers

## Security

- Never log sensitive data (passwords, tokens, PII) — mask or omit them
- Use `IConfiguration` / environment variables for secrets — never hard-code credentials
- Validate all user input before processing — use FluentValidation or Data Annotations
- Prefer `IHttpClientFactory` over `new HttpClient()` to avoid socket exhaustion

## Testing

- Test framework: **xUnit**
- Mocking library: **Moq**
- Naming pattern: `MethodName_StateUnderTest_ExpectedBehavior`
- Arrange / Act / Assert sections separated by blank lines with `// Arrange`, `// Act`, `// Assert` comments
- Each test method tests exactly one behaviour

## Dependencies & Project Structure

- Prefer the standard layered structure: `Controllers → Services → Repositories → Data`
- Use constructor injection for all dependencies
- Register services with lifetimes: `Scoped` for repositories, `Transient` for validators, `Singleton` for caches
- Do not reference `Microsoft.AspNetCore` from domain/service layer projects

## General Guidance for Copilot

- When generating code for this repo, default to .NET 8 patterns and C# 12 features
- Prefer minimal API style for new endpoints unless controller-based pattern is already in use
- When refactoring legacy .NET Framework code, flag deprecated APIs with a `// LEGACY:` comment
- Keep examples organization-neutral and use synthetic data only
