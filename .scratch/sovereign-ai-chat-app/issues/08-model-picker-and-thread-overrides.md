Status: ready-for-agent

# Model picker and thread overrides

[#1](../01-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

The user can select a different model for the current thread without leaving the conversation. A model picker button sits in the input bar area (or thread header). Tapping it shows a bottom sheet or modal with the server's cached model list. The user can also type a custom model name that isn't in the cached list. The selected model is persisted per-thread and used for all chat requests in that thread.

### UI

- Model picker button in the input bar area (or thread header next to the model badge)
- Tapping opens a model picker (bottom sheet or modal) showing the server's cached model list
- Each model is a selectable list item
- A text input at the bottom allows typing a custom model name not in the list
- The selected model is shown in the thread header / picker button
- Changes apply immediately to subsequent chat requests

### Thread Model

- `selectedModel` signal — the model used for this thread's requests
- Defaults to the server's default model on creation
- Updates when the user picks a different model in the picker
- Persists to SQLite via MessageStore

### ModelListCache

- Provides the cached model list for the current server
- Used to populate the picker options
- Custom model names are allowed but not added to the cache

## Acceptance criteria

- [ ] Model picker button is visible in the chat screen (input bar area or thread header)
- [ ] Tapping the picker shows a list of cached models from the server
- [ ] User can select a model from the list
- [ ] User can type a custom model name not in the cached list
- [ ] Selected model is displayed in the thread header
- [ ] Subsequent chat requests use the selected model
- [ ] Model selection is persisted per-thread in SQLite
- [ ] Tests: Thread (selectedModel signal updates, persistence), ModelListCache (provide cached models for server), ApiClient (uses thread's selected model in requests)

## Blocked by

[#2](./02-server-creation-with-validation.md) — Server creation with validation
[#4](./04-thread-management.md) — Thread management
