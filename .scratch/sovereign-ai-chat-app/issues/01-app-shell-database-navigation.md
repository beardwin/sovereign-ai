Status: completed

# App shell, database, and navigation

[#1](../01-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

Initialize the Expo app shell with all foundational infrastructure: splash screen, database schema, store scaffolds, and navigation. This is the first demoable slice — the app launches, shows a splash screen, then navigates to an empty server list.

### Database

Create the Drizzle ORM schema with all 4 tables: **servers**, **threads**, **messages**, **settings**. Each table gets the columns defined in the PRD schema. The database opens on app init.

### Stores

Scaffold the store classes: `ServerStore`, `MessageStore`, `SettingsStore`. They have the structure and method signatures from the PRD but can return empty data until the UI and API layers are wired up.

### Navigation

Set up Expo Router with the screen hierarchy: server list, server detail (thread list), chat screen, settings screen. All screens currently render empty placeholder UI.

### Splash screen

Show a splash screen while the database initializes and stores instantiate. Transition to the server list once ready.

## Acceptance criteria

- [ ] App launches with a splash screen, then transitions to the server list
- [ ] Drizzle ORM schema is defined with all 4 tables (servers, threads, messages, settings)
- [ ] Database opens on app initialization
- [ ] All store classes are scaffolded (ServerStore, MessageStore, SettingsStore, ApiKeyStore, ModelListCache, AppState)
- [ ] Expo Router navigation is set up with server list, server detail, chat, and settings screens
- [ ] All screens render empty placeholder UI
- [ ] Tests: store scaffolds pass unit tests (empty state assertions)

## Blocked by

None - can start immediately
