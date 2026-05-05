<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## UI Work Guidelines for Agents

Agents performing UI work should follow these rules to ensure consistent, documented, and low-risk changes:

- Source-of-truth: Always read files under `ui/` and `branding/` before making UI changes.
- Check the changelog: Search `CHANGELOG.md` for recent agent activity to avoid duplicate work.
- Changelog entries: Add an entry to `CHANGELOG.md` both BEFORE starting and AFTER completing changes. Use the format:
	- `YYYY-MM-DD | agent:<name> | START | short summary | files: <comma-separated paths>`
	- `YYYY-MM-DD | agent:<name> | DONE  | short summary | files: <comma-separated paths>`
- Make small, incremental edits and prefer opening a PR for non-trivial changes.
- Run pre-commit checks: formatters, linters, and the `code-reviewer` agent.
- Accessibility: Run quick a11y checks on changes affecting layout, color contrast, or navigation.
- Ask before replacing brand tokens: If `branding/` lacks assets or token definitions, request clarification.
- Do not start the local dev server: The developer may already have `npm run dev` running on localhost:3000 for visual testing — avoid starting or restarting a server. Use `npm run build` to test production builds instead of launching another dev server.

## CHANGELOG Usage

- Purpose: `CHANGELOG.md` is the canonical agent-visible log of automated edits and human-reviewed agent actions.
- Policy: Agents must append audit-friendly entries and must not make silent, undocumented edits.
- Example entries:
	- `2026-05-05 | agent:ui-bot | START | Drafted UI guidelines | files: AGENTS.md`
	- `2026-05-05 | agent:ui-bot | DONE  | Added UI guidelines and changelog template | files: AGENTS.md, CHANGELOG.md, CLAUDE.md`

## Review and Commit Flow

- After making edits:
	- Run the `code-reviewer` agent.
	- Run formatters (`npm run format` / `prettier`) and linters (`npm run lint`) where available.
	- Create small PRs with clear descriptions referencing `ui/` and `branding/` docs.
	- If edits are large or risky, open an issue first.

## Mock UI Policy

- This repository's UI deliverables are interactive mock prototypes only: visually complete and interactive but not connected to real backend services.
- Agents must NOT implement backend logic, authentication, data persistence, or external API integrations when building UI mocks.
- Interactivity should be client-side only (stubbed navigation, simulated data, local state). Use realistic placeholder data and clearly label stubbed flows.
- Tag changelog entries for mock work using `MOCK-START` and `MOCK-DONE` (see `CHANGELOG.md`), and include `MOCK` in PR titles or descriptions when appropriate.
- If stakeholders request production-ready behavior or persistent integrations, open an issue and obtain explicit approval before implementing.

## Image Analysis & Subagent Usage

When UI work references images (assets under `ui/references/`, `branding/`, or attached images), agents should use the global image-analysis subagent `image-analyzer` to generate structured analyses that drive mock implementations:

- Detect images referenced by the UI spec or provided by the user.
- Call the global subagent named `image-analyzer` with the image path or with a `scan` instruction (for example: `scan ui/references/login-hero.png`). Prefer the harness-level subagent API so the global agent executes with the model configured in your environment.
- Expect the subagent to write `ui/references/<image-base>-analysis.md`. If that file exists, consume it instead of re-analyzing the image.
- If the subagent reports an unavailable model or returns `TOOL-REQUIRED`, create a placeholder `ui/references/<image-base>-analysis.md` containing `MODEL_ANALYSIS_PENDING` and append a `MOCK-START` entry to `CHANGELOG.md` describing the manual analysis required.
- After analysis is available, use the analysis sections (summary, palette, suggested components, interactions, accessibility notes) as the primary input when generating mock UI pages and components.
- Require the `frontend-design` and `ui-ux-pro-max` skills (or equivalent) for design work that consumes image analyses.
- Tag PRs and changelog entries with `MOCK` when the change is a mock-only UI implementation.

Agents should not call external image services directly; always route image analysis through the global `image-analyzer` subagent so model selection, privacy checks, and fallbacks are centralized.
