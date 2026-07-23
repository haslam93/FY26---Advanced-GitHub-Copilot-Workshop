"use strict";

const path = require("node:path");
const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "GitHub Copilot Advanced Workshop";
pptx.company = "Workshop";
pptx.subject = "Advanced GitHub Copilot workshop";
pptx.title = "GitHub Copilot Advanced Workshop";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};
pptx.defineSlideMaster({
  title: "CONTENT",
  background: { color: "F7F5FB" },
  objects: [],
  slideNumber: { x: 9.12, y: 5.22, w: 0.5, h: 0.22, fontFace: "Aptos", fontSize: 9.5, color: "5E5668", align: "right" },
});
const W = 10;
const H = 5.625;
const OUT = path.join(__dirname, "GitHub-Copilot-Advanced-Workshop.pptx");

const C = {
  ink: "111018",
  plum: "24143A",
  violet: "7C3AED",
  violetSoft: "EDE9FE",
  mint: "14B8A6",
  mintSoft: "CCFBF1",
  coral: "F43F5E",
  coralSoft: "FFE4E6",
  amber: "F59E0B",
  amberSoft: "FEF3C7",
  sky: "0EA5E9",
  skySoft: "E0F2FE",
  paper: "F7F5FB",
  white: "FFFFFF",
  text: "24212B",
  muted: "5E5668",
  border: "DDD7E6",
  darkMuted: "D0CAD7",
};

function addOrbit(slide, dark = false) {
  const line = dark ? "5B4772" : "D8CFF0";
  const fill = dark ? C.plum : C.violetSoft;
  slide.addShape("ellipse", { x: 8.68, y: 0.18, w: 0.82, h: 0.82, fill: { color: fill, transparency: 70 }, line: { color: line, transparency: 25, width: 1.4 } });
  slide.addShape("ellipse", { x: 9.12, y: 0.52, w: 0.22, h: 0.22, fill: { color: C.mint }, line: { color: C.mint } });
  slide.addShape("ellipse", { x: 8.74, y: 0.25, w: 0.12, h: 0.12, fill: { color: C.coral }, line: { color: C.coral } });
}

function addFooter(slide, dark = false) {
  slide.addText("GitHub Copilot Advanced Workshop  |  July 2026", {
    x: 0.35, y: 5.22, w: 5.9, h: 0.22,
    fontFace: "Aptos", fontSize: 9.2, color: dark ? C.darkMuted : C.muted,
    margin: 0,
  });
}

function addSource(slide, text, url) {
  slide.addText([{ text, options: { hyperlink: { url }, color: C.violet, underline: { color: C.violet } } }], {
    x: 6.35, y: 5.21, w: 2.55, h: 0.22,
    fontFace: "Aptos", fontSize: 8.3, align: "right", margin: 0,
  });
}

function addTitle(slide, module, title, subtitle) {
  slide.addShape("roundRect", {
    x: 0.34, y: 0.28, w: 0.58, h: 0.42,
    rectRadius: 0.08,
    fill: { color: C.violet },
    line: { color: C.violet },
  });
  slide.addText(module, {
    x: 0.34, y: 0.28, w: 0.58, h: 0.42,
    fontFace: "Aptos", fontSize: 14, bold: true, color: C.white,
    align: "center", valign: "mid", margin: 0,
  });
  slide.addText(title, {
    x: 1.08, y: 0.22, w: 7.45, h: 0.52,
    fontFace: "Aptos Display", fontSize: 27, bold: true, color: C.text,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 1.1, y: 0.72, w: 7.6, h: 0.28,
      fontFace: "Aptos", fontSize: 11, color: C.muted, margin: 0,
    });
  }
  addOrbit(slide, false);
}

function contentSlide(module, title, subtitle) {
  const slide = pptx.addSlide("CONTENT");
  addTitle(slide, module, title, subtitle);
  addFooter(slide, false);
  return slide;
}

