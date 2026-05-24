# Context

## Glossary

**Server** — A self-hosted LLM backend the user connects to. Each server has a URL, optional API key, optional system prompt, a default model, and a default temperature. The server exposes an OpenAI-compatible Chat Completions API.

**Thread** — A single conversation with a server. Each server has its own set of threads. A thread has a name, a list of messages, a selected model, and a temperature override. Switching threads changes the conversation context.

**Message** — A single message in a thread. Has a role (user or assistant), content (text), and a timestamp. User messages can be edited only when they are the most recent message in the thread. Assistant messages can be regenerated.

**Model** — The specific LLM model used for a thread (e.g. `llama-3.1-8b`, `mistral-7b`). Each server has a default model. Each thread can override it independently.

**Temperature** — A numerical value controlling randomness in the model's output. Each server has a default temperature. Each thread can override it independently.

**System prompt** — Instructions sent to the model before the conversation starts. Configured at the server level (applies to all threads) and can be overridden at the thread level.

**Streaming** — The response is sent token-by-token from the server and rendered incrementally in the UI. The user can stop generation mid-stream.

**Regenerate** — The action of asking the server to produce a new response for the most recent assistant message, based on the existing conversation history.

**Edit** — Modifying the most recent user message in a thread, then resubmitting it (which replays the conversation from that point forward).

## Architecture

**Signals** — Fine-grained reactivity via `@preact/signals-react`. Each Model class owns its own signal properties. No centralized store — state is distributed across per-instance reactive classes.

**Navigation** — Expo Router for file-based routing.

**UI** — React Native Reanimated for animations and Shopify's Restyle for a theme-driven component system. Custom-built chat UI, no generic component library.

**HTTP** — Built-in `fetch` for all server communication. No HTTP client library.

**Database** — `expo-sqlite` with Drizzle ORM for type-safe schema definitions, queries, and migrations.

**Markdown rendering** — `react-native-enriched-markdown` from Software Mansion for rendering markdown responses (code blocks, headers, lists, etc.).

**Settings persistence** — Global app settings (theme) stored in SQLite, not a separate file system. One storage system for everything.

**Error handling** — Graceful error messages shown inline in the thread. Auto-retry failed requests once. No offline queue.

**Thread management** — ChatGPT-style UX: new thread button, long-press to rename, swipe to delete.

**Code organization** — Hybrid: feature-sliced top level (`features/servers/`, `features/threads/`, `features/chat/`) with shared utilities in `src/shared/`.

**App launch** — Splash screen → server check → conditional onboarding. First launch: onboarding flow. Subsequent launches: jump to the last-used server and thread. If the last-used thread no longer exists, fall back to the server's thread list.

**Input bar** — Text only for now, but structured for future image support. Input bar layout includes an attachment button slot.

**Keyboard** — `react-native-keyboard-controller` from Software Mansion for smooth keyboard animations, safe area handling, and Reanimated integration.

**Server connection** — Test connection on save. Attempt a quick API call (list models or ping) to verify the URL and API key work before saving the server.

**Model list** — Auto-fetch models on connect and cache locally. User picks from the cached list but can also type a custom model name.

**Crash reporting** — Sentry for unhandled exceptions only. No analytics. Captures crashes in the wild without tracking user behavior.

**Package manager** — npm. Expo's default, reliable with native modules.

**Testing** — Unit + integration tests via Vitest. Test Models (signals, state transitions), API client (streaming, error handling), and database layer (Drizzle queries). No E2E tests.

**Code quality** — ESLint + Prettier. ESLint catches bugs, Prettier handles formatting. Mature Expo ecosystem support.

## File structure

```
/
├── CONTEXT.md
├── docs/adr/
└── src/
```
