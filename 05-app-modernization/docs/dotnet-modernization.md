# Modernizing the .NET Sample

The sample is a compact Web API 2 codebase for analysis and refactoring practice. It does not include external infrastructure.

## Recommended sequence

1. Ask Copilot to identify .NET Framework-only APIs.
2. Decide whether to use controllers or minimal APIs in the target application.
3. Move startup and routing from `App_Start/WebApiConfig.cs` to `Program.cs`.
4. Replace direct repository construction with dependency injection.
5. Replace controller-level exception handling with centralized middleware.
6. Introduce nullable reference types and immutable request/response records.
7. Add characterization tests before changing behavior.

## Useful prompts

```text
Compare this Web API 2 controller with an ASP.NET Core controller. List behavior that must not change.
```

```text
Generate characterization tests for the current routes before proposing a migration.
```

```text
Create the target .NET project in a new folder and migrate one endpoint at a time.
```

Follow the current [.NET upgrade documentation](https://learn.microsoft.com/dotnet/core/porting/) for supported tools and target versions.
