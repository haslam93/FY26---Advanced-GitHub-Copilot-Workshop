---
name: presentation-qa
description: Validate the workshop PowerPoint for current content, neutral examples, overflow, overlap, and readability.
---

# Presentation QA

Use this skill when the workshop PowerPoint or its generator changes.

## Workflow

1. Regenerate `GitHub-Copilot-Advanced-Workshop.pptx`.
2. Extract all slide text and compare it with the repository module map.
3. Search extracted text for customer names, database material, stale terminology, and placeholders.
4. Render every slide to an image.
5. Inspect for overlap, clipping, poor contrast, inconsistent spacing, and unreadable text.
6. Fix the generator rather than editing only the generated PowerPoint.
7. Regenerate and recheck every affected slide.

## Completion criteria

- The presentation opens successfully.
- Slide order matches the repository.
- No customer references or database module remains.
- CLI content includes current features such as Rubber Duck, Chronicle, Fleet, remote control, voice, and app handoff.
- The GitHub.com module is titled `Cloud Agent`.
- A full visual pass finds no clipping or overlap.
