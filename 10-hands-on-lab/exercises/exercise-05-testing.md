# Exercise 05 - Testing

> **Time:** 20 minutes
> **Reference:** [Module 06](../../06-qa-testing/README.md)

## Objectives

- Generate a test plan before generating tests.
- Run focused unit tests.
- Use Playwright and accessibility checks.

## C# unit tests

```powershell
Set-Location 06-qa-testing\csharp-unit-tests
dotnet test
```

Ask Copilot:

```text
Review WorkItemService.cs and its tests. Produce only a gap analysis. Do not edit files.
```

Choose one high-value missing case, generate it, and rerun `dotnet test`.

## Playwright tests

```powershell
Set-Location ..\playwright-samples
npm install
npx playwright install chromium
npm test
```

Ask Copilot to explain why role- and label-based locators are preferred, then review the accessibility test.

## Checkpoint

You can distinguish a generated test that verifies behavior from one that merely mirrors implementation details.
