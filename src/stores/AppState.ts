import { signal, type Signal } from '@preact/signals-react';

export class AppState {
  private _lastServerId = signal<string | null>(null);
  private _lastThreadId = signal<string | null>(null);

  get lastServerId(): Signal<string | null> {
    return this._lastServerId;
  }

  get lastThreadId(): Signal<string | null> {
    return this._lastThreadId;
  }

  init(serverId: string | null, threadId: string | null): void {
    this._lastServerId.value = serverId;
    this._lastThreadId.value = threadId;
  }

  setLastServerId(id: string | null): void {
    this._lastServerId.value = id;
  }

  setLastThreadId(id: string | null): void {
    this._lastThreadId.value = id;
  }

  getLaunchTarget() {
    return {
      serverId: this._lastServerId.value,
      threadId: this._lastThreadId.value,
    };
  }
}
