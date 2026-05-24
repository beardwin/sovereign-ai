import * as SecureStore from 'expo-secure-store';
import { signal, type Signal } from '@preact/signals-react';

export class ApiKeyStore {
  private _keys = signal<Record<string, string>>({});

  get keys(): Signal<Record<string, string>> {
    return this._keys;
  }

  async save(serverId: string, key: string): Promise<void> {
    await SecureStore.setItemAsync(serverId, key);
    this._keys.value = { ...this._keys.value, [serverId]: key };
  }

  async get(serverId: string): Promise<string | null> {
    const key = await SecureStore.getItemAsync(serverId);
    if (key) {
      this._keys.value = { ...this._keys.value, [serverId]: key };
    }
    return key;
  }

  async delete(serverId: string): Promise<void> {
    await SecureStore.deleteItemAsync(serverId);
    const newKeys = { ...this._keys.value };
    delete newKeys[serverId];
    this._keys.value = newKeys;
  }
}
