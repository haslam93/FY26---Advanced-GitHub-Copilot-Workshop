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

It contains 10 self-contained learning modules covering customization, agent workflows, MCP servers, Copilot CLI, app modernization, QA and testing, the GitHub Copilot app, models and context, the Cloud agent, and a hands-on lab.

## Key Conventions (same as .github/copilot-instructions.md)

- Language: C# 12 / .NET 8
- Test framework: xUnit + Moq
- Async/await throughout — no `.Result` or `.Wait()`
- XML doc comments on all public members
- Secrets in environment variables / `IConfiguration` only

## Agent-Specific Guidance

- When asked to modify workshop content, preserve the teaching intent of the file
- When generating sample code, include inline comments explaining the Copilot technique being demonstrated
- Keep every example organization-neutral and use synthetic names and data
- When suggesting improvements to instruction files, explain the rationale as a comment in the file
