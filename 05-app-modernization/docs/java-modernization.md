# Modernizing the Java Sample

The Java 8 servlet demonstrates manual response construction and tightly coupled request handling.

## Recommended sequence

1. Capture current endpoint behavior with tests.
2. Move the project to a supported Java LTS release.
3. Replace `javax.*` dependencies with the Jakarta equivalents required by the chosen framework.
4. Introduce Spring Boot 3 with a small REST controller.
5. Replace manual JSON construction with typed records and framework serialization.
6. Add validation, structured logging, and centralized error handling.

## Useful prompts

```text
Explain which parts of this servlet change when moving from Java 8 to Java 21 and Spring Boot 3.
```

```text
Create a behavior-preserving REST controller and a focused test for the existing JSON response.
```

Use the current [GitHub Copilot Java modernization documentation](https://docs.github.com/en/copilot/tutorials/modernize-legacy-code) and your framework's migration guide before selecting target versions.
