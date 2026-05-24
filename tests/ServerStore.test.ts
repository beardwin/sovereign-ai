import { randomUUID } from 'crypto';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServerStore } from '../src/stores/ServerStore';
import { createTestDb } from './test-db';

describe('ServerStore', () => {
  let store: ServerStore;

  beforeEach(() => {
    store = new ServerStore(createTestDb());
  });

  it('starts with empty servers list', () => {
    expect(store.servers.value).toEqual([]);
  });

  it('starts with loading false', () => {
    expect(store.loading.value).toBe(false);
  });

  it('starts with no error', () => {
    expect(store.error.value).toBeNull();
  });

  it('creates and retrieves a server', async () => {
    const id = randomUUID();
    const server = await store.create({ id, url: 'http://localhost:11434', api_key_id: 'key-1' });

    expect(server.id).toBe(id);
    expect(server.url).toBe('http://localhost:11434');
    expect(server.api_key_id).toBe('key-1');
    expect(store.servers.value).toHaveLength(1);

    const fetched = await store.getById(id);
    expect(fetched).not.toBeNull();
    expect(fetched!.url).toBe('http://localhost:11434');
  });

  it('lists all servers', async () => {
    await store.create({ id: randomUUID(), url: 'http://a:11434', api_key_id: 'key-a' });
    await store.create({ id: randomUUID(), url: 'http://b:11434', api_key_id: 'key-b' });

    const servers = await store.getAll();
    expect(servers).toHaveLength(2);
    expect(store.servers.value).toHaveLength(2);
  });

  it('updates a server', async () => {
    const id = randomUUID();
    await store.create({ id, url: 'http://localhost:11434', api_key_id: 'key-1' });
    await store.update(id, { url: 'http://new:11434' });

    const updated = await store.getById(id);
    expect(updated!.url).toBe('http://new:11434');
  });

  it('deletes a server', async () => {
    const id = randomUUID();
    await store.create({ id, url: 'http://localhost:11434', api_key_id: 'key-1' });
    await store.delete(id);

    const result = await store.getById(id);
    expect(result).toBeNull();
    expect(store.servers.value).toHaveLength(0);
  });

  it('clears error when clearError is called', () => {
    store.clearError();
    expect(store.error.value).toBeNull();
  });
});
