import { describe, it, expect, beforeEach } from 'vitest';
import { SettingsStore } from '../src/stores/SettingsStore';
import { createTestDb } from './test-db';

describe('SettingsStore', () => {
  let store: SettingsStore;

  beforeEach(() => {
    store = new SettingsStore(createTestDb());
  });

  it('starts with null settings', () => {
    expect(store.settings).toBeNull();
  });

  it('defaults to system theme when no settings loaded', () => {
    expect(store.theme).toBe('system');
  });

  it('defaults to null for last server and thread IDs', () => {
    expect(store.lastServerId).toBeNull();
    expect(store.lastThreadId).toBeNull();
  });

  it('creates default settings on init', async () => {
    const result = await store.init();
    expect(result.theme).toBe('system');
    expect(store.settings).not.toBeNull();
    expect(store.settings!.id).toBe(1);
  });

  it('does not duplicate settings on repeated init', async () => {
    await store.init();
    await store.init();

    const settings = await store.init();
    expect(settings.theme).toBe('system');
  });

  it('updates theme', async () => {
    await store.init();
    await store.update({ theme: 'dark' });

    expect(store.theme).toBe('dark');
  });

  it('tracks last server and thread IDs', async () => {
    await store.init();

    store.setLastServerId('server-1');
    expect(store.lastServerId).toBe('server-1');

    store.setLastThreadId('thread-1');
    expect(store.lastThreadId).toBe('thread-1');
  });

  it('clears error when clearError is called', () => {
    store.clearError();
    expect(store.error).toBeNull();
  });
});
