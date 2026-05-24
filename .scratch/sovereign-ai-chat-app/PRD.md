# PRD: Sovereign AI — Self-Hosted LLM Chat App for iOS & Android

## Problem Statement

Users who self-host their own LLM servers (via Ollama, vLLM, LM Studio, etc.) have no polished, privacy-first mobile app to chat with their models on the go. Commercial options like ChatGPT and Claude require cloud hosting and send all data to third-party servers. Self-hosted users want a native mobile experience that speaks their server's API, keeps all data on-device, and feels as smooth as the commercial apps — but without the data leaving their infrastructure.

## Solution

A React Native (Expo) chat app that connects to self-hosted LLM servers via the OpenAI-compatible Chat Completions API. The app stores all conversations locally on-device (SQLite), supports streaming responses with markdown rendering, and gives users full control over their server configuration, models, and temperature settings. The UX mirrors ChatGPT/Claude: threaded conversations, model selection, edit-and-regenerate, and stop-generation — all private and on-device.

## User Stories

1. As a user, I want to enter my server's URL and API key during onboarding, so that I can connect to my self-hosted LLM.
2. As a user, I want the app to validate my server connection when I save it (by fetching the model list), so that I know my credentials are correct before I start chatting.
3. As a user, I want to see the list of available models from my server, so that I can pick the right one for each conversation.
4. As a user, I can type a custom model name that isn't in the fetched list, so that I can use fine-tuned or non-standard models.
5. As a user, after my first launch, I want the app to jump directly to the server and thread I was last using, so that I can resume my conversation without extra taps.
6. As a user, if I have no configured servers, I want to see an onboarding flow that guides me through adding my first server.
7. As a user, I want to see a list of servers, so that I can switch between different LLM backends.
8. As a user, I want to add, edit, or delete a server, so that I can manage multiple LLM backends.
9. As a user, I want each server to have its own set of threads (conversations), so that servers don't share conversation context.
10. As a user, I want to create a new thread, so that I can start a fresh conversation.
11. As a user, I want to rename a thread by long-pressing it in the list, so that I can identify conversations by topic.
12. As a user, I want to delete a thread by swiping on it in the list, so that I can clean up old conversations.
13. As a user, I want to see my conversation history as a scrollable list of messages, with user messages on the right and assistant messages on the left, so that the chat feels familiar.
14. As a user, I want assistant responses to stream in token-by-token, so that the conversation feels responsive and I can read the answer as it's generated.
15. As a user, I want to see streaming responses rendered as formatted markdown (headers, lists, bold, italic), so that the output is readable.
16. As a user, I want code blocks in assistant responses to be syntax-highlighted, so that code is easy to read.
17. As a user, I want a stop generation button while a response is streaming, so that I can halt a response that's going off track.
18. As a user, I want to edit my most recent user message and resubmit it, so that I can correct typos or refine my prompt without starting a new thread.
19. As a user, I want to regenerate an assistant response, so that I can get a different answer to the same prompt.
20. As a user, I can only edit the most recent user message in a thread, so that the conversation history remains consistent.
21. As a user, I want to select a model for each thread independently, so that I can use different models for different conversations.
22. As a user, I want a model picker button in the input bar area, so that I can switch models without leaving the conversation.
23. As a user, each server has a default model that is pre-selected when I create a new thread, so that I don't have to pick a model every time.
24. As a user, I want to configure a system prompt at the server level, so that all threads with that server inherit the same instructions.
25. As a user, I can override the system prompt for an individual thread, so that I can customize behavior for specific conversations.
26. As a user, each server has a default temperature, so that conversations start with a consistent randomness setting.
27. As a user, I can override the temperature for an individual thread, so that I can fine-tune creativity vs. precision per conversation.
28. As a user, I want to set the app's theme (light, dark, or system default) in the settings screen, so that the app matches my device preferences.
29. As a user, the settings screen should be accessible from the server list, so that I can change app-wide preferences without leaving the main view.
30. As a user, if a request to my server fails (timeout, network error, bad response), I want to see a clear error message inline in the thread, so that I understand what went wrong.
31. As a user, failed API requests should be automatically retried once, so that transient network glitches don't require manual intervention.
32. As a user, there should be no offline queue for messages, because LLM chat requires an active connection.
33. As a user, my API keys are stored in the device's secure keychain, so that they are protected from other apps.
34. As a user, all my conversations are stored locally on my device (SQLite), so that no conversation data leaves my phone.
35. As a user, the keyboard should animate smoothly with the chat input bar, so that the app feels polished and native.
36. As a user, the input bar should be a simple text field with a send button, so that sending messages is quick and intuitive.
37. As a user, the input bar should be structured with a placeholder for an attachment button, so that future image support can be added without redesigning the layout.

