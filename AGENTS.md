# AGENTS.md — Workshop Repository Instructions

<!--
  AGENTS.md is recognized by GitHub Copilot, Claude Code, and other AI agents.
  It functions identically to .github/copilot-instructions.md as an always-on
  instruction file. Use it when your team works with multiple AI tools and wants
  a single source of truth that all agents read.

  See Module 01 → docs/always-on-instructions.md for details.
-->

## Project Overview

This is the **GitHub Copilot Advanced Workshop** repository for enterprise developers.

It contains 10 self-contained learning modules covering: customization, VS Code agents, MCP servers, Copilot CLI, App Modernization, QA & Testing, Databases, Models & Context, Copilot on GitHub.com, and a hands-on lab.

## Key Conventions (same as .github/copilot-instructions.md)

- Language: C# 12 / .NET 8
- Test framework: xUnit + Moq
- SQL dialect: T-SQL (SQL Server)
- Async/await throughout — no `.Result` or `.Wait()`
- XML doc comments on all public members
- Secrets in environment variables / `IConfiguration` only

## Agent-Specific Guidance

- When asked to modify workshop content, preserve the teaching intent of the file
- When generating sample code, include inline comments explaining the Copilot technique being demonstrated
- When editing SQL samples, target the `OntarioPermits` schema defined in `07-databases/samples/schema.sql`
- When suggesting improvements to instruction files, explain the rationale as a comment in the file
