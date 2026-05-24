import { signal } from '@preact/signals-react';

export interface Model {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

export type ModelList = Model[];

export class ModelListCache {
  private _cache = signal<Record<string, ModelList>>({});
  private _customModel = signal<string>('');

  get cache() {
    return this._cache.value;
  }

  get customModel() {
    return this._customModel.value;
  }

  setCustomModel(model: string): void {
    this._customModel.value = model;
  }

  getCachedModels(serverId: string): ModelList {
    return this._cache.value[serverId] ?? [];
  }

  setCachedModels(serverId: string, models: ModelList): void {
    this._cache.value = { ...this._cache.value, [serverId]: models };
  }

  clearCache(serverId: string): void {
    const newCache = { ...this._cache.value };
    delete newCache[serverId];
    this._cache.value = newCache;
  }

  clearAll(): void {
    this._cache.value = {};
  }
}
