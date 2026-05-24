import type { Database } from '../db';
import { eq, asc } from 'drizzle-orm';
import { signal } from '@preact/signals-react';
import type { Message, NewMessage } from '../db/schema';
import { messages } from '../db/schema';

export class MessageStore {
  private _messages = signal<Message[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  constructor(private readonly db: Database) {}

  get messages() {
    return this._messages.value;
  }

  get loading() {
    return this._loading.value;
  }

  get error() {
    return this._error.value;
  }

  async getByThreadId(threadId: string): Promise<Message[]> {
    this._loading.value = true;
    try {
      const result = await this.db
        .select()
        .from(messages)
        .where(eq(messages.thread_id, threadId))
        .orderBy(asc(messages.created_at));
      this._messages.value = result as Message[];
      return result as Message[];
    } catch (err) {
      this._error.value = err instanceof Error ? err.message : 'Failed to load messages';
      return [];
    } finally {
      this._loading.value = false;
    }
  }

  async getById(id: string): Promise<Message | null> {
    const result = await this.db.select().from(messages).where(eq(messages.id, id));
    return (result as Message[])[0] ?? null;
  }

  async create(data: NewMessage): Promise<Message> {
    const result = await this.db.insert(messages).values(data).returning();
    await this.getByThreadId(data.thread_id);
    return result[0] as Message;
  }

  async createBatch(data: NewMessage[]): Promise<Message[]> {
    for (const item of data) {
      await this.db.insert(messages).values(item);
    }
    await this.getByThreadId(data[0]?.thread_id ?? '');
    return [] as Message[];
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(messages).where(eq(messages.id, id));
  }

  async deleteByThreadId(threadId: string): Promise<void> {
    await this.db.delete(messages).where(eq(messages.thread_id, threadId));
    this._messages.value = [];
  }

  clearError(): void {
    this._error.value = null;
  }
}
