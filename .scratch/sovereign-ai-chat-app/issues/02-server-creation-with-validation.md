Status: ready-for-agent

# Server creation with validation

[#1](../01-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

A complete server creation flow: the user enters their server URL, API key, default model, default temperature, and optional system prompt. The app validates the connection by fetching the model list from the server, caches the models, and stores the API key in the device keychain. On save, if validation fails, the server is not saved and the user sees an error.

### UI

- Add server form screen accessible from the server list (FAB or "Add" button)
- Fields: URL, API key (secure input), default model (dropdown from cached list + custom text input), default temperature (number input), system prompt (multiline text)
- "Save and Connect" button that validates before saving
- Loading state during connection test, error state on failure

### ApiKeyStore

Persist the API key in the device's secure keychain via `expo-secure-store`. The key is stored per-server and retrieved automatically when making requests.

### ServerStore

Save the server configuration to SQLite on successful validation. Generate a unique server ID.

### ApiClient + ModelListCache

Fetch models from `{server_url}/v1/models` during validation. Cache the result in `ModelListCache` keyed by server ID.

### Server Model

Exposes signals for all server properties. Triggers re-render of the form when validation succeeds/fails.

## Acceptance criteria

- [ ] Add server form is accessible from the empty server list and the server list
- [ ] User can enter URL, API key, default model, default temperature, and system prompt
- [ ] Model dropdown is populated from the server's model list (fetched on save)
- [ ] User can type a custom model name not in the fetched list
- [ ] Connection validation fetches models via GET `{server_url}/v1/models`
- [ ] On successful validation, server is saved to SQLite and API key stored in keychain
- [ ] On failed validation, server is NOT saved and user sees an error message
- [ ] API keys are stored in the device's secure keychain (not plain text)
- [ ] Tests: ApiKeyStore (keychain round-trip), ServerStore (save on validation success), ApiClient (model fetch, error handling), ModelListCache (populate on connect, store per server)

## Blocked by

[#1](./01-app-shell-database-navigation.md) — App shell, database, and navigation