function sectionSlide(module, title, subtitle, accent = C.violet) {
  const slide = pptx.addSlide();
  slide.background = { color: C.ink };
  slide.addShape("rect", { x: 0, y: 0, w: 0.22, h: H, fill: { color: accent }, line: { color: accent } });
  slide.addShape("ellipse", { x: 7.5, y: 0.65, w: 1.7, h: 1.7, fill: { color: C.plum }, line: { color: "51376A", width: 1.4 } });
  slide.addShape("ellipse", { x: 9.0, y: 0.72, w: 0.44, h: 0.44, fill: { color: C.mint }, line: { color: C.mint } });
  slide.addShape("ellipse", { x: 7.28, y: 2.2, w: 0.25, h: 0.25, fill: { color: C.coral }, line: { color: C.coral } });
  slide.addText(module, {
    x: 7.5, y: 0.65, w: 1.7, h: 1.7,
    fontFace: "Aptos Display", fontSize: 44, bold: true, color: accent,
    align: "center", valign: "mid", margin: 0,
  });
  slide.addText(title, {
    x: 0.72, y: 1.55, w: 6.6, h: 1.15,
    fontFace: "Aptos Display", fontSize: 39, bold: true, color: C.white,
    margin: 0, breakLine: false,
  });
  slide.addText(subtitle, {
    x: 0.75, y: 2.85, w: 7.1, h: 0.7,
    fontFace: "Aptos", fontSize: 18.5, color: C.darkMuted,
    margin: 0,
  });
  slide.addShape("roundRect", {
    x: 0.75, y: 4.22, w: 3.05, h: 0.52,
    rectRadius: 0.08,
    fill: { color: C.plum },
    line: { color: "51376A" },
  });
  slide.addText("Repository module " + module, {
    x: 0.75, y: 4.22, w: 3.05, h: 0.52,
    fontFace: "Aptos", fontSize: 13, bold: true, color: C.mint,
    align: "center", valign: "mid", margin: 0,
  });
  addFooter(slide, true);
  return slide;
}

function card(slide, x, y, w, h, title, body, accent = C.violet, fill = C.white) {
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: fill },
    line: { color: C.border, width: 1 },
    shadow: { type: "outer", color: "6D5D80", blur: 2, offset: 1, angle: 45, opacity: 0.1 },
  });
  slide.addShape("roundRect", {
    x: x + 0.18, y: y + 0.17, w: 0.12, h: h - 0.34, rectRadius: 0.04,
    fill: { color: accent }, line: { color: accent },
  });
  slide.addText(title, {
    x: x + 0.42, y: y + 0.16, w: w - 0.58, h: 0.34,
    fontFace: "Aptos Display", fontSize: 14, bold: true, color: C.text,
    margin: 0,
  });
  if (Array.isArray(body)) {
    bulletList(slide, body, x + 0.42, y + 0.56, w - 0.58, h - 0.68, C.muted, 11);
  } else {
    slide.addText(body, {
      x: x + 0.42, y: y + 0.57, w: w - 0.58, h: h - 0.72,
      fontFace: "Aptos", fontSize: 11.2, color: C.muted,
      margin: 0.02, valign: "top", breakLine: false,
    });
  }
}

function bulletList(slide, items, x, y, w, h, color = C.text, fontSize = 12) {
  const runs = [];
  items.forEach((item, index) => {
    runs.push({
      text: item,
      options: {
        bullet: true,
        breakLine: index < items.length - 1,
        color,
        fontSize,
        paraSpaceAfterPt: 6,
      },
    });
  });
  slide.addText(runs, {
    x, y, w, h,
    fontFace: "Aptos",
    color,
    fontSize,
    margin: 0.05,
    breakLine: false,
    valign: "top",
  });
}

function pill(slide, text, x, y, w, color, fill) {
  slide.addShape("roundRect", {
    x, y, w, h: 0.38, rectRadius: 0.12,
    fill: { color: fill },
    line: { color, transparency: 35 },
  });
  slide.addText(text, {
    x, y, w, h: 0.38,
    fontFace: "Aptos", fontSize: 10, bold: true, color,
    align: "center", valign: "mid", margin: 0,
  });
}

function flow(slide, labels, x, y, w, accent = C.violet) {
  const gap = 0.3;
  const boxW = (w - gap * (labels.length - 1)) / labels.length;
  labels.forEach((label, index) => {
    const boxX = x + index * (boxW + gap);
    slide.addShape("roundRect", {
      x: boxX, y, w: boxW, h: 0.82, rectRadius: 0.08,
      fill: { color: index % 2 === 0 ? C.white : C.violetSoft },
      line: { color: index === labels.length - 1 ? C.mint : C.border, width: 1.1 },
    });
    slide.addText(label, {
      x: boxX + 0.08, y: y + 0.1, w: boxW - 0.16, h: 0.62,
      fontFace: "Aptos", fontSize: 10.5, bold: true, color: index === labels.length - 1 ? C.mint : C.text,
      align: "center", valign: "mid", margin: 0.02,
    });
    if (index < labels.length - 1) {
      slide.addText(">", {
        x: boxX + boxW, y: y + 0.24, w: gap, h: 0.3,
        fontFace: "Aptos Display", fontSize: 13, bold: true, color: accent,
        align: "center", margin: 0,
      });
    }
  });
}

