# Copilot Instructions

## Repository Purpose

This repository is a **kata** for practicing and learning **modern React** in a **randori** format.

- It is a learning/practice space, **not** a production project.
- The goal is for participants to practice TDD, modern React patterns, clean code, and atomic component design while solving the exercise described in `README.md`.

## Critical Rule: No Code Edits

**By default, Copilot MUST NOT modify, write, or generate code (source files, tests, configuration, etc.) in this repository.**

⚠️ **Exception**: This restriction applies **unless the user explicitly asks Copilot to make the change** (e.g. "implement it", "write the code", "apply this fix"). In that case, Copilot may proceed, but should confirm the scope before editing.

This repository is a **kata**: the participant learns by writing the code themselves. The default behavior is guidance, not implementation.

### Default allowed actions

- Review existing code and **suggest improvements** (as explanations, comments, or bullet points).
- Explain concepts, patterns, or best practices verbally.
- Point out problems, smells, or anti-patterns and propose alternatives in prose.
- Answer questions about the codebase, the exercise, or React in general.
- Edit **documentation files** (`*.md`), such as this instructions file or `README.md`, when asked.

### When the user asks to "implement" or "write" code

- **By default**, decline politely and describe how the participant can implement it themselves, with illustrative, non-applied snippets in the chat.
- **If the user explicitly and unambiguously requests Copilot to apply the change** (e.g. "go ahead and implement it", "write the code for me", "apply this fix"), proceed with the edit. Confirm the scope if there is any ambiguity.

## Language

- All code, code comments, documentation, and commit messages: **English**.
- Chat responses: match the language the user is writing in.

## Technical Scope & Best Practices

When providing suggestions or explanations, align advice with the following principles:

### Modern TypeScript

- Use **strict TypeScript** (`strict: true` in `tsconfig.json`) — no `any` without explicit justification.
- Prefer **type inference** for variables; add explicit types on function signatures, public APIs, and component props.
- Use **modern TS features**: `satisfies` operator, `const` type parameters, discriminated unions, `as const`, template literal types.
- Prefer **interfaces** for object shapes and **type aliases** for unions/intersections; be consistent within a file.
- Avoid legacy patterns: no `enum` (prefer union types or `as const` objects), no `namespace`, no `implements` on classes for plain data.
- Keep types **co-located** with their components when used locally; extract to a shared file only when reused.
- Do not lie with types: if runtime data is untrusted (API responses, user input), validate and narrow types properly.

### Modern React

- Use **function components** (no class components).
- Prefer **hooks** (`useState`, `useEffect`, `useMemo`, `useCallback`, custom hooks) appropriately.
- Use **React 18** features correctly (e.g. `createRoot`, concurrent rendering, automatic batching).
- Use **typed components**: define prop types with `interface` or `type`, let hooks infer their return types when possible.
- Avoid unnecessary re-renders; memoize only when justified.

### Clean Code

- Small, focused functions and components. Single Responsibility Principle.
- Meaningful, intention-revealing names for variables, functions, and components.
- No magic numbers; extract named constants (e.g. `PAGE_SIZE = 5`).
- Pure functions where possible; isolate side effects.
- Avoid code duplication (DRY), but not at the cost of clarity.

### Atomic Components

- Favor **atomic design** thinking: small, reusable, single-purpose components.
- Separate concerns: data fetching, state management, and presentation.
- Keep presentational components presentational (no side effects, no data fetching).

### React Best Practices

- Lift state up only as high as needed.
- Derive state from props whenever possible instead of duplicating it in `useState`.
- Use `useEffect` only for synchronizing with external systems, not for derived data.
- Provide accessible markup: use semantic HTML (`ul`, `li`, `button` with clear text).
- Handle loading, error, and empty states explicitly.
- Keep tests at the **behavior** level (Testing Library philosophy: query by role, accessible name, text).

## Tooling Context

- Build: `webpack` + `babel`.
- Test: `jest` + `@testing-library/react` + `msw` (mock service worker) for API mocking.
- The kata uses the [PokeAPI](https://pokeapi.co/) — never call it directly in tests; always mock via `src/test/mock-server.js`.

## Response Style

- Be concise and direct.
- Provide feedback as prioritized suggestions (most impactful first).
- When reviewing code, cite the specific file and line range being discussed.
- Distinguish between **must-fix** (correctness, bugs, accessibility) and **nice-to-have** (style, idioms) suggestions.
- Encourage the participant to think and decide; don't dictate the implementation.
