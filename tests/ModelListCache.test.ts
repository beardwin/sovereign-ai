import { describe, it, expect, beforeEach } from 'vitest';
import { ModelListCache } from '../src/stores/ModelListCache';

describe('ModelListCache', () => {
  let cache: ModelListCache;

  beforeEach(() => {
    cache = new ModelListCache();
  });

  it('starts with empty cache', () => {
    expect(cache.cache.value).toEqual({});
  });

  it('returns empty array for uncached server', () => {
    expect(cache.getCachedModels('server-1')).toEqual([]);
  });

  it('can cache and retrieve models', () => {
    const models = [{ id: 'model-1', object: 'model', created: 0, owned_by: 'test' }];
    cache.setCachedModels('server-1', models);
    expect(cache.getCachedModels('server-1')).toEqual(models);
  });

  it('can set custom model', () => {
    cache.setCustomModel('custom-model');
    expect(cache.customModel.value).toBe('custom-model');
  });

  it('can clear cache for a server', () => {
    cache.setCachedModels('server-1', []);
    cache.clearCache('server-1');
    expect(cache.cache.value).toEqual({});
  });

  it('can clear all cache', () => {
    cache.setCachedModels('server-1', []);
    cache.setCachedModels('server-2', []);
    cache.clearAll();
    expect(cache.cache.value).toEqual({});
  });

  it('caches models per server independently', () => {
    cache.setCachedModels('server-1', [{ id: 'm1', object: 'model', created: 0, owned_by: 'a' }]);
    cache.setCachedModels('server-2', [{ id: 'm2', object: 'model', created: 0, owned_by: 'b' }]);
    expect(cache.getCachedModels('server-1')).toHaveLength(1);
    expect(cache.getCachedModels('server-2')).toHaveLength(1);
    expect(cache.cache.value['server-1']![0].id).toBe('m1');
    expect(cache.cache.value['server-2']![0].id).toBe('m2');
  });
});
