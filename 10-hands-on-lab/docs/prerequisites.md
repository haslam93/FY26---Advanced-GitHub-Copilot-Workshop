# Prerequisites

## Required

- Git
- Node.js 20 or later
- VS Code with the current GitHub Copilot extension
- Access to GitHub Copilot
- A fork or branch where you can create issues and pull requests

## Recommended

- GitHub Copilot CLI
- GitHub Copilot app
- .NET 8 SDK for the C# testing sample
- Playwright browser dependencies

## Verify

```powershell
git --version
node --version
npm --version
copilot --version
dotnet --version
```

Install repository dependencies:

```powershell
npm install
Set-Location demo-nodejs
npm test
```

For the Playwright exercise:

```powershell
Set-Location ..\06-qa-testing\playwright-samples
npm install
npx playwright install chromium
```

Do not place tokens in repository files. Complete authentication through the supported GitHub or editor sign-in flow.
