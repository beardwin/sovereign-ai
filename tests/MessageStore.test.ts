import { randomUUID } from 'crypto';
import { describe, it, expect, beforeEach } from 'vitest';
import { MessageStore } from '../src/stores/MessageStore';
import { createTestDb } from './test-db';

describe('MessageStore', () => {
  let store: MessageStore;

  beforeEach(() => {
    store = new MessageStore(createTestDb());
  });

  it('starts with empty messages list', () => {
    expect(store.messages.value).toEqual([]);
  });

  it('starts with loading false', () => {
    expect(store.loading.value).toBe(false);
  });

  it('starts with no error', () => {
    expect(store.error.value).toBeNull();
  });

  it('creates and retrieves a message', async () => {
    const threadId = 'thread-1';
    const message = await store.create({
      thread_id: threadId,
      role: 'user',
      content: 'Hello',
    });

    expect(message.id).toBeDefined();
    expect(message.role).toBe('user');
    expect(message.content).toBe('Hello');

    const messages = await store.getByThreadId(threadId);
    expect(messages).toHaveLength(1);
    expect(store.messages.value).toHaveLength(1);
  });

  it('orders messages by creation time', async () => {
    const threadId = 'thread-1';
    await store.create({ thread_id: threadId, role: 'user', content: 'First' });
    await store.create({ thread_id: threadId, role: 'assistant', content: 'Second' });
    await store.create({ thread_id: threadId, role: 'user', content: 'Third' });

    const messages = await store.getByThreadId(threadId);
    expect(messages).toHaveLength(3);
    expect(messages[0].content).toBe('First');
    expect(messages[1].content).toBe('Second');
    expect(messages[2].content).toBe('Third');
  });

  it('deletes messages by thread ID', async () => {
    const threadId = 'thread-1';
    await store.create({ thread_id: threadId, role: 'user', content: 'Hello' });
    await store.create({ thread_id: threadId, role: 'assistant', content: 'Hi' });

    await store.deleteByThreadId(threadId);

    const messages = await store.getByThreadId(threadId);
    expect(messages).toHaveLength(0);
  });

  it('returns empty array when getById finds nothing', async () => {
    const result = await store.getById('nonexistent');
    expect(result).toBeNull();
  });

  it('clears error when clearError is called', () => {
    store.clearError();
    expect(store.error.value).toBeNull();
  });
});
