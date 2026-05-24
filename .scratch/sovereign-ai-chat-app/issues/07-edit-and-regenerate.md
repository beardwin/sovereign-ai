Status: ready-for-agent

# Edit and regenerate

[#1](../01-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

The user can edit their most recent user message in a thread and resubmit it, which replays the conversation from that point forward (messages after the edited message are truncated, and a new response is streamed). The user can also regenerate an assistant response, which sends the same request that produced the last assistant message and replaces the response.

### ChatSession

- **Edit-and-resubmit**: When the user edits the most recent message:
  1. Truncate all messages after the edited message
  2. Replace the edited message content
  3. Re-send the chat request with the truncated message history
  4. Stream the new response
  5. Save the new assistant message, discard the old one
- **Regenerate**: When the user taps regenerate on an assistant message:
  1. Find the user message that preceded the assistant message to regenerate
  2. Re-send the chat request with the same message history (up to and including that user message)
  3. Stream the new response
  4. Replace the old assistant message with the new one

### Message restrictions

- Only the **most recent** user message is editable. Older messages in the thread are immutable.
- Only the **most recent** assistant message is regeneratable.

### UI

- Tap a user message to enter edit mode (inline text area replaces the message bubble)
- "Save" button in edit mode confirms the edit and triggers resubmit
- "Cancel" button in edit mode discards the change
- "Regenerate" button appears on assistant messages (icon button, e.g., refresh icon)
- While regenerating, show a loading indicator on the message being replaced

### MessageStore

- Truncate messages after the edited point
- Update the edited message content
- Replace regenerated assistant messages

## Acceptance criteria

- [ ] Tapping the most recent user message enters edit mode (inline text area)
- [ ] Saving an edit truncates messages after the edited point and replays the conversation
- [ ] A new response is streamed after editing
- [ ] Older messages (not the most recent) cannot be edited
- [ ] Tapping "Regenerate" on an assistant message replays the same request and replaces the response
- [ ] While regenerating, a loading indicator appears on the message being replaced
- [ ] Cancel in edit mode discards the change without replaying
- [ ] Tests: ChatSession (edit-and-resubmit truncation + replay, regenerate replacement), Message (edit restriction: only most recent mutable)

## Blocked by

[#6](./06-streaming-chat.md) — Streaming chat
