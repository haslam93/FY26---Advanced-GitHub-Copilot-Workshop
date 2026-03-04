/**
 * GitHub Copilot Advanced Workshop — Presentation Generator v2
 *
 * Full GitHub dark-mode theme (Primer Design System colours).
 * Logo placeholder boxes included wherever a logo would normally appear.
 *
 * Run: node generate-presentation.js
 */

"use strict";

const pptxgen = require("pptxgenjs");

// ─────────────────────────────────────────────────────────────────────────────
// GITHUB PRIMER COLOUR PALETTE  (no # prefix — pptxgenjs rule)
// ─────────────────────────────────────────────────────────────────────────────
const C = {
    // Backgrounds
    bgCanvas: "0D1117",   // page / canvas background
    bgCard: "161B22",   // card, header bar
    bgOverlay: "21262D",   // code panels, subtle inset
    bgHighlight: "1F2937",   // hover / highlight state

    // Borders
    border: "30363D",   // default border
    borderMuted: "21262D",   // subtle border

    // Foreground
    textPrimary: "F0F6FC",   // white-ish headlines
    textSecond: "C9D1D9",   // body text
    textMuted: "8B949E",   // captions, hints
    textLink: "58A6FF",   // links / blue accent

    // Brand / Accent
    green: "2DA44E",   // GitHub green — primary CTA
    greenBright: "3FB950",   // highlighted green text on dark
    blue: "58A6FF",   // informational
    purple: "BC8CFF",   // AI / Copilot accent
    orange: "F0883E",   // warning / CLI
    red: "FF7B72",   // error / danger
    yellow: "E3B341",   // caution / highlight

    // Misc
    white: "FFFFFF",
    cobalLight: "79C0FF",   // lighter blue for code keywords
};

const FONT = "Segoe UI";
const FONT_MONO = "Consolas";
const W = 10;      // slide width (inches)
const H = 5.625;   // slide height (inches)

