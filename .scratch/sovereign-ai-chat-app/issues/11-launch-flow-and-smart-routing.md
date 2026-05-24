Status: ready-for-agent

# Launch flow and smart routing

[#1](../01-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

The app's startup behavior: on launch, the app checks if any servers exist, then navigates to the last-used server and thread. If the last-used thread no longer exists (was deleted), it falls back to the server's thread list. If there are no servers, it shows the onboarding flow (add server form).

### AppState

- Tracks `lastServerId` and `lastThreadId` — updated whenever the user navigates to a different server or thread
- Persisted in the settings table alongside the theme
- Updated via signals in the Server and Thread models

### Launch flow

1. Splash screen displays while the database initializes and AppState loads
2. Check if any servers exist:
   - **No servers** → navigate to the add server form (onboarding)
   - **Servers exist** → check `lastServerId` and `lastThreadId`:
     - If the last-used thread exists → navigate directly to that thread's chat screen
     - If the last-used thread was deleted → navigate to the last-used server's thread list
3. Update `lastServerId`/`lastThreadId` whenever the user navigates to a new server or thread

### SettingsStore

- Load `last_server_id` and `last_thread_id` from the settings table
- Save updated values when the user navigates

## Acceptance criteria

- [ ] Splash screen displays during app initialization
- [ ] On first launch (no servers), the app shows the add server form
- [ ] On subsequent launches with servers, the app navigates to the last-used thread
- [ ] If the last-used thread was deleted, the app falls back to the server's thread list
- [ ] `lastServerId` and `lastThreadId` are updated when the user navigates to a new server or thread
- [ ] Values are persisted in SQLite and survive app restarts
- [ ] Tests: AppState (last-used tracking, fallback when thread deleted), SettingsStore (last_server_id/last_thread_id persistence)

## Blocked by

[#2](./02-server-creation-with-validation.md) — Server creation with validation
[#4](./04-thread-management.md) — Thread management
[#5](./05-chat-interface.md) — Chat interface
[#6](./06-streaming-chat.md) — Streaming chat
