Status: ready-for-agent

# Chat interface

[#1](../01-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

The chat screen renders a conversation as a scrollable list of messages. User messages appear on the right, assistant messages on the left. Assistant messages are rendered as formatted markdown (headers, lists, bold, italic) with syntax-highlighted code blocks. The bottom of the screen has an input bar with a text field and send button. The keyboard animates smoothly with the input bar using `react-native-keyboard-controller`. The theme system (light/dark/system) is wired into the Restyle theme provider.

### UI

- Chat screen with a message list (scrollable, auto-scrolls to bottom on new messages)
- User messages: right-aligned, styled as user bubbles
- Assistant messages: left-aligned, rendered with `react-native-enriched-markdown`
- Code blocks rendered with syntax highlighting
- Input bar: text field + send button, fixed at bottom
- `react-native-keyboard-controller` integration for smooth keyboard animations

### Markdown rendering

`react-native-enriched-markdown` renders assistant message content. Code blocks get syntax highlighting. Basic markdown (headers, lists, bold, italic) renders as native views.

### Theme system

Restyle theme provider is wired up. The theme (light/dark/system) is read from SettingsStore on app init and applied globally. The chat screen respects the current theme for backgrounds, text colors, and bubble colors.

### Message Model

Represents individual messages with role, content, and timestamp. Static for now (edit functionality is a later slice).

## Acceptance criteria

- [ ] Chat screen displays messages in a scrollable list
- [ ] User messages are right-aligned, assistant messages are left-aligned
- [ ] Assistant messages are rendered with markdown formatting (headers, lists, bold, italic)
- [ ] Code blocks are syntax-highlighted
- [ ] Input bar has a text field and send button
- [ ] Keyboard animates smoothly with input bar (no clipping, no overlap)
- [ ] Theme (light/dark/system) applies to chat screen backgrounds and text
- [ ] Message list auto-scrolls to bottom on new content
- [ ] Tests: Message (role/content/timestamp structure), theme application unit test

## Blocked by

[#4](./04-thread-management.md) — Thread management
