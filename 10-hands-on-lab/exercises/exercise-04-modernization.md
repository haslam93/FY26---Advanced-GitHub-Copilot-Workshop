# Exercise 04 - Modernization

> **Time:** 15 minutes
> **Reference:** [Module 05](../../05-app-modernization/README.md)

## Objectives

- Identify legacy patterns without changing behavior.
- Produce an incremental migration plan.
- Implement one small, reviewable improvement.

## Steps

1. Open `05-app-modernization/dotnet-sample`.
2. Ask:

   ```text
   Identify the .NET Framework-only APIs and risky coupling in this sample. Do not edit files.
   ```

3. Invoke the .NET modernization prompt on `WorkItemController.cs`.
4. Review the proposed sequence.
5. Ask Copilot to create characterization-test ideas for the existing routes.
6. Implement only one low-risk improvement in a disposable branch, such as extracting an interface for the repository.

## Checkpoint

You can explain why modernization should preserve observable behavior and verify each incremental step.
