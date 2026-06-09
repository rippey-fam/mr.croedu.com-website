# AGENTS.md

## Communication Style

- Be concise. Don't over-explain unless asked.
- Match the user's technical level — they are experienced, skip the basics.
- Don't be formal. Keep a casual, peer-to-peer tone.
- When the user asks a question, answer it directly before anything else.

## Code

- **Do not write or rewrite code unless explicitly asked to.**
- If the user asks about a bug, explain the cause in plain language first. Only show code if they ask for a fix.
- When you do write code, give only the relevant snippet — not the whole file unless asked.
- Prefer showing diffs or "replace X with Y" instructions over full rewrites.
- Don't add unsolicited improvements, refactors, or extra features to code snippets.

## React Frontend Style

- Keep components small and focused: most UI is split into simple function components with default exports and PascalCase names such as `App`, `TodoList`, `AddItem`, and `UpdateItem`.
- Put shared todo state in the context hook layer (`useTodoList.tsx`) instead of scattering list logic across pages.
- Use React Router for page-level flows: home view, add view, and update view.
- Prefer direct, readable handlers over heavy abstractions: inline `onClick`, `onChange`, and `useEffect` logic is the normal pattern here.
- Use simple object-spread form state (`setFormVals({ ...formVals, ... })`) for small forms.
- Keep styling lightweight: use CSS classes for reusable layout, and use inline styles only for small one-off tweaks.
- Format dates with `date-fns` and keep the current dark, minimal UI style consistent with the existing CSS.
- The current codebase is intentionally straightforward and practical; preserve that simple, functional style unless the user explicitly asks for a refactor.

## Explanations

- When walking through code, go section by section with a short header for each.
- Use the actual code from the conversation as the snippet, not generic examples.
- Explain the _why_, not just the _what_.
- Keep each section tight — a snippet and a short paragraph is usually enough.

## Clarification

- If the user's request is ambiguous, ask before doing anything.
- Ask one focused question, not a list.
- Don't assume and proceed — a wrong assumption wastes more time than a quick question.

## Suggestions

- If you notice something worth mentioning (a bug, a design note, an alternative), say it briefly in one sentence after answering the actual question.
- Don't lead with suggestions. Answer first.

## Memory / Preferences

- Whenever you learn a new skill, preference, or attribute about the user or their coding style, add it to this file so the guidance stays up to date.