## Implementation Decisions

### Architecture

- **Signals** — Fine-grained reactivity via `@preact/signals-react`. Each Model class owns its own signal properties. No centralized store — state is distributed across per-instance reactive classes.
- **Navigation** — Expo Router for file-based routing.
- **UI** — React Native Reanimated for animations and Shopify's Restyle for a theme-driven component system. Custom-built chat UI, no generic component library.
- **HTTP** — Built-in `fetch` for all server communication. No HTTP client library.
- **Database** — `expo-sqlite` with Drizzle ORM for type-safe schema definitions, queries, and migrations.
- **Markdown rendering** — `react-native-enriched-markdown` from Software Mansion for rendering markdown responses (code blocks, headers, lists, etc.).
- **Keyboard** — `react-native-keyboard-controller` from Software Mansion for smooth keyboard animations, safe area handling, and Reanimated integration.

### Modules

The following deep modules will be built:

**Server** — Manages server configuration (URL, API key, default model, default temperature, system prompt). Handles connection validation (fetching model list on save). Exposes signals for each property.

**Thread** — Manages a single conversation within a server. Owns the message list, selected model, temperature override, and system prompt override. Handles thread creation, renaming, and deletion. Exposes signals for each property.

**Message** — Represents a single message (user or assistant) within a thread. Has role, content, and timestamp. User messages are mutable only when most recent in the thread.

**ChatSession** — Orchestrates the streaming chat lifecycle for a single thread. Handles sending messages, receiving streamed responses, stop generation, edit-and-resubmit, and regenerate. Manages the streaming state machine.

**MessageStore** — Persists and loads threads and messages from SQLite via Drizzle ORM. Handles all CRUD operations for the conversation data.

**ServerStore** — Persists and loads server configurations from SQLite via Drizzle ORM. Handles CRUD for servers.

**SettingsStore** — Persists and loads global app settings (theme) from SQLite via Drizzle ORM. Single-row settings table.

**ApiKeyStore** — Manages API key storage using the device's secure keychain (expo-secure-store). Encrypts and retrieves keys per server.

**ApiClient** — Makes HTTP requests to the server using `fetch`. Handles OpenAI-compatible Chat Completions API, streaming response parsing, and error handling with auto-retry.

**ModelListCache** — Caches the list of available models fetched from each server. Refreshes on server connect or when explicitly requested.

**AppState** — Tracks the last-used server and thread across app launches. Used for smart routing on startup.

### Schema

The SQLite database (via Drizzle) will have these tables:

- **servers** — id, url, api_key_id (reference to keychain), default_model, default_temperature, system_prompt, created_at, updated_at
- **threads** — id, server_id, name, selected_model, temperature_override, system_prompt_override, created_at, updated_at
- **messages** — id, thread_id, role (user/assistant), content, created_at
- **settings** — id (single row), theme (light/dark/system), last_server_id, last_thread_id

### API Contract

All server communication uses the OpenAI-compatible Chat Completions API:

- **POST `{server_url}/v1/chat/completions`** — Send a chat request with streaming enabled (`stream: true`). Request body follows the OpenAI Chat Completions format (messages array, model, temperature, system prompt). Response is an SSE stream of `data: {"choices": [{"delta": {"content": "..."}}]}` events.
- **GET `{server_url}/v1/models`** — Fetch the list of available models. Used for connection validation and model picker population.

