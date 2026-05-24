Status: ready-for-agent

# System prompt and temperature overrides

[#1](../01-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

Each server has a default system prompt and default temperature that apply to all threads. Each thread can override both values independently. The user can view and edit these settings through a thread settings screen.

### Thread settings screen

Accessible from the thread list (e.g., via a settings icon on the thread item or a "..." menu). Shows:

- **System prompt** — text area, pre-populated with the server's default if no thread override exists. An "Use server default" toggle/checkbox resets to the server's value.
- **Temperature** — number input (0.0 to 2.0), pre-populated with the server's default if no thread override exists. An "Use server default" toggle/checkbox resets to the server's value.
- **Save** button to persist overrides

### Thread Model

- `systemPromptOverride` signal — thread-specific system prompt. Falls back to server default when not set.
- `temperatureOverride` signal — thread-specific temperature. Fallsback to server default when not set.

### Server Model

Exposes `defaultSystemPrompt` and `defaultTemperature` signals. These are the fallback values for threads that haven't set overrides.

### ApiClient

- Includes the effective system prompt (thread override if set, else server default) in every chat request
- Includes the effective temperature (thread override if set, else server default) in every chat request

## Acceptance criteria

- [ ] Thread settings screen is accessible from the thread list
- [ ] System prompt field shows thread override if set, otherwise server default
- [ ] "Use server default" toggle resets system prompt to server's value
- [ ] Temperature field shows thread override if set, otherwise server default
- [ ] "Use server default" toggle resets temperature to server's value
- [ ] Saving persists overrides to SQLite
- [ ] Chat requests use the effective system prompt (thread override or server default)
- [ ] Chat requests use the effective temperature (thread override or server default)
- [ ] Tests: Thread (override signals, fallback to server defaults), Server (default values), ApiClient (effective prompt and temperature in requests)

## Blocked by

[#2](./02-server-creation-with-validation.md) — Server creation with validation
[#4](./04-thread-management.md) — Thread management
