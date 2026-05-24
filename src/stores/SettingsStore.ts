import type { Database } from '../db';
import { eq } from 'drizzle-orm';
import { signal, type Signal } from '@preact/signals-react';
import type { Setting, NewSetting } from '../db/schema';
import { settings } from '../db/schema';

export class SettingsStore {
  private _settings = signal<Setting | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  constructor(private readonly db: Database) {}

  get settings(): Signal<Setting | null> {
    return this._settings;
  }

  get loading(): Signal<boolean> {
    return this._loading;
  }

  get error(): Signal<string | null> {
    return this._error;
  }

  async init(): Promise<Setting> {
    this._loading.value = true;
    try {
      let result = await this.db.select().from(settings).where(eq(settings.id, 1));
      if (result.length === 0) {
        result = await this.db.insert(settings).values({ theme: 'system' }).returning();
      }
      this._settings.value = result[0] as Setting;
      return result[0] as Setting;
    } catch (err) {
      this._error.value = err instanceof Error ? err.message : 'Failed to load settings';
      throw err;
    } finally {
      this._loading.value = false;
    }
  }

  async update(data: Partial<NewSetting>): Promise<Setting | null> {
    const result = await this.db
      .update(settings)
      .set(data)
      .where(eq(settings.id, 1))
      .returning();
    this._settings.value = (result as Setting[])[0] ?? null;
    return (result as Setting[])[0] ?? null;
  }

  get theme() {
    return this._settings.value?.theme ?? 'system';
  }

  get lastServerId() {
    return this._settings.value?.last_server_id ?? null;
  }

  get lastThreadId() {
    return this._settings.value?.last_thread_id ?? null;
  }

  setLastServerId(id: string | null): void {
    if (this._settings.value) {
      this._settings.value = {
        ...this._settings.value,
        last_server_id: id,
      };
    }
  }

  setLastThreadId(id: string | null): void {
    if (this._settings.value) {
      this._settings.value = {
        ...this._settings.value,
        last_thread_id: id,
      };
    }
  }

  clearError(): void {
    this._error.value = null;
  }
}
