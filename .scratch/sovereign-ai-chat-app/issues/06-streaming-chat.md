Status: ready-for-agent

# Streaming chat

[#1](../01-sovereign-ai-chat-app.md) — Sovereign AI chat app

## What to build

The user can send a message and see the assistant's response stream in token-by-token. A "Stop generation" button appears while streaming. If the request fails (timeout, network error, bad response), an error message is rendered inline in the thread. Failed requests are automatically retried once.

### ChatSession

Manages the streaming lifecycle state machine: `idle → streaming → complete` or `idle → streaming → stopped`. On send:

1. User message is saved to the database
2. ChatSession initiates a POST to `{server_url}/v1/chat/completions` with `stream: true`
3. Streaming response is parsed token-by-token and appended to the UI
4. When the stream ends, the complete assistant message is saved to the database
5. If the stream is interrupted (stop button), the partial response is discarded

### ApiClient

- Sends the chat request with streaming enabled
- Parses the SSE response stream (`data: {"choices": [{"delta": {"content": "..."}}]}`)
- Emits content deltas to the UI
- Retries failed requests once with a short delay
- Returns structured errors (timeout, network, API error)

### UI

- Send button triggers the chat session
- Assistant response appears incrementally as tokens arrive
- "Stop generation" button appears during streaming, cancels the ongoing fetch
- Error messages render inline in the message list (styled differently from normal messages)
- Loading indicator while waiting for the first token

### MessageStore

- Save user messages on send
- Save complete assistant messages after streaming finishes
- Save error messages when requests fail

## Acceptance criteria

- [ ] Tapping send sends the message to the server and appends the user message
- [ ] Assistant response streams in token-by-token (visible incrementally)
- [ ] "Stop generation" button appears during streaming and cancels the request
- [ ] When streaming completes, the full response is saved to the database
- [ ] Network errors, timeouts, and API errors render as inline error messages in the thread
- [ ] Failed requests are automatically retried once
- [ ] Loading indicator shows while waiting for the first token
- [ ] Tests: ChatSession (streaming state machine: idle→streaming→complete, idle→streaming→stopped), ApiClient (stream parsing, error detection, retry logic), MessageStore (save messages)

## Blocked by

[#5](./05-chat-interface.md) — Chat interface
