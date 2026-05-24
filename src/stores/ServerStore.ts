import { eq } from 'drizzle-orm';
import { signal } from '@preact/signals-react';
import type { Server, NewServer } from '../db/schema';
import type { Database } from '../db';
import { servers } from '../db/schema';

export class ServerStore {
  private _servers = signal<Server[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  constructor(private readonly db: Database) {}

  get servers() {
    return this._servers.value;
  }

  get loading() {
    return this._loading.value;
  }

  get error() {
    return this._error.value;
  }

  async getAll(): Promise<Server[]> {
    this._loading.value = true;
    try {
      const result = await this.db.select().from(servers);
      this._servers.value = result as Server[];
      return result as Server[];
    } catch (err) {
      this._error.value = err instanceof Error ? err.message : 'Failed to load servers';
      return [];
    } finally {
      this._loading.value = false;
    }
  }

  async getById(id: string): Promise<Server | null> {
    const result = await this.db.select().from(servers).where(eq(servers.id, id));
    return (result as Server[])[0] ?? null;
  }

  async create(data: NewServer): Promise<Server> {
    const result = await this.db.insert(servers).values(data).returning();
    await this.getAll();
    return result[0] as Server;
  }

  async update(id: string, data: Partial<NewServer>): Promise<Server | null> {
    const result = await this.db.update(servers).set(data).where(eq(servers.id, id)).returning();
    await this.getAll();
    return (result as Server[])[0] ?? null;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(servers).where(eq(servers.id, id));
    await this.getAll();
  }

  clearError(): void {
    this._error.value = null;
  }
}
