import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { servers, threads, messages, settings } from '../src/db/schema';

export function createTestDb() {
  const sqlite = new Database(':memory:');
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = OFF');

  sqlite.exec(`
    CREATE TABLE servers (
      id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      api_key_id TEXT NOT NULL,
      default_model TEXT NOT NULL DEFAULT '',
      default_temperature INTEGER NOT NULL DEFAULT 0.7,
      system_prompt TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE threads (
      id TEXT PRIMARY KEY,
      server_id TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT 'New Thread',
      selected_model TEXT NOT NULL DEFAULT '',
      temperature_override INTEGER,
      system_prompt_override TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE messages (
      id TEXT PRIMARY KEY,
      thread_id TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      theme TEXT NOT NULL DEFAULT 'system' CHECK(theme IN ('light', 'dark', 'system')),
      last_server_id TEXT,
      last_thread_id TEXT
    );
  `);

  return drizzle(sqlite, {
    schema: { servers, threads, messages, settings },
  });
}
