Status: ready-for-agent

# Server management

[#1](../01-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

The server list screen shows all configured servers. The user can edit a server's configuration (URL, API key, model, temperature, system prompt), delete a server (and its associated threads and messages), and navigate to the server detail screen (thread list). A settings entry point is also added here.

### UI

- Server list screen with a card/list item per server (shows server URL or a friendly name)
- Tap a server → navigate to thread list screen
- Long-press a server → edit server form (pre-populated with current values)
- Swipe left on a server → reveal delete action with confirmation
- Settings button in the navigation bar (opens settings screen)

### ServerStore

- Load all servers from SQLite
- Update server on edit
- Delete server (cascade: delete associated threads and messages)
- Expose signals for the server list

### Server Model

Signals for each server property. Edit mode updates signals, save persists to Store.

### Settings entry

Settings button navigates to the settings screen (theme, etc.). The settings screen itself is built in a later slice.

## Acceptance criteria

- [ ] Server list displays all configured servers
- [ ] Tap a server navigates to its thread list
- [ ] Long-press a server opens the edit server form (pre-populated)
- [ ] Saving edits persists changes to SQLite and keychain (API key)
- [ ] Swipe left on a server reveals delete with confirmation dialog
- [ ] Deleting a server also deletes its threads and messages
- [ ] Settings button in the navigation bar navigates to the settings screen
- [ ] Tests: ServerStore (load, update, cascade delete), Server (signal updates on edit)

## Blocked by

[#2](./02-server-creation-with-validation.md) — Server creation with validation