function stat(slide, value, label, x, y, w, color, fill) {
  slide.addShape("roundRect", { x, y, w, h: 1.05, rectRadius: 0.08, fill: { color: fill }, line: { color, transparency: 50 } });
  slide.addText(value, { x, y: y + 0.12, w, h: 0.46, fontFace: "Aptos Display", fontSize: 27, bold: true, color, align: "center", margin: 0 });
  slide.addText(label, { x: x + 0.1, y: y + 0.62, w: w - 0.2, h: 0.24, fontFace: "Aptos", fontSize: 9.5, color: C.muted, align: "center", margin: 0 });
}

// 1. Cover
{
  const slide = pptx.addSlide();
  slide.background = { color: C.ink };
  slide.addShape("rect", { x: 0, y: 0, w: 0.24, h: H, fill: { color: C.violet }, line: { color: C.violet } });
  slide.addShape("rect", { x: 0.24, y: 0, w: 0.07, h: H, fill: { color: C.mint }, line: { color: C.mint } });
  slide.addText("GITHUB COPILOT", { x: 0.72, y: 0.74, w: 4.6, h: 0.34, fontFace: "Aptos", fontSize: 14, bold: true, charSpacing: 2.5, color: C.mint, margin: 0 });
  slide.addText("Advanced\nWorkshop", { x: 0.7, y: 1.25, w: 6.2, h: 1.7, fontFace: "Aptos Display", fontSize: 49, bold: true, color: C.white, margin: 0, breakLine: false });
  slide.addText("Customization, agents, MCP, CLI, desktop app, testing, and cloud workflows", { x: 0.75, y: 3.18, w: 6.6, h: 0.68, fontFace: "Aptos", fontSize: 17, color: C.darkMuted, margin: 0 });
  pill(slide, "10 modules", 0.75, 4.16, 1.35, C.violet, C.plum);
  pill(slide, "Hands-on", 2.25, 4.16, 1.35, C.mint, "153D3A");
  pill(slide, "July 2026", 3.75, 4.16, 1.35, C.coral, "46212A");
  slide.addShape("ellipse", { x: 7.2, y: 0.8, w: 2.05, h: 2.05, fill: { color: C.plum }, line: { color: "654580", width: 1.5 } });
  slide.addShape("ellipse", { x: 7.74, y: 1.34, w: 0.98, h: 0.98, fill: { color: C.violet }, line: { color: C.violet } });
  slide.addShape("ellipse", { x: 8.5, y: 0.92, w: 0.38, h: 0.38, fill: { color: C.mint }, line: { color: C.mint } });
  slide.addShape("ellipse", { x: 7.24, y: 2.28, w: 0.3, h: 0.3, fill: { color: C.coral }, line: { color: C.coral } });
  slide.addText("LOCAL", { x: 7.73, y: 1.62, w: 1.0, h: 0.25, fontFace: "Aptos", fontSize: 12, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("APP", { x: 6.95, y: 3.1, w: 0.9, h: 0.28, fontFace: "Aptos", fontSize: 11, bold: true, color: C.mint, align: "center", margin: 0 });
  slide.addText("CLI", { x: 8.12, y: 3.45, w: 0.9, h: 0.28, fontFace: "Aptos", fontSize: 11, bold: true, color: C.violet, align: "center", margin: 0 });
  slide.addText("CLOUD", { x: 8.48, y: 4.02, w: 1.2, h: 0.28, fontFace: "Aptos", fontSize: 11, bold: true, color: C.coral, align: "center", margin: 0 });
  addFooter(slide, true);
}

// 2. Agenda
{
  const slide = contentSlide("00", "Workshop map", "A progression from customization to cloud delivery");
  const modules = [
    ["01", "Customization", C.violet],
    ["02", "Agent workflows", C.mint],
    ["03", "MCP servers", C.sky],
    ["04", "Copilot CLI", C.coral],
    ["05", "Modernization", C.amber],
    ["06", "QA and testing", C.mint],
    ["07", "Copilot app", C.violet],
    ["08", "Models and context", C.sky],
    ["09", "Cloud Agent", C.coral],
    ["10", "Hands-on lab", C.amber],
  ];
  modules.forEach((module, index) => {
    const col = index < 5 ? 0 : 1;
    const row = index % 5;
    const x = col === 0 ? 0.45 : 5.15;
    const y = 1.18 + row * 0.76;
    slide.addShape("roundRect", { x, y, w: 4.35, h: 0.6, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.border } });
    slide.addShape("roundRect", { x: x + 0.1, y: y + 0.1, w: 0.56, h: 0.4, rectRadius: 0.05, fill: { color: module[2] }, line: { color: module[2] } });
    slide.addText(module[0], { x: x + 0.1, y: y + 0.1, w: 0.56, h: 0.4, fontFace: "Aptos", fontSize: 11, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
    slide.addText(module[1], { x: x + 0.82, y: y + 0.13, w: 3.2, h: 0.34, fontFace: "Aptos Display", fontSize: 14, bold: true, color: C.text, margin: 0 });
  });
}

// 3. Surface decision
{
  const slide = contentSlide("00", "Pick the right Copilot surface", "Start with the execution environment, then choose the agent");
  card(slide, 0.45, 1.18, 2.85, 2.18, "IDE agent", "Local files and terminal.\n\nBest for guided coding, tight edit-review loops, and immediate debugging.", C.mint, C.mintSoft);
  card(slide, 3.58, 1.18, 2.85, 2.18, "Copilot CLI or app", "Local agent engine with terminal or visual workspace.\n\nBest for longer sessions, subagents, worktrees, and richer orchestration.", C.violet, C.violetSoft);
  card(slide, 6.7, 1.18, 2.85, 2.18, "Cloud Agent", "GitHub-hosted asynchronous work.\n\nBest for branch-first research, issue-to-PR delivery, and remote steering.", C.coral, C.coralSoft);
  flow(slide, ["Clarify outcome", "Choose surface", "Set autonomy", "Validate and review"], 1.0, 3.78, 8.0, C.violet);
}

// Module 01
sectionSlide("01", "Customization", "Instructions, prompt files, custom agents, skills, hooks, and plugins", C.violet);

{
  const slide = contentSlide("01", "Customization layers", "Use the narrowest mechanism that fits the job");
  const rows = [
    ["Instructions", "Stable behavior and repository facts", ".github/copilot-instructions.md"],
    ["Prompt files", "Reusable IDE workflow, manually invoked", ".github/prompts/*.prompt.md"],
    ["Custom agents", "Specialist persona and tool boundary", ".github/agents/*.agent.md"],
    ["Skills", "Task-specific instructions, scripts, resources", ".github/skills/<name>/SKILL.md"],
    ["Hooks and plugins", "Deterministic controls and packaged extensions", ".github/hooks and marketplaces"],
  ];
  rows.forEach((row, index) => {
    const y = 1.1 + index * 0.78;
    slide.addShape("roundRect", { x: 0.45, y, w: 9.1, h: 0.62, rectRadius: 0.06, fill: { color: index % 2 ? "F1EDF7" : C.white }, line: { color: C.border } });
    slide.addText(row[0], { x: 0.68, y: y + 0.12, w: 1.45, h: 0.3, fontFace: "Aptos Display", fontSize: 13, bold: true, color: index === 3 ? C.mint : C.violet, margin: 0 });
    slide.addText(row[1], { x: 2.22, y: y + 0.12, w: 3.75, h: 0.3, fontFace: "Aptos", fontSize: 11, color: C.text, margin: 0 });
    slide.addText(row[2], { x: 6.1, y: y + 0.12, w: 3.15, h: 0.3, fontFace: "Consolas", fontSize: 9.5, color: C.muted, margin: 0 });
  });
  addSource(slide, "Customization cheat sheet", "https://docs.github.com/en/copilot/reference/customization-cheat-sheet");
}

{
  const slide = contentSlide("01", "Live artifacts in this repository", "Everything shown here is active workshop material");
  card(slide, 0.45, 1.15, 2.85, 1.45, "Repository instructions", "C# and workshop conventions\n\nPath-specific test rules", C.violet);
  card(slide, 3.58, 1.15, 2.85, 1.45, "Workshop reviewer", "Custom agent checks accuracy, neutrality, links, and evidence", C.coral);
  card(slide, 6.7, 1.15, 2.85, 1.45, "Presentation QA", "Skill defines text extraction, visual review, and fix-verify loop", C.mint);
  slide.addText("Design rules", { x: 0.45, y: 3.0, w: 2.2, h: 0.34, fontFace: "Aptos Display", fontSize: 17, bold: true, color: C.text, margin: 0 });
  bulletList(slide, [
    "Keep stable rules in instructions, not every prompt",
    "Prompt files are IDE-oriented and preview",
    "Use user-invocable and disable-model-invocation for current custom agents",
    "Inspect skills and plugins before enabling scripts or tools",
  ], 0.5, 3.45, 8.95, 1.55, C.text, 11.5);
}

// Module 02
sectionSlide("02", "Agent workflows", "Ask, Plan, Agent mode, custom agents, and isolated subagents", C.mint);

{
  const slide = contentSlide("02", "The local agent loop", "Autonomy increases only after the task is clear");
  flow(slide, ["Outcome and constraints", "Search context", "Plan", "Implement with tools", "Review diff"], 0.55, 1.35, 8.9, C.mint);
  card(slide, 0.55, 2.55, 2.7, 1.45, "Ask", "Explain, compare, or investigate without changing files.", C.sky, C.skySoft);
  card(slide, 3.65, 2.55, 2.7, 1.45, "Plan", "Explore the approach, dependencies, and acceptance criteria before implementation.", C.mint, C.mintSoft);
  card(slide, 6.75, 2.55, 2.7, 1.45, "Agent", "Search, change files, run commands, test, and iterate across the repository.", C.violet, C.violetSoft);
}

{
  const slide = contentSlide("02", "Custom agents and subagents", "Repeatable specialist versus isolated execution");
  card(slide, 0.55, 1.2, 4.25, 2.18, "Custom agent", "A reusable definition with a role, instructions, model preferences, and tool boundaries.\n\nUse for a recurring testing, review, migration, or documentation role.", C.violet, C.violetSoft);
  card(slide, 5.2, 1.2, 4.25, 2.18, "Subagent", "A temporary isolated execution with its own context window.\n\nUse for independent research or review that should not crowd the main session.", C.mint, C.mintSoft);
  slide.addShape("roundRect", { x: 1.35, y: 3.78, w: 7.3, h: 0.62, rectRadius: 0.08, fill: { color: C.coralSoft }, line: { color: C.coral, transparency: 55 } });
  slide.addText("Do not send several agents to edit the same files. Parallel ownership must be independent.", { x: 1.55, y: 3.94, w: 6.9, h: 0.26, fontFace: "Aptos", fontSize: 11.5, bold: true, color: C.coral, align: "center", margin: 0 });
}

// Module 03
sectionSlide("03", "MCP servers", "Trusted tools, least privilege, and external context", C.sky);

{
  const slide = contentSlide("03", "MCP architecture and security", "Tool visibility never replaces authentication or authorization");
  flow(slide, ["Copilot host", "MCP configuration", "Trusted server", "Tool call", "External system"], 0.55, 1.28, 8.9, C.sky);
  card(slide, 0.55, 2.5, 4.25, 2.0, "Included servers", "GitHub remote MCP\nPlaywright local MCP\n\nSTDIO for local tools; Streamable HTTP for remote tools.", C.sky, C.skySoft);
  card(slide, 5.2, 2.5, 4.25, 2.0, "Security checklist", ["Allowlist only needed tools", "Use least-privilege scopes", "Keep secrets outside source", "Review third-party servers", "Constrain browser and network access"], C.coral, C.coralSoft);
  addSource(slide, "MCP and Copilot", "https://docs.github.com/en/copilot/concepts/context/mcp");
}

// Module 04
sectionSlide("04", "GitHub Copilot CLI", "Rubber Duck, Chronicle, Fleet, delegation, remote, and voice", C.coral);

{
  const slide = contentSlide("04", "A modern terminal agent workflow", "Plan locally, validate, critique, then hand off only when useful");
  flow(slide, ["/plan", "Guided or Autopilot mode", "/diff and tests", "/rubber-duck", "/delegate or share"], 0.55, 1.3, 8.9, C.coral);
  stat(slide, "GA", "Copilot CLI", 0.7, 2.65, 1.75, C.violet, C.violetSoft);
  stat(slide, "GA", "Rubber Duck", 2.65, 2.65, 1.75, C.mint, C.mintSoft);
  stat(slide, "GA", "Remote control", 4.6, 2.65, 1.75, C.sky, C.skySoft);
  stat(slide, "GA", "Voice input", 6.55, 2.65, 1.75, C.coral, C.coralSoft);
  slide.addText("The redesigned terminal interface is GA. Verify the installed build with /version and /changelog.", { x: 1.1, y: 4.18, w: 7.8, h: 0.42, fontFace: "Aptos", fontSize: 12, bold: true, color: C.text, align: "center", margin: 0 });
  addSource(slide, "CLI command reference", "https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference");
}

{
  const slide = contentSlide("04", "CLI feature map", "Use /help as the live source of truth");
  const groups = [
    ["Build", "/plan  /refine  Autopilot  /fleet  /tasks", C.violet, C.violetSoft],
    ["Review", "/rubber-duck  /review  /security-review  /diff", C.mint, C.mintSoft],
    ["Research", "/research  /ask  GitHub and web search", C.sky, C.skySoft],
    ["Extend", "/agent  /skills  /plugin  /mcp  /lsp", C.coral, C.coralSoft],
    ["History", "/chronicle  /resume  /search  /rewind  /share", C.amber, C.amberSoft],
    ["Connect", "/delegate  /remote  /app  /voice  /pr", C.violet, C.violetSoft],
  ];
  groups.forEach((group, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    card(slide, 0.55 + col * 4.65, 1.12 + row * 1.25, 4.25, 1.02, group[0], group[1], group[2], group[3]);
  });
}

{
  const slide = contentSlide("04", "Rubber Duck, Chronicle, and Fleet", "Three features that change how you work, not just what you type");
  card(slide, 0.45, 1.16, 2.88, 2.35, "Rubber Duck", "Read-only second opinion using a contrasting model.\n\nChallenge plans, code, tests, and assumptions before you finish.", C.mint, C.mintSoft);
  card(slide, 3.56, 1.16, 2.88, 2.35, "Chronicle", "Analyze synchronized session history.\n\nGenerate standups, tips, usage insights, instruction improvements, and skill ideas.", C.violet, C.violetSoft);
  card(slide, 6.67, 1.16, 2.88, 2.35, "Fleet", "Parallel local subagents managed by the CLI orchestrator.\n\nUse only when tasks are genuinely independent.", C.coral, C.coralSoft);
  slide.addText("Fleet is local orchestration. /delegate sends work to Cloud Agent. They are not the same workflow.", { x: 1.05, y: 3.92, w: 7.9, h: 0.42, fontFace: "Aptos", fontSize: 12, bold: true, color: C.text, align: "center", margin: 0 });
}

{
  const slide = contentSlide("04", "Current status and version caveats", "Teach the capability and verify the command in the installed build");
  card(slide, 0.55, 1.18, 4.25, 2.45, "Generally available", ["Copilot CLI", "Redesigned terminal UI", "Rubber Duck", "Voice input", "Remote control"], C.mint, C.mintSoft);
  card(slide, 5.2, 1.18, 4.25, 2.45, "Preview or experimental", ["Copilot Memory: public preview", "/mcp search: experimental", "/every and /after scheduling: experimental", "App cloud sandboxes: public preview"], C.coral, C.coralSoft);
  slide.addText("Some builds expose /autopilot or /memory toggles. Official guidance treats Autopilot as a mode and Memory as a capability. Check /help.", { x: 1.0, y: 3.98, w: 8.0, h: 0.48, fontFace: "Aptos", fontSize: 11.5, color: C.muted, align: "center", margin: 0 });
}

// Module 05
sectionSlide("05", "App modernization", "Inventory, plan, migrate incrementally, and preserve behavior", C.amber);

{
  const slide = contentSlide("05", "The modernization loop", "Copilot accelerates analysis and implementation; tests protect behavior");
  flow(slide, ["Inventory", "Characterize behavior", "Plan small steps", "Migrate one concern", "Build and test"], 0.55, 1.3, 8.9, C.amber);
  card(slide, 0.55, 2.55, 4.25, 1.5, ".NET sample", "Web API 2, Web.config, synchronous repository, direct construction.\n\nTarget a supported .NET release and ASP.NET Core.", C.violet, C.violetSoft);
  card(slide, 5.2, 2.55, 4.25, 1.5, "Java sample", "Java 8 servlet, manual JSON, tightly coupled request handling.\n\nTarget Java 21 and Spring Boot 3.", C.mint, C.mintSoft);
}

// Module 06
sectionSlide("06", "QA and testing", "Test planning, focused generation, Playwright, and accessibility", C.mint);

{
  const slide = contentSlide("06", "Generate a plan before tests", "Copilot should expose assumptions before it writes assertions");
  flow(slide, ["Read behavior", "Draft test plan", "Approve cases", "Generate focused tests", "Run and review"], 0.55, 1.28, 8.9, C.mint);
  card(slide, 0.55, 2.52, 2.75, 1.55, "Unit", "xUnit and Moq sample\n\nBusiness rules, validation, failures", C.violet, C.violetSoft);
  card(slide, 3.62, 2.52, 2.75, 1.55, "End-to-end", "Playwright sample\n\nStable role and label locators", C.sky, C.skySoft);
  card(slide, 6.7, 2.52, 2.75, 1.55, "Accessibility", "axe-core plus keyboard checks\n\nAutomated checks need human review", C.coral, C.coralSoft);
}

// Module 07
sectionSlide("07", "GitHub Copilot App", "A visual workspace built on Copilot CLI", C.violet);

{
  const slide = contentSlide("07", "The app workspace", "Parallel isolated sessions without losing the CLI agent model");
  card(slide, 0.45, 1.15, 2.85, 1.35, "Worktrees", "Separate branches and files for parallel tasks", C.violet, C.violetSoft);
  card(slide, 3.58, 1.15, 2.85, 1.35, "Modes", "Interactive, Plan, and Autopilot sessions", C.mint, C.mintSoft);
  card(slide, 6.7, 1.15, 2.85, 1.35, "GitHub workflow", "Issues, pull requests, checks, review, and merge", C.coral, C.coralSoft);
  card(slide, 0.45, 2.78, 2.85, 1.35, "Customization", "Instructions, agents, skills, MCP, plugins", C.sky, C.skySoft);
  card(slide, 3.58, 2.78, 2.85, 1.35, "Session intelligence", "Quick chats, Chronicle, automations", C.amber, C.amberSoft);
  card(slide, 6.7, 2.78, 2.85, 1.35, "Rich UI", "Canvas extensions and model/provider selection", C.violet, C.violetSoft);
  addSource(slide, "Copilot app overview", "https://docs.github.com/en/copilot/concepts/agents/github-copilot-app");
}

{
  const slide = contentSlide("07", "App, CLI, and Cloud Agent", "One ecosystem, different execution environments");
  card(slide, 0.45, 1.22, 2.88, 2.32, "Copilot CLI", "Terminal-first local work\n\nBest for scripting, shell tools, and direct orchestration", C.coral, C.coralSoft);
  card(slide, 3.56, 1.22, 2.88, 2.32, "Copilot app", "Visual local workspace\n\nBest for parallel worktrees, sessions, PR review, and canvases", C.violet, C.violetSoft);
  card(slide, 6.67, 1.22, 2.88, 2.32, "Cloud Agent", "Hosted asynchronous work\n\nBest for branch-first research or issue-to-PR delivery", C.mint, C.mintSoft);
  slide.addShape("roundRect", { x: 1.2, y: 3.92, w: 7.6, h: 0.52, rectRadius: 0.08, fill: { color: C.amberSoft }, line: { color: C.amber, transparency: 55 } });
  slide.addText("Cloud sandboxes in the app are public preview. Use local worktrees for the stable workshop path.", { x: 1.35, y: 4.06, w: 7.3, h: 0.22, fontFace: "Aptos", fontSize: 11, bold: true, color: "8A5900", align: "center", margin: 0 });
}

// Module 08
sectionSlide("08", "Models and context", "Live selection, task fit, and high-signal context", C.sky);

{
  const slide = contentSlide("08", "Choose by task, not a static ranking", "Availability, pricing, and model versions change too quickly for a frozen table");
  card(slide, 0.45, 1.15, 2.85, 1.32, "Routine edits", "Start with the default or a fast general-purpose model", C.mint, C.mintSoft);
  card(slide, 3.58, 1.15, 2.85, 1.32, "Complex implementation", "Use a balanced coding and reasoning model", C.violet, C.violetSoft);
  card(slide, 6.7, 1.15, 2.85, 1.32, "Architecture and review", "Escalate to deeper reasoning and independent critique", C.coral, C.coralSoft);
  slide.addText("High-signal context", { x: 0.52, y: 2.82, w: 2.6, h: 0.34, fontFace: "Aptos Display", fontSize: 17, bold: true, color: C.text, margin: 0 });
  bulletList(slide, ["Acceptance criteria", "Relevant files and errors", "Build and test commands", "Stable repository instructions", "Current policy and constraints"], 0.55, 3.18, 4.0, 1.6, C.text, 11);
  slide.addText("Avoid", { x: 5.05, y: 2.82, w: 1.4, h: 0.34, fontFace: "Aptos Display", fontSize: 17, bold: true, color: C.coral, margin: 0 });
  bulletList(slide, ["Attaching whole folders just in case", "Old conversation branches", "Static model rankings", "Copied documentation the agent can search"], 5.05, 3.18, 4.35, 1.6, C.text, 11);
  addSource(slide, "Supported models", "https://docs.github.com/en/copilot/reference/ai-models/supported-models");
}

// Module 09
sectionSlide("09", "Cloud Agent", "GitHub-hosted research, planning, implementation, and review", C.coral);

{
  const slide = contentSlide("09", "Cloud-agent workflow", "The former Copilot coding agent is now Cloud Agent");
  flow(slide, ["Start session or issue", "Research and plan", "Edit branch", "Run validation", "Review or create PR"], 0.55, 1.25, 8.9, C.coral);
  card(slide, 0.55, 2.48, 4.25, 1.65, "Branch-first paths", "Agents or Copilot interface sessions can stay on a branch while you steer and review.\n\nChoose Create pull request when ready.", C.violet, C.violetSoft);
  card(slide, 5.2, 2.48, 4.25, 1.65, "Pull-request paths", "Issue assignment always creates a PR.\n\nExplicit PR requests, @copilot on an existing PR, and CLI delegation also produce PR workflows.", C.mint, C.mintSoft);
  addSource(slide, "Cloud Agent overview", "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent");
}

{
  const slide = contentSlide("09", "GitHub.com features to teach now", "Cloud Agent sits inside a broader context and quality ecosystem");
  card(slide, 0.45, 1.12, 2.85, 1.35, "Custom agents and MCP", "Repository, organization, enterprise, and user agents\n\nAllowlist trusted cloud MCP tools", C.violet, C.violetSoft);
  card(slide, 3.58, 1.12, 2.85, 1.35, "Copilot Spaces", "GA curated context from repositories, files, issues, PRs, and instructions", C.mint, C.mintSoft);
  card(slide, 6.7, 1.12, 2.85, 1.35, "Code review", "GA non-blocking review comments with human validation", C.sky, C.skySoft);
  card(slide, 0.45, 2.78, 4.3, 1.38, "Latest review controls", ["AGENTS.md, REVIEW.md, CLAUDE.md, GEMINI.md", "Head-branch instructions and skills", "Workflow, firewall, and runner configuration"], C.coral, C.coralSoft);
  card(slide, 5.05, 2.78, 4.5, 1.38, "Still preview", ["Medium review effort", "Send suggestions to Cloud Agent", "Selected skills and MCP in code review"], C.amber, C.amberSoft);
}

// Module 10
sectionSlide("10", "Hands-on lab", "Five exercises plus a simple Node.js demonstration app", C.amber);

{
  const slide = contentSlide("10", "Lab flow and demo application", "Use synthetic data and disposable branches for write exercises");
  const lab = [
    ["01", "Customization", "Instructions, prompt, agent, skill"],
    ["02", "Cloud Agent", "Issue, hosted session, PR review"],
    ["03", "MCP", "GitHub read tools and Playwright"],
    ["04", "Modernization", "Analyze, plan, preserve behavior"],
    ["05", "Testing", "xUnit, Playwright, accessibility"],
  ];
  lab.forEach((item, index) => {
    const y = 1.05 + index * 0.72;
    slide.addShape("roundRect", { x: 0.45, y, w: 5.5, h: 0.56, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.border } });
    slide.addText(item[0], { x: 0.58, y: y + 0.09, w: 0.48, h: 0.34, fontFace: "Aptos", fontSize: 11, bold: true, color: C.violet, align: "center", margin: 0 });
    slide.addText(item[1], { x: 1.15, y: y + 0.09, w: 1.45, h: 0.34, fontFace: "Aptos Display", fontSize: 12.5, bold: true, color: C.text, margin: 0 });
    slide.addText(item[2], { x: 2.65, y: y + 0.1, w: 3.05, h: 0.3, fontFace: "Aptos", fontSize: 9.5, color: C.muted, margin: 0 });
  });
  card(slide, 6.25, 1.05, 3.3, 3.12, "demo-nodejs", ["Dependency-free task board", "Built-in HTTP server", "Single-page UI", "Node test runner", "No external service setup", "Ideal for local and cloud demos"], C.mint, C.mintSoft);
}

// 30. Closing
{
  const slide = pptx.addSlide();
  slide.background = { color: C.ink };
  slide.addShape("rect", { x: 0, y: 0, w: 0.24, h: H, fill: { color: C.mint }, line: { color: C.mint } });
  slide.addText("Build the habit, not the screenshot", { x: 0.75, y: 0.88, w: 8.6, h: 0.7, fontFace: "Aptos Display", fontSize: 36, bold: true, color: C.white, margin: 0 });
  slide.addText("Use live help and documentation for version-sensitive details. Keep repository instructions stable, permissions narrow, and human review explicit.", { x: 0.78, y: 1.82, w: 7.35, h: 0.9, fontFace: "Aptos", fontSize: 17, color: C.darkMuted, margin: 0 });
  const sources = [
    ["Copilot CLI", "docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli"],
    ["Copilot app", "docs.github.com/en/copilot/concepts/agents/github-copilot-app"],
    ["Cloud Agent", "docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent"],
    ["Feature matrix", "docs.github.com/en/copilot/reference/copilot-feature-matrix"],
  ];
  sources.forEach((source, index) => {
    const y = 3.12 + index * 0.43;
    slide.addText(source[0], { x: 0.8, y, w: 1.25, h: 0.25, fontFace: "Aptos", fontSize: 10.5, bold: true, color: index % 2 ? C.mint : C.violet, margin: 0 });
    slide.addText(source[1], { x: 2.08, y, w: 6.9, h: 0.25, fontFace: "Consolas", fontSize: 9.5, color: C.darkMuted, margin: 0 });
  });
  slide.addShape("roundRect", { x: 0.8, y: 4.82, w: 8.1, h: 0.38, rectRadius: 0.08, fill: { color: C.plum }, line: { color: "51376A" } });
  slide.addText("CUSTOMIZE  >  ORCHESTRATE  >  VALIDATE  >  REVIEW", { x: 0.8, y: 4.82, w: 8.1, h: 0.38, fontFace: "Aptos", fontSize: 11, bold: true, color: C.mint, align: "center", valign: "mid", margin: 0 });
  addOrbit(slide, true);
  addFooter(slide, true);
}

pptx.writeFile({ fileName: OUT })
  .then(() => console.log(`Created ${OUT}`))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
