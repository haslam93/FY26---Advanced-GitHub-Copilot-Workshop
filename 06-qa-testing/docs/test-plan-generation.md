# Test-Plan Generation

Ask Copilot for a plan before asking for code.

## Prompt template

```text
Read WorkItemService.cs and produce a test plan.

For each public method include:
- expected behavior
- invalid inputs
- dependency failures
- cancellation behavior
- observable side effects

Flag any requirement that is ambiguous. Do not generate tests yet.
```

After reviewing the plan:

```text
Generate the approved tests with xUnit and Moq, run dotnet test, and fix only test defects or clear implementation bugs.
```

The included sample intentionally keeps the service small enough to discuss every generated test during a live workshop.
