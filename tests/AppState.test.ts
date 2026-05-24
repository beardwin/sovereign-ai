import { describe, it, expect, beforeEach } from 'vitest';
import { AppState } from '../src/stores/AppState';

describe('AppState', () => {
  let state: AppState;

  beforeEach(() => {
    state = new AppState();
  });

  it('starts with null last server and thread IDs', () => {
    expect(state.lastServerId).toBeNull();
    expect(state.lastThreadId).toBeNull();
  });

  it('can set last server ID', () => {
    state.setLastServerId('server-1');
    expect(state.lastServerId).toBe('server-1');
  });

  it('can set last thread ID', () => {
    state.setLastThreadId('thread-1');
    expect(state.lastThreadId).toBe('thread-1');
  });

  it('can clear last server ID', () => {
    state.setLastServerId('server-1');
    state.setLastServerId(null);
    expect(state.lastServerId).toBeNull();
  });

  it('can clear last thread ID', () => {
    state.setLastThreadId('thread-1');
    state.setLastThreadId(null);
    expect(state.lastThreadId).toBeNull();
  });

  it('returns launch target with current IDs', () => {
    state.setLastServerId('server-1');
    state.setLastThreadId('thread-1');
    const target = state.getLaunchTarget();
    expect(target).toEqual({ serverId: 'server-1', threadId: 'thread-1' });
  });

  it('returns nulls in launch target when not set', () => {
    const target = state.getLaunchTarget();
    expect(target).toEqual({ serverId: null, threadId: null });
  });

  it('init sets both IDs at once', () => {
    state.init('server-1', 'thread-1');
    expect(state.lastServerId).toBe('server-1');
    expect(state.lastThreadId).toBe('thread-1');
  });

  it('init with nulls clears IDs', () => {
    state.init('server-1', 'thread-1');
    state.init(null, null);
    expect(state.lastServerId).toBeNull();
    expect(state.lastThreadId).toBeNull();
  });
});