// ─────────────────────────────────────────────────────────────────────────────
// LOGO PLACEHOLDER  — call on any slide where a real logo would sit
// ─────────────────────────────────────────────────────────────────────────────
function logoPlaceholder(slide, x, y, w, h, label) {
    slide.addShape("rect", {
        x, y, w, h,
        fill: { color: C.bgOverlay },
        line: { color: C.border, pt: 1, dashType: "lgDash" },
    });
    slide.addText(label || "[ Add GitHub Copilot logo here ]", {
        x, y, w, h,
        fontFace: FONT, fontSize: 9, color: C.textMuted,
        align: "center", valign: "middle", italic: true,
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION DIVIDER SLIDE — dark canvas, green left stripe, logo placeholder
// ─────────────────────────────────────────────────────────────────────────────
function sectionSlide(pres, moduleNum, title, subtitle) {
    const s = pres.addSlide();
    s.background = { color: C.bgCanvas };

    // Thick green left stripe
    s.addShape("rect", { x: 0, y: 0, w: 0.28, h: H, fill: { color: C.green }, line: { color: C.green } });

    // Green top accent rule
    s.addShape("rect", { x: 0.28, y: 0, w: W - 0.28, h: 0.06, fill: { color: C.green }, line: { color: C.green } });

    // Module badge (large number on the right)
    s.addShape("rect", { x: 7.8, y: 0.5, w: 1.9, h: 1.9, fill: { color: C.bgCard }, line: { color: C.border, pt: 1 } });
    s.addText(moduleNum, {
        x: 7.8, y: 0.5, w: 1.9, h: 1.9,
        fontFace: FONT, fontSize: 56, bold: true, color: C.green,
        align: "center", valign: "middle",
    });

    // Title
    s.addText(title, {
        x: 0.55, y: 1.6, w: 7.0, h: 0.95,
        fontFace: FONT, fontSize: 40, bold: true, color: C.textPrimary, align: "left",
    });

    if (subtitle) {
        s.addText(subtitle, {
            x: 0.55, y: 2.65, w: 7.2, h: 0.5,
            fontFace: FONT, fontSize: 16, color: C.textMuted, align: "left", italic: true,
        });
    }

    // Logo placeholder (top-right corner)
    logoPlaceholder(s, 7.8, 2.8, 1.9, 0.7, "[ Add logo ]");

    // Bottom bar
    s.addShape("rect", { x: 0, y: H - 0.32, w: W, h: 0.32, fill: { color: C.bgCard }, line: { color: C.bgCard } });
    s.addShape("rect", { x: 0, y: H - 0.32, w: 0.28, h: 0.32, fill: { color: C.green }, line: { color: C.green } });
    s.addText("GitHub Copilot Advanced Workshop", {
        x: 0.4, y: H - 0.32, w: 9.2, h: 0.32,
        fontFace: FONT, fontSize: 9, color: C.textMuted, align: "left", valign: "middle",
    });
    return s;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT SLIDE — dark background, green-lined header, slide number
// ─────────────────────────────────────────────────────────────────────────────
function contentSlide(pres, title) {
    const s = pres.addSlide();
    s.background = { color: C.bgCanvas };

    // Header bar
    s.addShape("rect", { x: 0, y: 0, w: W, h: 0.6, fill: { color: C.bgCard }, line: { color: C.bgCard } });
    // Green accent underline
    s.addShape("rect", { x: 0, y: 0.6, w: W, h: 0.04, fill: { color: C.green }, line: { color: C.green } });
    // Left green cap on header
    s.addShape("rect", { x: 0, y: 0, w: 0.05, h: 0.6, fill: { color: C.green }, line: { color: C.green } });

    s.addText(title, {
        x: 0.2, y: 0.05, w: 9.4, h: 0.52,
        fontFace: FONT, fontSize: 20, bold: true, color: C.textPrimary,
        valign: "middle", margin: 0,
    });

    // Bottom bar
    s.addShape("rect", { x: 0, y: H - 0.28, w: W, h: 0.28, fill: { color: C.bgCard }, line: { color: C.bgCard } });
    s.addShape("rect", { x: 0, y: H - 0.28, w: W, h: 0.01, fill: { color: C.border }, line: { color: C.border } });
    s.addText("GitHub Copilot Advanced Workshop", {
        x: 0.2, y: H - 0.28, w: 9.6, h: 0.28,
        fontFace: FONT, fontSize: 8, color: C.textMuted, align: "left", valign: "middle",
    });
    return s;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Bullet list on a dark slide */
function addBullets(slide, items, opts) {
    const rows = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const text = typeof item === "string" ? item : item.text;
        const level = (typeof item === "object" && item.level) ? item.level : 0;
        const isLast = (i === items.length - 1);
        const isBold = (typeof item === "object" && item.bold);
        const itemColor = (typeof item === "object" && item.color) ? item.color : (opts.color || C.textSecond);
        rows.push({
            text,
            options: {
                bullet: { type: "bullet", characterCode: level === 0 ? "25B8" : "25BA" },
                indentLevel: level,
                fontSize: opts.fontSize || 13,
                color: isBold ? C.textPrimary : itemColor,
                breakLine: !isLast,
                bold: isBold || false,
            },
        });
    }
    slide.addText(rows, {
        x: opts.x != null ? opts.x : 0.35,
        y: opts.y != null ? opts.y : 0.8,
        w: opts.w || 9.3,
        h: opts.h || 4.3,
        fontFace: FONT,
        valign: "top",
    });
}

/** Dark-theme table */
function addTable(slide, headers, rows, x, y, w, colW) {
    const data = [];

    // Header row
    const hrow = headers.map((h) => ({
        text: h,
        options: {
            bold: true,
            fontSize: 11,
            color: C.greenBright,
            fill: { color: C.bgOverlay },
            align: "center",
            border: [
                { type: "none" },
                { type: "none" },
                { pt: 1, color: C.green, type: "solid" },
                { type: "none" },
            ],
        },
    }));
    data.push(hrow);

    // Data rows
    rows.forEach((row, ri) => {
        const drow = row.map((cell, ci) => ({
            text: String(cell),
            options: {
                fontSize: 10,
                color: ci === 0 ? C.textPrimary : C.textSecond,
                fill: { color: ri % 2 === 0 ? C.bgCanvas : C.bgCard },
                align: ci === 0 ? "left" : "center",
                bold: ci === 0,
                border: { pt: 1, color: C.border, type: "solid" },
            },
        }));
        data.push(drow);
    });

    slide.addTable(data, {
        x, y, w,
        colW,
        rowH: 0.3,
        border: { pt: 1, color: C.border },
    });
}

/** GitHub-style dark code block */
function codeBlock(slide, codeLines, x, y, w, h, lang) {
    // Panel background
    slide.addShape("rect", {
        x, y, w, h,
        fill: { color: C.bgCard },
        line: { color: C.border, pt: 1 },
    });
    // Top tab with language label
    if (lang) {
        slide.addShape("rect", {
            x, y, w, h: 0.24,
            fill: { color: C.bgOverlay },
            line: { color: C.border, pt: 1 },
        });
        slide.addText(lang, {
            x: x + 0.12, y: y + 0.03, w: 2.0, h: 0.18,
            fontFace: FONT_MONO, fontSize: 8, color: C.textMuted,
        });
        // Copy icon placeholder
        slide.addShape("rect", {
            x: x + w - 0.32, y: y + 0.04, w: 0.2, h: 0.16,
            fill: { color: C.border }, line: { color: C.border },
        });
    }
    slide.addText(codeLines.join("\n"), {
        x: x + 0.14,
        y: y + (lang ? 0.27 : 0.1),
        w: w - 0.28,
        h: h - (lang ? 0.32 : 0.15),
        fontFace: FONT_MONO,
        fontSize: 9.5,
        color: C.greenBright,
        valign: "top",
        wrap: true,
    });
}

/** Dark stat callout box */
function statCallout(slide, value, label, x, y, accentColor) {
    const bg = accentColor || C.green;
    slide.addShape("rect", {
        x, y, w: 2.15, h: 1.05,
        fill: { color: C.bgCard },
        line: { color: bg, pt: 2 },
    });
    // Top colour strip
    slide.addShape("rect", {
        x, y, w: 2.15, h: 0.1,
        fill: { color: bg }, line: { color: bg },
    });
    slide.addText(value, {
        x, y: y + 0.1, w: 2.15, h: 0.6,
        fontFace: FONT, fontSize: 32, bold: true, color: accentColor || C.green, align: "center",
    });
    slide.addText(label, {
        x, y: y + 0.7, w: 2.15, h: 0.3,
        fontFace: FONT, fontSize: 9, color: C.textMuted, align: "center",
    });
}

/** Dark card panel (replaces offWhite panels) */
function cardPanel(slide, x, y, w, h, accentColor) {
    slide.addShape("rect", {
        x, y, w, h,
        fill: { color: C.bgCard },
        line: { color: accentColor || C.border, pt: 1 },
    });
    if (accentColor) {
        slide.addShape("rect", { x, y, w: 0.08, h, fill: { color: accentColor }, line: { color: accentColor } });
    }
}

/** Flow diagram row: array of {label, sub?} -> connected boxes with arrows */
function flowDiagram(slide, steps, y, accentColor) {
    const boxW = (W - 0.6) / steps.length - 0.15;
    const gap = 0.15;
    const arrowColor = accentColor || C.green;

    steps.forEach((st, i) => {
        const x = 0.3 + i * (boxW + gap);

        // Box
        slide.addShape("roundRect", {
            x, y, w: boxW, h: 0.72,
            fill: { color: i === 0 ? arrowColor : C.bgCard },
            line: { color: i === 0 ? arrowColor : C.border, pt: 1 },
            rectRadius: 0.08,
        });
        slide.addText(st.label, {
            x, y: y + 0.04, w: boxW, h: 0.36,
            fontFace: FONT, fontSize: 10.5, bold: true,
            color: i === 0 ? C.white : C.textPrimary,
            align: "center",
        });
        if (st.sub) {
            slide.addText(st.sub, {
                x, y: y + 0.38, w: boxW, h: 0.28,
                fontFace: FONT, fontSize: 8.5, color: i === 0 ? C.white : C.textMuted,
                align: "center",
            });
        }

        // Arrow connector (except after last)
        if (i < steps.length - 1) {
            const ax = x + boxW + 0.01;
            slide.addShape("rightArrow", {
                x: ax, y: y + 0.24, w: gap + 0.08, h: 0.24,
                fill: { color: arrowColor },
                line: { color: arrowColor },
            });
        }
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// BUILD PRESENTATION
// ─────────────────────────────────────────────────────────────────────────────
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "GitHub Copilot Advanced Workshop";
pres.title = "GitHub Copilot Advanced Workshop";
pres.subject = "Enterprise Workshop — 10 Modules";

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 ─ COVER
// ══════════════════════════════════════════════════════════════════════════════
{
    const s = pres.addSlide();
    s.background = { color: C.bgCanvas };

    // Green left stripe
    s.addShape("rect", { x: 0, y: 0, w: 0.3, h: H, fill: { color: C.green }, line: { color: C.green } });
    // Purple accent stripe
    s.addShape("rect", { x: 0.3, y: 0, w: 0.06, h: H, fill: { color: C.purple }, line: { color: C.purple } });

    // Logo placeholder (top-right)
    logoPlaceholder(s, 7.85, 0.15, 1.85, 0.85, "[ Add GitHub Copilot logo ]");

    // Copilot icon placeholder (left, decorative)
    logoPlaceholder(s, 0.55, 0.7, 1.2, 1.2, "[ Copilot icon ]");

    // Title text
    s.addText("GitHub Copilot", {
        x: 0.55, y: 1.1, w: 8, h: 0.52,
        fontFace: FONT, fontSize: 22, color: C.green, align: "left",
    });
    s.addText("Advanced Workshop", {
        x: 0.55, y: 1.55, w: 8.5, h: 1.1,
        fontFace: FONT, fontSize: 50, bold: true, color: C.textPrimary, align: "left",
    });
    s.addText("10 Modules  ·  Hands-on Lab  ·  Enterprise Workshop", {
        x: 0.55, y: 2.75, w: 8.5, h: 0.4,
        fontFace: FONT, fontSize: 15, color: C.textMuted, align: "left",
    });

    // Pill badges row
    const pills = [
        { label: "C# 12 / .NET 8", border: C.blue },
        { label: "MCP Servers", border: C.purple },
        { label: "Copilot CLI  GA", border: C.green },
        { label: "Fleet", border: C.orange },
        { label: "AI Code Review", border: C.textMuted },
    ];
    pills.forEach((p, i) => {
        const x = 0.55 + i * 1.87;
        s.addShape("roundRect", { x, y: 3.3, w: 1.72, h: 0.38, fill: { color: C.bgCard }, line: { color: p.border, pt: 1.5 }, rectRadius: 0.1 });
        s.addText(p.label, { x, y: 3.3, w: 1.72, h: 0.38, fontFace: FONT, fontSize: 10.5, color: C.textSecond, align: "center", valign: "middle" });
    });

    // Bottom bar
    s.addShape("rect", { x: 0, y: H - 0.3, w: W, h: 0.3, fill: { color: C.bgCard }, line: { color: C.bgCard } });
    s.addShape("rect", { x: 0, y: H - 0.3, w: 0.3, h: 0.3, fill: { color: C.green }, line: { color: C.green } });
    s.addText("March 2026  |  github.com/copilot  |  docs.github.com/en/copilot", {
        x: 0.45, y: H - 0.3, w: 9.2, h: 0.3,
        fontFace: FONT, fontSize: 9, color: C.textMuted, align: "left", valign: "middle",
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 ─ AGENDA
// ══════════════════════════════════════════════════════════════════════════════
{
    const s = contentSlide(pres, "Workshop Agenda — 10 Modules");

    const leftMods = [
        { text: "01  Customization & Instruction Files", bold: true, color: C.green },
        { text: "    Always-on instructions, prompt files, file-based scoping", level: 1 },
        { text: "02  VS Code Agent Modes", bold: true, color: C.blue },
        { text: "    Ask / Edit / Agent / Background — when to use each", level: 1 },
        { text: "03  MCP Servers", bold: true, color: C.purple },
        { text: "    Azure DevOps, Azure, GitHub, Playwright", level: 1 },
        { text: "04  Copilot CLI  (GA)", bold: true, color: C.orange },
        { text: "    suggest, explain, fleet, shell aliases", level: 1 },
        { text: "05  App Modernization", bold: true, color: C.yellow },
        { text: "    .NET Upgrade Assistant · Java 8 → 21", level: 1 },
    ];

    const rightMods = [
        { text: "06  QA & Testing", bold: true, color: C.greenBright },
        { text: "    xUnit test generation, Playwright + MCP", level: 1 },
        { text: "07  Databases", bold: true, color: C.cobalLight },
        { text: "    mssql extension, SQL patterns, stored procs", level: 1 },
        { text: "08  Models & Context", bold: true, color: C.purple },
        { text: "    23 models, selection guide, context tips", level: 1 },
        { text: "09  Copilot on GitHub.com", bold: true, color: C.blue },
        { text: "    Coding agents, AI review, Spaces", level: 1 },
        { text: "10  Hands-on Lab", bold: true, color: C.orange },
        { text: "    5 exercises · 90 min · self-contained", level: 1 },
    ];

    cardPanel(s, 0.25, 0.75, 4.6, 4.45, C.green);
    addBullets(s, leftMods, { x: 0.5, y: 0.82, w: 4.3, h: 4.3, fontSize: 11.5 });

    s.addShape("rect", { x: 4.9, y: 0.75, w: 0.03, h: 4.45, fill: { color: C.border }, line: { color: C.border } });

    cardPanel(s, 4.95, 0.75, 4.8, 4.45, C.blue);
    addBullets(s, rightMods, { x: 5.2, y: 0.82, w: 4.5, h: 4.3, fontSize: 11.5 });
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 01 ─ CUSTOMIZATION
// ══════════════════════════════════════════════════════════════════════════════
sectionSlide(pres, "01", "Customization &\nInstruction Files", "Always-on context · Prompt files · File-scoped rules");

{
    const s = contentSlide(pres, "Module 01 — Always-On Instructions");

    s.addText("Both files are automatically injected into every chat request as persistent context:", {
        x: 0.3, y: 0.72, w: 9.4, h: 0.3, fontFace: FONT, fontSize: 12, color: C.textMuted,
    });

    const files = [
        { path: ".github/copilot-instructions.md", scope: "VS Code · Visual Studio · JetBrains", accent: C.green },
        { path: "AGENTS.md", scope: "Copilot · Claude Code · any AI agent", accent: C.purple },
    ];
    files.forEach((f, i) => {
        const y = 1.1 + i * 1.05;
        cardPanel(s, 0.3, y, 9.4, 0.88, f.accent);
        s.addText(f.path, {
            x: 0.52, y: y + 0.06, w: 6.5, h: 0.32,
            fontFace: FONT_MONO, fontSize: 13.5, bold: true, color: C.textPrimary,
        });
        s.addText("Scope: " + f.scope, {
            x: 0.52, y: y + 0.44, w: 9.0, h: 0.3,
            fontFace: FONT, fontSize: 11, color: C.textMuted,
        });
    });

    s.addText("What to include:", {
        x: 0.3, y: 3.25, w: 4.5, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: C.green,
    });
    addBullets(s, [
        "Language & runtime (C# 12 / .NET 8)",
        "Naming conventions (PascalCase, _camelCase)",
        "Error handling (ArgumentNullException.ThrowIfNull)",
        "Security rules (no PII logging, IHttpClientFactory)",
        "Testing framework (xUnit + Moq patterns)",
    ], { x: 0.3, y: 3.57, w: 4.5, h: 1.6, fontSize: 11.5 });

    s.addText("What to avoid:", {
        x: 4.95, y: 3.25, w: 4.75, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: C.red,
    });
    addBullets(s, [
        { text: "Secrets or tokens (never hard-code!)", color: C.red },
        { text: "Frequently-changing content", color: C.orange },
        { text: "Very long documents (keep < 3 000 words)", color: C.orange },
        { text: "Broad vague rules with no examples", color: C.textMuted },
    ], { x: 4.95, y: 3.57, w: 4.75, h: 1.6, fontSize: 11.5 });
}

{
    const s = contentSlide(pres, "Module 01 — File-Based Instructions & Prompt Files");

    s.addText("File-Based Instructions", {
        x: 0.3, y: 0.73, w: 4.5, h: 0.34, fontFace: FONT, fontSize: 14, bold: true, color: C.blue,
    });
    s.addText("Scoped by file glob via applyTo front-matter — loaded only when matching file is active", {
        x: 0.3, y: 1.05, w: 4.5, h: 0.3, fontFace: FONT, fontSize: 10.5, color: C.textMuted, italic: true,
    });

    codeBlock(s, [
        "---",
        "applyTo: \"**/*.cs\"",
        "---",
        "",
        "# C# Standards",
        "- Use var only when type is obvious",
        "- XML docs on all public members",
        "- Suffix async methods with Async",
        "- Never .Result or .Wait() on Tasks",
    ], 0.3, 1.38, 4.5, 2.45, "csharp-standards.instructions.md");

    addBullets(s, [
        "Lives in .github/instructions/",
        "Example: csharp-standards.instructions.md",
        "Example: test-standards.instructions.md",
        "Supports ${file} and ${selection} variables",
    ], { x: 0.3, y: 3.88, w: 4.5, h: 1.2, fontSize: 11 });

    cardPanel(s, 5.0, 0.7, 4.75, 4.5, C.purple);
    s.addText("Prompt Files  (*.prompt.md)", {
        x: 5.12, y: 0.76, w: 4.5, h: 0.34, fontFace: FONT, fontSize: 14, bold: true, color: C.purple,
    });
    s.addText("On-demand reusable workflows — trigger from Chat with /", {
        x: 5.12, y: 1.08, w: 4.5, h: 0.3, fontFace: FONT, fontSize: 10.5, color: C.textMuted, italic: true,
    });

    addTable(s,
        ["Prompt file", "Trigger", "Variable"],
        [
            ["code-review", "/", "${selection}"],
            ["generate-tests", "/", "${selection}"],
            ["explain-legacy", "/", "${selection}"],
            ["sql-query", "/", "${input:query}"],
            ["modernize-dotnet", "/", "${selection}"],
        ],
        5.12, 1.42, 4.5, [2.0, 0.9, 1.6]
    );

    addBullets(s, [
        "Save to .github/prompts/ for team sharing",
        "Variables: ${selection} ${file} ${input:label}",
        "Access via / in Chat panel",
    ], { x: 5.12, y: 3.62, w: 4.5, h: 1.2, fontSize: 11 });
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 02 ─ VS CODE AGENT MODES
// ══════════════════════════════════════════════════════════════════════════════
sectionSlide(pres, "02", "VS Code Agent Modes", "Ask · Edit · Agent · Background — pick the right mode");

{
    const s = contentSlide(pres, "Module 02 — Choosing the Right Agent Mode");

    s.addText("Four modes with increasing autonomy. Start with Edit, reach for Agent or Background for complex tasks.", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted, italic: true,
    });

    addTable(s,
        ["Capability", "Ask", "Edit", "Agent", "Background"],
        [
            ["Answer questions", "✅", "✅", "✅", "✅"],
            ["Edit a single file", "❌", "✅", "✅", "✅"],
            ["Edit multiple files", "❌", "✅", "✅", "✅"],
            ["Run terminal commands", "❌", "❌", "✅", "✅"],
            ["Run tests and iterate", "❌", "❌", "✅", "✅"],
            ["Works while you're away", "❌", "❌", "❌", "✅"],
            ["Opens a PR automatically", "❌", "❌", "❌", "✅"],
            ["Uses MCP tools", "❌", "❌", "✅", "✅"],
            ["Runs in cloud / CI environment", "❌", "❌", "❌", "✅"],
        ],
        0.3, 1.08, 9.4, [3.6, 1.45, 1.45, 1.45, 1.45]
    );

    s.addText("Default to Agent Mode for autonomous multi-step work. Use Background Agent when you can afford to walk away for 10–30 min.", {
        x: 0.3, y: 4.82, w: 9.4, h: 0.38,
        fontFace: FONT, fontSize: 11, color: C.textMuted, italic: true,
    });
}

{
    const s = contentSlide(pres, "Module 02 — Background Agent");

    s.addText("Runs asynchronously in a cloud-sandboxed VM — creates a branch and opens a Draft PR when done", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted,
    });

    flowDiagram(s, [
        { label: "1. Write Issue", sub: "Clear AC in GitHub" },
        { label: "2. Assign", sub: "@copilot or assignee" },
        { label: "3. Agent works", sub: "Cloud VM" },
        { label: "4. Draft PR", sub: "Review diff + log" },
        { label: "5. Iterate", sub: "Comment → re-run" },
    ], 1.1, C.green);

    s.addText("What the agent does in the cloud:", {
        x: 0.3, y: 2.05, w: 4.5, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: C.textPrimary,
    });
    addBullets(s, [
        "Clones repo into sandboxed cloud VM",
        "Makes code changes across multiple files",
        "Runs dotnet build / dotnet test to verify",
        "Commits and opens a Draft PR",
        "Full session log attached to the PR",
    ], { x: 0.3, y: 2.4, w: 4.5, h: 2.5 });

    s.addText("Writing a great issue:", {
        x: 4.95, y: 2.05, w: 4.75, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: C.textPrimary,
    });
    codeBlock(s, [
        "## Context",
        "PermitsController has no GET by applicant.",
        "",
        "## Acceptance Criteria",
        "- [ ] GET /api/permits?applicantId={id}",
        "- [ ] Returns 200 with List<PermitSummaryDto>",
        "- [ ] Returns 404 if applicant not found",
        "- [ ] Includes xUnit test",
    ], 4.95, 2.4, 4.75, 2.55, "GitHub Issue template");
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 03 ─ MCP SERVERS
// ══════════════════════════════════════════════════════════════════════════════
sectionSlide(pres, "03", "MCP Servers", "Connect external tools · Azure DevOps · GitHub · Playwright");

{
    const s = contentSlide(pres, "Module 03 — Model Context Protocol (MCP)");

    s.addText("MCP lets Copilot call external tools — databases, APIs, repos, browsers — via a standardised JSON-RPC protocol", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted, italic: true,
    });

    flowDiagram(s, [
        { label: "VS Code", sub: "User" },
        { label: "Copilot Chat", sub: "Agent Mode" },
        { label: "MCP Host", sub: ".vscode/mcp.json" },
        { label: "MCP Servers", sub: "Tool registry" },
        { label: "External APIs", sub: "ADO · Azure · GH" },
    ], 1.1, C.green);

    const servers = [
        { name: "Azure DevOps MCP", cmd: "npx -y @microsoft/azure-devops-mcp", auth: "AZURE_DEVOPS_PAT", use: "Query work items, PRs, pipelines from Chat", accent: C.blue },
        { name: "Azure MCP", cmd: "npx -y @azure/mcp@latest server start", auth: "az login", use: "Manage Azure resources, list subscriptions", accent: C.cobalLight },
        { name: "GitHub Remote MCP", cmd: "https://api.githubcopilot.com/mcp/", auth: "GITHUB_TOKEN Bearer", use: "Query issues, PRs, repo metadata", accent: C.purple },
        { name: "Playwright MCP", cmd: "npx @playwright/mcp@latest", auth: "None", use: "Browser automation, locator generation", accent: C.green },
    ];

    servers.forEach((sv, i) => {
        const y = 2.1 + i * 0.72;
        cardPanel(s, 0.3, y, 9.4, 0.6, sv.accent);
        s.addText(sv.name, {
            x: 0.52, y: y + 0.04, w: 3.2, h: 0.26, fontFace: FONT, fontSize: 11.5, bold: true, color: C.textPrimary,
        });
        s.addText(sv.cmd, {
            x: 0.52, y: y + 0.3, w: 4.8, h: 0.22, fontFace: FONT_MONO, fontSize: 9, color: C.green,
        });
        s.addText("Auth: " + sv.auth, {
            x: 5.6, y: y + 0.04, w: 3.9, h: 0.24, fontFace: FONT, fontSize: 10, color: C.textMuted,
        });
        s.addText(sv.use, {
            x: 5.6, y: y + 0.3, w: 3.9, h: 0.24, fontFace: FONT, fontSize: 10.5, color: C.textSecond, italic: true,
        });
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 04 ─ COPILOT CLI  (4 slides)
// ══════════════════════════════════════════════════════════════════════════════
sectionSlide(pres, "04", "Copilot CLI", "AI agent in your terminal · interactive · programmatic · /fleet");

// Slide 1 — What is Copilot CLI?
{
    const s = contentSlide(pres, "Module 04 — What is GitHub Copilot CLI?");

    s.addText(
        "A standalone AI agent for your terminal — NOT the old gh copilot extension. " +
        "Invoked as: copilot",
        { x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted }
    );

    // two mode cards
    const modes = [
        {
            title: "Interactive Mode",
            cmd: "copilot",
            col: C.green,
            bullets: [
                "Conversational AI agent session",
                "Ask / Execute mode (default)",
                "Plan mode: Shift+Tab",
                "  — builds structured plan first",
                "  — clarifies scope before coding",
                "Steer mid-task, queue messages",
                "Escape to reject + give feedback",
            ],
        },
        {
            title: "Programmatic Mode",
            cmd: 'copilot -p "..." --allow-tool \'shell(git)\'',
            col: C.purple,
            bullets: [
                "Single prompt → completes → exits",
                "Pipe from a script: ./task.sh | copilot",
                "--allow-tool / --deny-tool flags",
                "--allow-all-tools for automation",
                "Suitable for CI pipelines & scripts",
                "ACP (Agent Client Protocol) support",
            ],
        },
    ];
    modes.forEach((m, i) => {
        const x = 0.3 + i * 4.9;
        cardPanel(s, x, 1.08, 4.6, 2.6, m.col);
        s.addText(m.title, { x: x + 0.12, y: 1.14, w: 4.36, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: m.col });
        s.addText(`→  ${m.cmd}`, { x: x + 0.12, y: 1.46, w: 4.36, h: 0.22, fontFace: FONT, fontSize: 9.5, color: C.textMuted, italic: true });
        addBullets(s, m.bullets.map(t => ({ text: t, level: t.startsWith("  ") ? 1 : 0 })),
            { x: x + 0.12, y: 1.7, w: 4.36, h: 1.9 });
    });

    s.addText("Slash commands (in interactive session):", {
        x: 0.3, y: 3.78, w: 4.6, h: 0.28, fontFace: FONT, fontSize: 12, bold: true, color: C.textPrimary,
    });
    addBullets(s, [
        { text: "/compact — compress context history", bold: false },
        { text: "/context — show token usage breakdown", bold: false },
        { text: "/model   — list models / switch model (default: Claude Sonnet 4.5)", bold: false },
        { text: "/mcp     — list connected MCP servers", bold: false },
        { text: "/fleet   — trigger parallel subagent execution", bold: true, color: C.orange },
    ], { x: 0.3, y: 4.08, w: 4.6, h: 1.15 });

    cardPanel(s, 5.2, 3.78, 4.55, 1.45, C.blue);
    s.addText("Available on all Copilot plans", {
        x: 5.32, y: 3.86, w: 4.3, h: 0.28, fontFace: FONT, fontSize: 11.5, bold: true, color: C.blue,
    });
    addBullets(s, [
        { text: "Linux, macOS, Windows (PowerShell / WSL)" },
        { text: "Requires: gh auth login" },
        { text: "Install: docs.github.com → Install Copilot CLI" },
        { text: "Context auto-compacts at 95% token limit" },
    ], { x: 5.32, y: 4.16, w: 4.3, h: 1.0 });
}

// Slide 2 — Use Cases
{
    const s = contentSlide(pres, "Module 04 — Copilot CLI: What Can It Do?");

    s.addText("Converse with it like a pair programmer — it reads, edits, runs commands, and interacts with GitHub.com on your behalf.", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted,
    });

    s.addText("Local Project Tasks", {
        x: 0.3, y: 1.1, w: 4.6, h: 0.28, fontFace: FONT, fontSize: 13, bold: true, color: C.green,
    });
    codeBlock(s, [
        "# Start a session",
        "copilot",
        "",
        "# Then just describe what you want:",
        "Change the background-color of H1 headings to dark blue",
        "",
        "Show me the last 5 changes to CHANGELOG.md",
        "",
        "Suggest improvements to PermitService.cs",
        "",
        "Commit the changes to this repo",
        "",
        'Use create-next-app + Tailwind to build a GitHub Actions',
        "dashboard for this project, then give me instructions to run it",
    ], 0.3, 1.42, 4.6, 3.38, "interactive session");

    s.addText("GitHub.com Tasks", {
        x: 5.1, y: 1.1, w: 4.6, h: 0.28, fontFace: FONT, fontSize: 13, bold: true, color: C.blue,
    });
    codeBlock(s, [
        "# In a copilot session:",
        "List my open PRs",
        "",
        "List all open issues assigned to me in my-org/permits-api",
        "",
        "I've been assigned issue #42 at github.com/my-org/",
        "permits-api/issues/42 — start working on it in a branch",
        "",
        "Add a SECURITY.md to this repo and open a pull request",
        "",
        "Check changes in PR #99 and report any serious errors",
        "",
        "Find good first issues for a new team member in my-org/permits-api",
        "",
        "Create a GitHub Actions workflow that runs ESLint on PRs",
        "and fails the check if errors are found — open a PR",
    ], 5.1, 1.42, 4.6, 3.38, "");

    s.addText("Plan Mode tip: Press Shift+Tab before complex tasks — Copilot asks clarifying questions and shows you the full plan before writing any code.", {
        x: 0.3, y: 4.88, w: 9.4, h: 0.32, fontFace: FONT, fontSize: 10.5, color: C.orange, italic: true,
    });
}

// Slide 3 — /fleet
{
    const s = contentSlide(pres, "Module 04 — /fleet: Parallel Subtask Execution");

    s.addText("/fleet breaks a large task into independent subtasks and runs them in parallel via subagents — each with its own context window.", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted,
    });

    flowDiagram(s, [
        { label: "Plan mode", sub: "Shift+Tab" },
        { label: "Build plan", sub: "clarify + approve" },
        { label: "/fleet dispatch", sub: "orchestrator runs" },
        { label: "Parallel agents", sub: "own context each" },
        { label: "Results merged", sub: "by orchestrator" },
    ], 1.08, C.orange);

    addTable(s,
        ["Enterprise Scenario", "Why /fleet helps"],
        [
            ["Generate xUnit tests for all 8 service classes", "Each class's tests are independent — all 8 written simultaneously"],
            ["Add XML doc comments to all public interfaces", "Interfaces are independent — each processed by a separate subagent"],
            ["Refactor logging to ILogger<T> in every service", "Most service classes don't depend on each other"],
            ["Create ADRs for 10 design decisions", "Each ADR document is independent and can be drafted in parallel"],
            ["Update appsettings.json across project folders", "Project folders are independent — updates run in parallel"],
        ],
        0.3, 2.0, 9.4, [3.5, 5.9]
    );

    addTable(s,
        ["Feature", "Description"],
        [
            ["Custom agents in /fleet", "Use @test-writer or @doc-author agents per subtask — specify in prompt"],
            ["Model per subtask", "Request a specific model for specific subtasks within the same /fleet run"],
            ["Premium request cost", "Each subagent interaction is billed separately — more requests than single-agent"],
            ["Best suited for", "Parallelizable, independent tasks — not inherently sequential workflows"],
        ],
        0.3, 4.12, 9.4, [2.4, 7.0]
    );
}

// Slide 4 — Customization
{
    const s = contentSlide(pres, "Module 04 — Copilot CLI: Customization");

    s.addText("Copilot CLI is extensible — connect it to your tools, define conventions, and create specialized agents.", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted,
    });

    addTable(s,
        ["Feature", "What it does", "How to use"],
        [
            ["Custom instructions", "Tell Copilot your stack, build commands, and conventions — all files combine", "Add instructions file to repo root"],
            ["MCP servers", "Connect Copilot CLI to Azure DevOps, Azure, GitHub, Playwright, and more", "Configure via /mcp or config file"],
            ["Custom agents", "Create specialized Copilot variants (e.g. @test-writer, @doc-author) ", "Define agent file, reference with @name"],
            ["Hooks", "Run shell commands at key points: pre/post agent steps (logging, validation)", "Configure in hooks config"],
            ["Copilot Memory", "Persistent understanding of repo conventions across sessions", "Auto-enabled — Copilot builds memories"],
            ["Skills", "Enhance CLI with specialized instructions, scripts, and resources", "Define skill files in repo"],
        ],
        0.3, 1.08, 9.4, [2.1, 3.9, 3.4]
    );

    s.addText("Tool permission model:", {
        x: 0.3, y: 3.68, w: 4.6, h: 0.28, fontFace: FONT, fontSize: 12, bold: true, color: C.textPrimary,
    });
    codeBlock(s, [
        "# Allow git commands only",
        "copilot -p \"...\" --allow-tool 'shell(git)'",
        "",
        "# Allow file edits only",
        "copilot -p \"...\" --allow-tool 'write'",
        "",
        "# Allow all except rm and git push",
        "copilot --allow-all-tools \\",
        "  --deny-tool 'shell(rm)' \\",
        "  --deny-tool 'shell(git push)'",
    ], 0.3, 3.98, 4.6, 1.35, "programmatic flags");

    s.addText("Security tips:", {
        x: 5.1, y: 3.68, w: 4.6, h: 0.28, fontFace: FONT, fontSize: 12, bold: true, color: C.orange,
    });
    addBullets(s, [
        { text: "Launch only from directories you trust", bold: false },
        { text: "Confirm trust prompt on startup — scope is heuristic", bold: false },
        { text: "For automation, run in a container/VM", bold: true, color: C.orange },
        { text: "Never --allow-all-tools near sensitive data", bold: false },
        { text: "Option 3 (Esc + feedback) steers without stopping", bold: false },
    ], { x: 5.1, y: 3.98, w: 4.6, h: 1.35 });
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 05 ─ APP MODERNIZATION
// ══════════════════════════════════════════════════════════════════════════════
sectionSlide(pres, "05", "App Modernization", ".NET Upgrade Assistant · Java 8 → 21 · Copilot-assisted migration");

{
    const s = contentSlide(pres, "Module 05 — .NET Upgrade Assistant with Copilot");

    s.addText(".NET Upgrade Assistant VS Code extension analyses legacy code and suggests incremental migration steps", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted,
    });

    addTable(s,
        ["Legacy Pattern (.NET Framework)", "Modern Pattern (.NET 8)", "Copilot Prompt"],
        [
            ["HttpConfiguration", "WebApplication.CreateBuilder()", "Rewrite as .NET 8 minimal API startup"],
            ["ApiController base class", "ControllerBase + [ApiController]", "Convert to minimal API endpoint"],
            ["SqlConnection (sync)", "SqlConnection + async/await", "Refactor to async OpenAsync/ExecuteReaderAsync"],
            ["Web.config", "appsettings.json + IConfiguration", "Migrate config to .NET 8 options pattern"],
            ["Global.asax", "Program.cs / Startup.cs", "Rewrite as .NET 8 Program.cs"],
            ["async void", "async Task", "Fix all async void methods to async Task"],
        ],
        0.3, 1.08, 9.4, [3.0, 3.0, 3.4]
    );

    flowDiagram(s, [
        { label: "Install UA", sub: "VS Code ext" },
        { label: "Analyse project", sub: "right-click" },
        { label: "Review report", sub: "breaking changes" },
        { label: "Copilot fixes", sub: "Agent Mode" },
        { label: "dotnet build", sub: "validate" },
    ], 4.12, C.yellow);

    addBullets(s, [
        { text: "Never use .Result or .Wait() — async all the way", color: C.red },
        { text: "Use ArgumentNullException.ThrowIfNull() for guard clauses", color: C.orange },
        { text: "Run dotnet build after each Copilot suggestion batch", color: C.green },
    ], { x: 0.3, y: 4.97, w: 9.4, h: 0.65, fontSize: 11 });
}

{
    const s = contentSlide(pres, "Module 05 — Java Modernization: 8 → 21");

    s.addText("Java Servlet → Spring Boot 3 · JUnit 4 → JUnit 5 · JDBC → Spring Data JPA", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted,
    });

    addTable(s,
        ["Java 8 / Legacy", "Java 21 / Spring Boot 3", "Copilot Prompt"],
        [
            ["HttpServlet + doGet/doPost", "@RestController + @GetMapping", "Convert servlet to Spring Boot 3 @RestController"],
            ["JDBC ResultSet boilerplate", "Spring Data JPA @Repository", "Replace JDBC with Spring Data JPA repository"],
            ["JUnit 4 + @RunWith", "JUnit 5 + @ExtendWith(Mockito)", "Migrate JUnit 4 tests to JUnit 5"],
            ["@Autowired on field", "Constructor injection", "Refactor field injection to constructor injection"],
            ["String concat SQL", "Parameterized PreparedStatement", "Fix SQL injection with PreparedStatement"],
        ],
        0.3, 1.08, 9.4, [2.8, 2.8, 3.8]
    );

    addTable(s,
        ["", ".NET Upgrade Assistant", "Java Modernization (Copilot Agent)"],
        [
            ["Primary tool", "UA VS Code extension", "Copilot Agent Mode"],
            ["Migration scope", "Binary + source analysis", "Source-level refactoring"],
            ["Output", "Upgrade report + auto-fix", "New Spring Boot project"],
        ],
        0.3, 4.08, 9.4, [2.5, 3.45, 3.45]
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 06 ─ QA & TESTING
// ══════════════════════════════════════════════════════════════════════════════
sectionSlide(pres, "06", "QA & Testing", "xUnit · Moq · Playwright · AI-generated test plans");

{
    const s = contentSlide(pres, "Module 06 — Testing Strategy: Three Layers");

    const layers = [
        { label: "E2E / UI Tests", sub: "Playwright MCP — browser automation", x: 2.5, w: 5.0, y: 1.15, bg: C.red },
        { label: "Integration Tests", sub: "Controller + DB + real dependencies", x: 1.4, w: 7.2, y: 2.05, bg: C.orange },
        { label: "Unit Tests (majority)", sub: "xUnit + Moq — Services · Validators · Mappers", x: 0.35, w: 9.3, y: 2.95, bg: C.green },
    ];
    layers.forEach(l => {
        s.addShape("rect", {
            x: l.x, y: l.y, w: l.w, h: 0.75,
            fill: { color: l.bg }, line: { color: l.bg },
        });
        s.addText(l.label, {
            x: l.x + 0.15, y: l.y + 0.04, w: l.w - 0.3, h: 0.32,
            fontFace: FONT, fontSize: 12.5, bold: true, color: C.white, align: "center",
        });
        s.addText(l.sub, {
            x: l.x + 0.15, y: l.y + 0.37, w: l.w - 0.3, h: 0.3,
            fontFace: FONT, fontSize: 10, color: C.white, align: "center",
        });
    });

    s.addText("Fewest", { x: 8.0, y: 1.28, w: 1.6, h: 0.28, fontFace: FONT, fontSize: 10, color: C.textMuted, align: "right" });
    s.addText("Some", { x: 8.0, y: 2.18, w: 1.6, h: 0.28, fontFace: FONT, fontSize: 10, color: C.textMuted, align: "right" });
    s.addText("Most", { x: 8.0, y: 3.08, w: 1.6, h: 0.28, fontFace: FONT, fontSize: 10, color: C.textMuted, align: "right" });

    addBullets(s, [
        { text: "Unit tests: 80% coverage target for services / repositories", color: C.green },
        { text: "Integration: minimum one test per controller endpoint (WebApplicationFactory)", color: C.orange },
        { text: "E2E: cover critical paths — permit submission, search, status check", color: C.red },
        { text: "Naming: MethodName_StateUnderTest_ExpectedBehavior", color: C.textMuted },
    ], { x: 0.3, y: 3.85, w: 9.4, h: 1.25, fontSize: 11.5 });
}

{
    const s = contentSlide(pres, "Module 06 — AI-Generated Test Plans");

    s.addText("Select a class → run /generate-tests → Copilot produces a full table then generates the test file", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted, italic: true,
    });

    addTable(s,
        ["#", "Method", "Scenario", "Expected Result", "Type"],
        [
            ["1", "Constructor", "Null repository", "ArgumentNullException", "Unit"],
            ["2", "Constructor", "Null logger", "ArgumentNullException", "Unit"],
            ["3", "SubmitAsync", "Valid request, no dupe", "Returns new PermitId", "Unit"],
            ["4", "SubmitAsync", "Null request", "ArgumentNullException", "Unit"],
            ["5", "SubmitAsync", "Duplicate detected", "DuplicatePermitException", "Unit"],
            ["6", "SubmitAsync", "Repository throws", "PermitStorageException", "Unit"],
            ["7", "GetStatusAsync", "Valid ID found", "Returns PermitStatus", "Unit"],
            ["8", "GetStatusAsync", "Null ID", "ArgumentNullException", "Unit"],
            ["9", "GetStatusAsync", "Unknown ID", "Returns null", "Unit"],
            ["10", "CancelAsync", "Valid existing permit", "Repository called once", "Unit"],
            ["11", "CancelAsync", "Null ID", "ArgumentNullException", "Unit"],
            ["12", "CancelAsync", "Permit not found", "KeyNotFoundException", "Unit"],
        ],
        0.3, 1.08, 9.4, [0.45, 1.65, 2.4, 2.55, 2.35]
    );

    s.addText("Copilot generates cases you'd skip under pressure: null logger, repository-throws, edge state conditions. Always review the plan before accepting.", {
        x: 0.3, y: 4.85, w: 9.4, h: 0.3, fontFace: FONT, fontSize: 11, color: C.textMuted, italic: true,
    });
}

{
    const s = contentSlide(pres, "Module 06 — Playwright UI Testing with MCP");

    s.addText("Connect Playwright MCP → Copilot navigates the browser, auto-generates reliable locators, writes specs", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted, italic: true,
    });

    s.addText("Workflow:", {
        x: 0.3, y: 1.07, w: 4.5, h: 0.29, fontFace: FONT, fontSize: 13, bold: true, color: C.textPrimary,
    });
    const wfSteps = [
        { n: "1", t: "Connect Playwright MCP", c: C.green },
        { n: "2", t: "Ask Copilot: 'Navigate to form'", c: C.blue },
        { n: "3", t: "Copilot controls browser", c: C.purple },
        { n: "4", t: "Ask: 'Write a submit test'", c: C.blue },
        { n: "5", t: "Spec generated with locators", c: C.green },
        { n: "6", t: "npx playwright test", c: C.orange },
    ];
    wfSteps.forEach((st, i) => {
        s.addShape("ellipse", { x: 0.3, y: 1.42 + i * 0.44, w: 0.3, h: 0.3, fill: { color: st.c }, line: { color: st.c } });
        s.addText(st.n, { x: 0.3, y: 1.42 + i * 0.44, w: 0.3, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.white, align: "center", valign: "middle" });
        s.addText(st.t, { x: 0.72, y: 1.44 + i * 0.44, w: 4.1, h: 0.3, fontFace: FONT, fontSize: 11, color: C.textSecond });
    });

    addBullets(s, [
        "Accessibility: axe-core WCAG 2.1 AA scan built in",
        "CI: npx playwright test --reporter=html",
        "Supports chromium, firefox, webkit in parallel",
    ], { x: 0.3, y: 4.1, w: 4.5, h: 1.1, fontSize: 11 });

    codeBlock(s, [
        "// Copilot-generated spec (MCP locators)",
        "test('submit permit form', async ({ page }) => {",
        "  await page.goto('/');",
        "  await page",
        "    .getByLabel('Full Name')",
        "    .fill('Jane Smith');",
        "  await page",
        "    .getByLabel('Email')",
        "    .fill('jane@example.com');",
        "  await page",
        "    .getByLabel('Permit Type')",
        "    .selectOption('BUILDING');",
        "  await page",
        "    .getByRole('button', { name: 'Submit' })",
        "    .click();",
        "  await expect(page.getByRole('alert'))",
        "    .toContainText('submitted successfully');",
        "});",
    ], 4.95, 0.85, 4.75, 4.3, "TypeScript (Playwright)");
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 07 ─ DATABASES
// ══════════════════════════════════════════════════════════════════════════════
sectionSlide(pres, "07", "Databases", "mssql extension · OntarioPermits schema · T-SQL patterns");

{
    const s = contentSlide(pres, "Module 07 — mssql Extension & Copilot SQL Patterns");

    s.addText("Connect to SQL Server / LocalDB from VS Code, then use Copilot Chat to write, explain and fix T-SQL", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted, italic: true,
    });

    s.addText("OntarioPermits Schema:", {
        x: 0.3, y: 1.08, w: 2.5, h: 0.28, fontFace: FONT, fontSize: 12.5, bold: true, color: C.cobalLight,
    });
    const tables = [
        { name: "Regions", cols: ["RegionId PK", "Name", "Code"], x: 0.3 },
        { name: "Applicants", cols: ["ApplicantId PK", "FullName", "Email"], x: 2.65 },
        { name: "Permits", cols: ["PermitId PK", "Status (CHECK)", "ApplicantId FK", "RegionId FK"], x: 5.0 },
        { name: "StatusHistory", cols: ["HistoryId PK", "PermitId FK", "ChangedAt", "OldStatus"], x: 7.35 },
    ];
    tables.forEach((t) => {
        cardPanel(s, t.x, 1.42, 2.2, 1.6, C.cobalLight);
        s.addText(t.name, { x: t.x + 0.12, y: 1.48, w: 1.96, h: 0.28, fontFace: FONT_MONO, fontSize: 11, bold: true, color: C.cobalLight });
        s.addShape("rect", { x: t.x, y: 1.76, w: 2.2, h: 0.02, fill: { color: C.border }, line: { color: C.border } });
        t.cols.forEach((col, ci) => {
            s.addText(col, { x: t.x + 0.12, y: 1.8 + ci * 0.24, w: 2.0, h: 0.22, fontFace: FONT_MONO, fontSize: 8.5, color: ci === 0 ? C.yellow : C.textSecond });
        });
    });

    addTable(s,
        ["Prompt Pattern", "Example"],
        [
            ["Natural language → SELECT", "\"Show all PENDING permits older than 30 days sorted by date\""],
            ["Explain query", "\"Explain what this query does for a non-developer\""],
            ["Fix SQL injection", "\"Refactor this dynamic SQL to use parameterized queries\""],
            ["Suggest indexes", "\"Suggest indexes to speed up this query\""],
            ["Generate stored procedure", "\"Create an SP to transition permit status with audit trail\""],
        ],
        0.3, 3.1, 9.4, [2.7, 6.7]
    );

    codeBlock(s, [
        "-- Copilot suggestion: overdue pending permits",
        "SELECT p.PermitId, a.FullName, p.PermitType, p.SubmittedAt",
        "FROM   Permits p JOIN Applicants a ON p.ApplicantId = a.ApplicantId",
        "WHERE  p.Status = 'PENDING' AND DATEDIFF(day, p.SubmittedAt, GETDATE()) > 30",
        "ORDER  BY p.SubmittedAt;",
    ], 0.3, 4.52, 9.4, 0.72, "T-SQL");
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 08 ─ MODELS & CONTEXT
// ══════════════════════════════════════════════════════════════════════════════
sectionSlide(pres, "08", "Models & Context", "23 models · multiplier tiers · context management");

{
    const s = contentSlide(pres, "Module 08 — Available Models (March 2026)");

    s.addText("23 models across tiers. Premium multiplier controls request cost against your monthly allowance.", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted,
    });

    addTable(s,
        ["Multiplier", "Models", "Best For"],
        [
            ["0×  (Free)", "GPT-4o · GPT-4.1 · GPT-5 mini · Raptor mini", "Everyday tasks — no quota consumed"],
            ["0.25–0.33×", "Grok Code Fast · Claude Haiku 4.5 · Gemini 3 Flash · GPT-5.1-Mini", "Fast responses, large-scale summarisation"],
            ["1×", "Claude Sonnet 4/4.5/4.6 · Gemini 2.5/3.1 Pro · GPT-5.1/5.2/5.3", "Balanced coding + reasoning — daily workhorse"],
            ["3×", "Claude Opus 4.5 · Claude Opus 4.6", "Deep architecture, complex multi-file reasoning"],
            ["30× (preview)", "Claude Opus 4.6 fast mode", "Ultra-fast Opus — verify billing before use"],
        ],
        0.3, 1.08, 9.4, [1.3, 4.6, 3.5]
    );

    statCallout(s, "23", "Models Available", 0.3, 3.5, C.green);
    statCallout(s, "1M", "Max Context (Gemini/GPT4.1)", 2.6, 3.5, C.blue);
    statCallout(s, "200k", "Claude Context Window", 4.9, 3.5, C.purple);
    statCallout(s, "0x", "Zero-cost free-tier models", 7.1, 3.5, C.bgCard);

    s.addText("Always verify at: docs.github.com/en/copilot/reference/ai-models/supported-models", {
        x: 0.3, y: 4.85, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11, color: C.yellow, italic: true,
    });
}

{
    const s = contentSlide(pres, "Module 08 — Model Selection Guide");

    addTable(s,
        ["Task", "Recommended Model", "Why"],
        [
            ["Everyday completions / quick Q&A", "GPT-4o / GPT-4.1", "0x cost — use freely without quota"],
            ["Refactoring a single file", "Claude Haiku 4.5 (0.33x)", "Fast, inexpensive for focused edits"],
            ["Multi-file feature implementation", "Claude Sonnet 4.6 (1x)", "Strong instruction-following for complex work"],
            ["Analyse 100k+ token codebase", "Gemini 3.1 Pro (1x)", "1M context — handles entire large repos"],
            ["Architecture design / ADRs", "Claude Opus 4.6 (3x)", "Deepest reasoning — worth the cost"],
            ["Test generation", "Claude Sonnet 4.6 (1x)", "Reliable naming + Arrange/Act/Assert structure"],
            ["SQL query generation", "GPT-4o (0x) or Sonnet", "Both handle T-SQL well; 0x for routine queries"],
            ["Legacy code explanation", "Claude Sonnet 4.6 (1x)", "Superior contextual narrative explanation"],
            ["PR summary / documentation", "GPT-5 mini (0x)", "Fast, accurate, free"],
        ],
        0.3, 0.83, 9.4, [3.2, 2.7, 3.5]
    );

    s.addText("The 30-second rule: if you haven't switched models, GPT-4o is your default. For extended reasoning, switch manually.", {
        x: 0.3, y: 4.72, w: 9.4, h: 0.5,
        fontFace: FONT, fontSize: 11, color: C.textMuted, italic: true,
    });
}

{
    const s = contentSlide(pres, "Module 08 — Context Management");

    s.addText("Copilot's context window is finite. What you include determines answer quality.", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted,
    });

    addTable(s,
        ["Context Source", "How to Add", "Approx. Tokens"],
        [
            ["copilot-instructions.md", "Automatic — always injected", "500–3 000"],
            ["Active editor file", "Automatic when file is open", "2 000–10 000"],
            ["#file attachment", "Type # in Chat → select file", "Varies"],
            ["#codebase", "Copilot indexes workspace", "Semantic chunks"],
            ["MCP tool results", "Agent mode only, per tool call", "500–2 000"],
            ["Conversation history", "Accumulates per session", "Can overflow!"],
        ],
        0.3, 1.08, 9.4, [2.5, 3.5, 3.4]
    );

    s.addText("Signs of context overflow:", {
        x: 0.3, y: 3.27, w: 4.5, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: C.red,
    });
    addBullets(s, [
        { text: "Copilot forgets earlier parts of conversation", color: C.red },
        { text: "Starts ignoring copilot-instructions.md conventions", color: C.red },
        { text: "Generic answers replace project-specific ones", color: C.orange },
        { text: "Fix: start a new chat + re-attach key files with #", color: C.green },
    ], { x: 0.3, y: 3.6, w: 4.5, h: 1.5, fontSize: 11.5 });

    s.addText("Best practices:", {
        x: 4.95, y: 3.27, w: 4.75, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: C.green,
    });
    addBullets(s, [
        { text: "Keep copilot-instructions.md under 3 000 words", color: C.green },
        { text: "Use #file to include only relevant files", color: C.green },
        { text: "Start new sessions for unrelated tasks", color: C.blue },
        { text: "Prefer smaller focused prompts over one giant message", color: C.blue },
        { text: "Use /clear to reset chat while keeping instructions", color: C.textMuted },
    ], { x: 4.95, y: 3.6, w: 4.75, h: 1.5, fontSize: 11.5 });
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 09 ─ COPILOT ON GITHUB.COM
// ══════════════════════════════════════════════════════════════════════════════
sectionSlide(pres, "09", "Copilot on GitHub.com", "Coding agents · AI code review · Copilot Spaces");

{
    const s = contentSlide(pres, "Module 09 — Coding Agents on GitHub.com");

    s.addText("Assign issues to @copilot — it works asynchronously in the cloud and opens a PR when done", {
        x: 0.3, y: 0.73, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11.5, color: C.textMuted, italic: true,
    });

    s.addText("Three ways to assign a task to the Copilot Coding Agent:", {
        x: 0.3, y: 1.08, w: 4.5, h: 0.28, fontFace: FONT, fontSize: 12.5, bold: true, color: C.textPrimary,
    });
    const methods = [
        { label: "Set as Assignee", desc: "Set Copilot as assignee on any open issue", accent: C.green },
        { label: "@copilot mention", desc: "Comment @copilot implement this feature", accent: C.blue },
        { label: "/ask slash command", desc: "Use /ask copilot in issue body", accent: C.purple },
    ];
    methods.forEach((m, i) => {
        cardPanel(s, 0.3, 1.42 + i * 0.72, 4.5, 0.6, m.accent);
        s.addText(m.label, { x: 0.52, y: 1.47 + i * 0.72, w: 4.1, h: 0.25, fontFace: FONT, fontSize: 12, bold: true, color: C.textPrimary });
        s.addText(m.desc, { x: 0.52, y: 1.72 + i * 0.72, w: 4.1, h: 0.22, fontFace: FONT, fontSize: 10.5, color: C.textMuted });
    });

    addTable(s,
        ["Agent Can Do", "Agent Cannot Do"],
        [
            ["Read all repo files + history", "Access external systems directly"],
            ["Run tests and fix failures", "Merge PRs (always needs human approval)"],
            ["Create branches + commit", "Access secrets unless provided"],
            ["Iterate based on your PR comments", "Make architectural decisions alone"],
        ],
        0.3, 3.6, 4.5, [2.25, 2.25]
    );

    cardPanel(s, 4.95, 0.7, 4.75, 4.5, C.orange);
    s.addText("Enterprise Governance Notes", { x: 5.07, y: 0.78, w: 4.5, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: C.orange });
    addBullets(s, [
        "Agents can be restricted at org / enterprise level",
        "All activity logged in the PR session timeline",
        "Draft PR must be reviewed + approved before merge",
        "Branch protection rules still apply to agent commits",
        "Agent cannot access production environments",
        "Copilot Enterprise required for private repos",
    ], { x: 5.07, y: 1.12, w: 4.55, h: 2.5, fontSize: 11.5 });

    s.addText("Agent PR review checklist:", { x: 5.07, y: 3.68, w: 4.55, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: C.textPrimary });
    addBullets(s, [
        "Business logic correctness — human eyes required",
        "xUnit test coverage present",
        "No hardcoded secrets in diff",
        "Follows copilot-instructions.md conventions",
    ], { x: 5.07, y: 3.98, w: 4.55, h: 1.15, fontSize: 11 });
}

{
    const s = contentSlide(pres, "Module 09 — AI Code Review & Copilot Spaces");

    s.addText("AI Code Review", { x: 0.3, y: 0.73, w: 4.5, h: 0.36, fontFace: FONT, fontSize: 14.5, bold: true, color: C.blue });
    addBullets(s, [
        { text: "Enable: repo Settings → Code review → AI", bold: true },
        { text: "Auto-reviews every PR with inline comments" },
        { text: "Customise with .github/copilot-review-instructions.md" },
        { text: "Checks: security issues, null refs, missing tests" },
        { text: "Does NOT merge — gating needs human approval" },
    ], { x: 0.3, y: 1.12, w: 4.5, h: 2.0, fontSize: 12 });

    codeBlock(s, [
        "# Security",
        "Flag ALL SQL string concatenation as high severity.",
        "# Enterprise Standards",
        "Require XML doc on all public members.",
        "# .NET 8",
        "Flag any .Result or .Wait() on Tasks.",
        "# Testing",
        "Flag classes without a corresponding test file.",
    ], 0.3, 3.2, 4.5, 1.95, "copilot-review-instructions.md");

    cardPanel(s, 4.95, 0.7, 4.75, 4.5, C.purple);
    s.addText("Copilot Spaces", { x: 5.07, y: 0.78, w: 4.5, h: 0.36, fontFace: FONT, fontSize: 14.5, bold: true, color: C.purple });
    s.addText("Persistent, curated knowledge context shared across a team", {
        x: 5.07, y: 1.14, w: 4.5, h: 0.28, fontFace: FONT, fontSize: 11, color: C.textMuted, italic: true,
    });
    addBullets(s, [
        { text: "Create at github.com → Copilot → Spaces", bold: true },
        { text: "Add: repos, files, URLs, Jira, Confluence" },
        { text: "Share with team — everyone has same context" },
        { text: "Access from VS Code via GitHub Remote MCP" },
    ], { x: 5.07, y: 1.45, w: 4.5, h: 1.6, fontSize: 12 });

    addTable(s,
        ["Use Case", "Knowledge Source"],
        [
            ["Platform architecture Q&A", "ADR docs + design wikis + Confluence"],
            ["Modernization team onboarding", "Module 05 docs + samples + guides"],
            ["Enterprise standards reference", "copilot-instructions.md + security policy"],
        ],
        5.07, 3.2, 4.55, [2.5, 2.05]
    );

    logoPlaceholder(s, 5.07, 4.55, 4.55, 0.5, "[ Add GitHub Spaces screenshot / logo ]");
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 10 ─ HANDS-ON LAB
// ══════════════════════════════════════════════════════════════════════════════
sectionSlide(pres, "10", "Hands-On Lab", "5 exercises · 90 minutes · self-contained");

{
    const s = contentSlide(pres, "Module 10 — Workshop Lab: 5 Exercises");

    addTable(s,
        ["Exercise", "Time", "Skills Practiced", "Key Outcome"],
        [
            ["01 — Customization", "15 min", "copilot-instructions.md, prompt files", "Create + use generate-controller.prompt.md"],
            ["02 — Background Agent", "20 min", "GitHub issue writing, @copilot assignment", "Agent opens PR for a new API endpoint"],
            ["03 — GitHub Remote MCP", "15 min", "MCP connection, repo queries from Chat", "Query live issues + PRs without leaving VS Code"],
            ["04 — App Modernization", "15 min", ".NET Upgrade Assistant, async refactoring", "Migrate HttpConfiguration to .NET 8"],
            ["05 — AI-Assisted Testing", "15 min", "/generate-tests, xUnit + Moq", "12-case test suite generated + all passing"],
        ],
        0.3, 0.83, 9.4, [2.0, 0.9, 3.2, 3.3]
    );

    s.addText("Lab Progress Tracker:", {
        x: 0.3, y: 3.9, w: 9.4, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: C.textPrimary,
    });
    ["01", "02", "03", "04", "05"].forEach((n, i) => {
        const x = 0.55 + i * 1.82;
        s.addShape("ellipse", { x, y: 4.28, w: 0.48, h: 0.48, fill: { color: C.bgCard }, line: { color: C.border, pt: 1.5 } });
        s.addText(n, { x, y: 4.28, w: 0.48, h: 0.48, fontFace: FONT, fontSize: 13, bold: true, color: C.textMuted, align: "center", valign: "middle" });
        if (i < 4) {
            s.addShape("rect", { x: x + 0.48, y: 4.48, w: 1.32, h: 0.05, fill: { color: C.border }, line: { color: C.border } });
        }
    });

    s.addText("Prerequisites:  GitHub account + Copilot licence  ·  VS Code + Copilot extensions  ·  .NET 8 SDK  ·  Node.js 20+  ·  GitHub CLI", {
        x: 0.3, y: 5.0, w: 9.4, h: 0.28, fontFace: FONT, fontSize: 11, color: C.textMuted,
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// CLOSING SLIDE
// ══════════════════════════════════════════════════════════════════════════════
{
    const s = pres.addSlide();
    s.background = { color: C.bgCanvas };

    s.addShape("rect", { x: 0, y: 0, w: 0.3, h: H, fill: { color: C.green }, line: { color: C.green } });
    s.addShape("rect", { x: 0.3, y: 0, w: 0.05, h: H, fill: { color: C.purple }, line: { color: C.purple } });

    // Logo placeholder (closing)
    logoPlaceholder(s, 7.7, 0.4, 2.0, 1.0, "[ Add GitHub Copilot logo ]");

    s.addText("Thank You", {
        x: 0.55, y: 0.85, w: 7.5, h: 1.0,
        fontFace: FONT, fontSize: 52, bold: true, color: C.textPrimary, align: "left",
    });
    s.addText("GitHub Copilot Advanced Workshop", {
        x: 0.55, y: 1.9, w: 7.5, h: 0.48,
        fontFace: FONT, fontSize: 19, color: C.green, align: "left",
    });

    s.addShape("rect", { x: 0.55, y: 2.55, w: 9.0, h: 0.03, fill: { color: C.border }, line: { color: C.border } });

    const links = [
        { label: "Workshop Repo", value: "github.com/your-org/GitHubCopilot-AdvancedRepo" },
        { label: "Copilot Docs", value: "docs.github.com/en/copilot" },
        { label: "Supported Models", value: "docs.github.com/en/copilot/reference/ai-models" },
        { label: "Copilot CLI", value: "docs.github.com/en/copilot/using-github-copilot/cli" },
    ];
    links.forEach((l, i) => {
        s.addText(l.label + ":", {
            x: 0.55, y: 2.7 + i * 0.42, w: 2.1, h: 0.36,
            fontFace: FONT, fontSize: 12.5, color: C.textMuted, bold: true,
        });
        s.addText(l.value, {
            x: 2.7, y: 2.7 + i * 0.42, w: 7.0, h: 0.36,
            fontFace: FONT_MONO, fontSize: 11.5, color: C.textLink,
        });
    });

    s.addShape("rect", { x: 0, y: H - 0.3, w: W, h: 0.3, fill: { color: C.bgCard }, line: { color: C.bgCard } });
    s.addShape("rect", { x: 0, y: H - 0.3, w: 0.3, h: 0.3, fill: { color: C.green }, line: { color: C.green } });
    s.addText("March 2026  |  Enterprise Workshop  |  github.com/copilot", {
        x: 0.45, y: H - 0.3, w: 9.2, h: 0.3,
        fontFace: FONT, fontSize: 9, color: C.textMuted, align: "left", valign: "middle",
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// WRITE FILE
// ─────────────────────────────────────────────────────────────────────────────
const outPath = "GitHub-Copilot-Advanced-Workshop.pptx";
pres.writeFile({ fileName: outPath })
    .then(() => console.log("Presentation written to: " + outPath))
    .catch((err) => { console.error("Error:", err); process.exit(1); });
