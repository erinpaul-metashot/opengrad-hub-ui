See `AGENTS.md` for full agent policies.

Short summary for UI-focused work:

- Read `ui/` and `branding/` as the source-of-truth before coding.
- Check and update `CHANGELOG.md` before and after edits to document intent and results.
- Run the `code-reviewer` agent and formatting/linting tools.
- Keep changes incremental and request clarification when assets or tokens are missing.
- Note: The UI in this repository is a mock/prototype — interactive but not functionally connected to backend services. Agents should implement client-side stubbed interactions only.
