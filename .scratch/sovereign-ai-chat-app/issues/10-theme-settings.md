Status: ready-for-agent

# Theme settings

[#1](../01-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

A settings screen where the user can choose the app's theme: light, dark, or system default. The setting is persisted in SQLite and applied globally across all screens.

### UI

- Settings screen (accessible from the server list via the settings button)
- Theme selector with three options: Light, Dark, System
- Radio buttons or a segmented control for selection
- Theme change applies immediately (no reload needed — Restyle theme provider updates)

### SettingsStore

- Load the current theme from the settings table (single row)
- Save the selected theme
- The settings table has columns: `id` (single row, always 1), `theme` (enum: light | dark | system)

### Restyle ThemeProvider

The Restyle theme provider reads the persisted theme value. When the theme changes:
- If "system" is selected, the app follows the device's light/dark mode
- If "light" or "dark" is selected, the app forces that mode

### AppState / Theme integration

The theme is read once on app init and applied to the Restyle theme provider. Subsequent changes update the provider reactively via signals.

## Acceptance criteria

- [ ] Settings screen has a theme selector with Light, Dark, and System options
- [ ] Selecting a theme applies it immediately across all screens
- [ ] "System" mode follows the device's light/dark preference
- [ ] Theme selection is persisted in SQLite
- [ ] Theme is loaded on app init and applied before any screen renders
- [ ] Tests: SettingsStore (load, save, single-row enforcement), theme application test

## Blocked by

[#3](./03-server-management.md) — Server management
