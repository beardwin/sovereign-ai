Status: ready-for-agent

# Thread management

[#1](../1-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

The server detail screen shows all threads for the selected server. The user can create a new thread, rename an existing thread (long-press), and delete a thread (swipe). When creating a thread, the server's default model is pre-selected.

### UI

- Thread list screen (shown when a server is tapped from the server list)
- "New Thread" button in the navigation bar
- Thread list items show the thread name (or auto-generated name from first message)
- Long-press a thread → inline rename input
- Swipe left on a thread → reveal delete action with confirmation
- Tap a thread → navigate to chat screen
- Model badge showing the current thread's selected model

### Thread Model

Signals for thread properties: name, selected model, temperature override, system prompt override. The selected model defaults to the server's default model on creation.

### MessageStore

- Load threads for a given server ID
- Create a new thread (generates a unique ID, sets default model)
- Update thread name on rename
- Delete a thread (cascades to delete its messages)
- Expose signals for the thread list

### Thread Model

Signals for thread properties. Edit mode updates signals, save persists to Store.

## Acceptance criteria

- [ ] Thread list displays all threads for the selected server
- [ ] "New Thread" button creates a thread with the server's default model pre-selected
- [ ] Thread items show the thread name
- [ ] Long-press a thread enables inline rename
- [ ] Saving a new name persists to SQLite
- [ ] Swipe left on a thread reveals delete with confirmation
- [ ] Deleting a thread also deletes its messages
- [ ] Tap a thread navigates to the chat screen
- [ ] Thread model badge shows the selected model
- [ ] Tests: MessageStore (load threads by server, create, rename, cascade delete), Thread (signal updates, default model inheritance from server)

## Blocked by

[#3](./03-server-management.md) — Server management
