import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApiKeyStore } from '../src/stores/ApiKeyStore';

vi.mock('expo-secure-store', () => ({
  default: {
    getItemAsync: vi.fn().mockResolvedValue(null),
    setItemAsync: vi.fn().mockResolvedValue(undefined),
    deleteItemAsync: vi.fn().mockResolvedValue(undefined),
  },
  getItemAsync: vi.fn().mockResolvedValue(null),
  setItemAsync: vi.fn().mockResolvedValue(undefined),
  deleteItemAsync: vi.fn().mockResolvedValue(undefined),
}));

describe('ApiKeyStore', () => {
  let store: ApiKeyStore;

  beforeEach(() => {
    store = new ApiKeyStore();
    vi.clearAllMocks();
  });

  it('starts with empty keys', () => {
    expect(store.keys.value).toEqual({});
  });

  it('can save a key', async () => {
    await store.save('server-1', 'test-key');
    expect(store.keys.value['server-1']).toBe('test-key');
  });

  it('can overwrite an existing key', async () => {
    await store.save('server-1', 'key-a');
    await store.save('server-1', 'key-b');
    expect(store.keys.value['server-1']).toBe('key-b');
  });

  it('can delete a key', async () => {
    await store.save('server-1', 'test-key');
    await store.delete('server-1');
    expect(store.keys.value['server-1']).toBeUndefined();
  });

  it('does not affect other keys when deleting', async () => {
    await store.save('server-1', 'key-1');
    await store.save('server-2', 'key-2');
    await store.delete('server-1');
    expect(store.keys.value['server-2']).toBe('key-2');
    expect(store.keys.value['server-1']).toBeUndefined();
  });
});