### App Launch Flow

1. Splash screen displays while the app initializes (database opens, settings load, signal models instantiate).
2. The app checks `AppState` for the last-used server and thread.
3. If no servers exist: show onboarding flow (guide user to add their first server).
4. If servers exist: navigate directly to the last-used thread (if it still exists) or to the server's thread list (if the thread was deleted).

### Thread Management UX

- New thread button in the navigation bar.
- Long-press a thread in the list to rename it (inline text input).
- Swipe left on a thread to reveal a delete action.

### Message Editing and Regeneration

- Tap a user message to enter edit mode — only the most recent user message is editable.
- After editing, resubmitting replays the conversation from that point forward (messages after the edited point are truncated, new response is streamed).
- "Regenerate" button on assistant messages — sends the same request that produced the last assistant message, replacing the response.
- "Stop generation" button appears while streaming, cancels the ongoing `fetch` request.

### Error Handling

- Connection errors, API errors, and timeouts are rendered inline in the thread as error messages.
- Failed requests are automatically retried once with a short delay.
- No offline queue — LLM chat requires an active connection.

## Testing Decisions

### Testing Principles

- Test external behavior, not implementation details. Assert on signal values and observable state transitions, not on internal method calls.
- Use Vitest for unit and integration tests. It's fast, works with Expo projects, and supports TypeScript natively.
- No E2E tests — the project scope and maintenance cost don't justify Detox's fragility.

### Modules to Test

All deep modules will have tests:

- **Server** — Validation of server configuration, connection test behavior (model list fetch), signal reactivity.
- **Thread** — Thread lifecycle (create, rename, delete), model/temperature override behavior, system prompt inheritance (server default vs. thread override).
- **Message** — Edit restrictions (only most recent user message mutable), role/content immutability.
- **ChatSession** — Streaming state machine (idle → streaming → complete, idle → streaming → stopped), edit-and-resubmit behavior, regenerate behavior, stop generation cancellation.
- **MessageStore** — SQLite persistence: CRUD operations, message ordering, thread loading with messages.
- **ServerStore** — SQLite persistence: server CRUD, query by ID.
- **SettingsStore** — Theme persistence, last-used server/thread tracking, single-row enforcement.
- **ApiKeyStore** — Keychain save and retrieval, encryption/decryption round-trip.
- **ApiClient** — Request formatting, streaming response parsing, error detection, retry logic.
- **ModelListCache** — Cache population on connect, cache invalidation, custom model override.
- **AppState** — Last-used server/thread persistence, fallback behavior when last-used thread no longer exists.

## Out of Scope

- Image/multi-modal support (input bar is structured for it, but implementation is deferred).
- File attachments.
- Server-side conversation sync — all data is local-only.
- User accounts or authentication — this app has no backend of its own.
- Push notifications.
- Shared conversations or collaboration.
- Voice input or voice output.
- Multi-language UI (app follows device locale, but no i18n implementation for now).
- Analytics — Sentry captures crashes only, no user tracking.

## Further Notes

- The app targets both iOS and Android from a single Expo codebase. The keychain story is native on each platform (iOS Keychain, Android Keystore), but `expo-secure-store` abstracts this.
- The self-hosted LLM user is technically savvy — they know their server URL and API key. The UX should respect that competence: minimal hand-holding, maximum control.
- The `react-native-enriched-markdown` library from Software Mansion is chosen for its deep integration with Reanimated (also from Software Mansion, the user's former employer). This is a deliberate ecosystem alignment decision.
- The `@preact/signals-react` + Model class pattern replaces the typical centralized store approach. Each Model class is a self-contained reactive entity with its own signals. This avoids the pitfalls of mutable global state while keeping the codebase testable and composable.
- Sentry is used on its free tier (5,000 errors/month), which is sufficient for a personal project.
