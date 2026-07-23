# GitHub Copilot Advanced Workshop

[![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-Advanced-7c3aed?logo=github)](https://github.com/features/copilot)
[![Last updated](https://img.shields.io/badge/Updated-July_2026-2ea043)](CHANGELOG.md)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

An advanced, hands-on workshop covering customization, local and cloud agents, MCP, GitHub Copilot CLI, the GitHub Copilot app, testing, modernization, models, and GitHub.com workflows.

> **Audience:** Developers and technical practitioners with basic Copilot experience
> **Format:** Ten self-contained modules plus a 90-minute lab
> **Content policy:** All examples are synthetic and organization-neutral

## Learning outcomes

Participants will be able to:

- design repository instructions, path-specific instructions, prompt files, custom agents, skills, hooks, and plugins
- choose between Ask, Plan, local Agent mode, subagents, Copilot CLI, the Copilot app, and cloud agent
- connect trusted GitHub and Playwright MCP servers with least-privilege controls
- use current Copilot CLI features including Rubber Duck, Chronicle, Research, Fleet, Autopilot, remote control, voice, plugins, skills, and app handoff
- use the GitHub Copilot app for parallel isolated worktrees and visual session management
- delegate work to the cloud agent and review the resulting branch or pull request
- use Copilot Spaces and Copilot code review on GitHub.com
- modernize legacy code incrementally and validate generated tests
- select models and manage context without relying on a stale static model list

## Workshop map

| # | Module | Focus | Time |
|---|---|---|---:|
| [01](01-customization/README.md) | **Customization** | Instructions, prompt files, custom agents, skills, hooks, plugins | 45 min |
| [02](02-vscode-agents/README.md) | **Agent Workflows** | Ask, Plan, Agent mode, custom agents, subagents, supervision | 40 min |
| [03](03-mcp-samples/README.md) | **MCP Servers** | GitHub and Playwright MCP, configuration, security | 35 min |
| [04](04-copilot-cli/README.md) | **GitHub Copilot CLI** | Rubber Duck, Chronicle, Research, Fleet, delegation, remote control | 45 min |
| [05](05-app-modernization/README.md) | **App Modernization** | Incremental .NET and Java modernization | 35 min |
| [06](06-qa-testing/README.md) | **QA and Testing** | xUnit, Moq, Playwright, accessibility, test planning | 40 min |
| [07](07-copilot-app/README.md) | **GitHub Copilot App** | Parallel worktrees, sessions, extensions, cloud sandboxes preview | 30 min |
| [08](08-models-context/README.md) | **Models and Context** | Live model selection and context management | 25 min |
| [09](09-cloud-agent/README.md) | **Cloud Agent** | GitHub-hosted agent, code review, Spaces, GitHub.com workflows | 45 min |
| [10](10-hands-on-lab/README.md) | **Hands-on Lab** | Five guided exercises | 90 min |

## Quick start

```powershell
git clone https://github.com/haslam93/FY26---Advanced-GitHub-Copilot-Workshop.git
Set-Location FY26---Advanced-GitHub-Copilot-Workshop
npm install
npm test
npm run build:slides:office
```

Run the simple Node.js demo:

```powershell
Set-Location demo-nodejs
npm start
```

Open <http://localhost:3000>.

## Repository structure

```text
.github/
  agents/                       Custom-agent example
  instructions/                 Path-specific instructions
  prompts/                      IDE prompt files
  skills/                       Presentation QA skill
01-customization/
02-vscode-agents/
03-mcp-samples/
04-copilot-cli/
05-app-modernization/
06-qa-testing/
07-copilot-app/
08-models-context/
09-cloud-agent/
10-hands-on-lab/
demo-nodejs/                    Small dependency-free demonstration app
generate-presentation.js        PowerPoint source
GitHub-Copilot-Advanced-Workshop.pptx
```

## Validation

```powershell
npm test
dotnet test 06-qa-testing\csharp-unit-tests

Set-Location 06-qa-testing\playwright-samples
npm install
npx playwright install chromium
npm test
```

The PowerPoint is generated from `generate-presentation.js`. `npm run build:slides` creates the cross-platform PptxGenJS output. On Windows with Microsoft PowerPoint installed, `npm run build:slides:office` also resaves the deck through PowerPoint for strict Office Open XML normalization.

## Accuracy notes

GitHub Copilot changes quickly. The workshop avoids static model and pricing tables and links to live documentation for version-sensitive details. Before delivery, run `/help`, `/changelog`, and `/version` in Copilot CLI and verify preview features against the [Copilot feature matrix](https://docs.github.com/en/copilot/reference/copilot-feature-matrix).

## License

[MIT](LICENSE)
