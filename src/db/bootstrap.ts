import type { SQLiteDatabase } from 'expo-sqlite';

export const schemaSql = `
  CREATE TABLE IF NOT EXISTS servers (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    api_key_id TEXT NOT NULL,
    default_model TEXT NOT NULL DEFAULT '',
    default_temperature INTEGER NOT NULL DEFAULT 7,
    system_prompt TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS threads (
    id TEXT PRIMARY KEY,
    server_id TEXT NOT NULL REFERENCES servers(id),
    name TEXT NOT NULL DEFAULT 'New Thread',
    selected_model TEXT NOT NULL DEFAULT '',
    temperature_override INTEGER,
    system_prompt_override TEXT,
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL REFERENCES threads(id),
    role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY NOT NULL DEFAULT 1,
    theme TEXT NOT NULL DEFAULT 'system',
    last_server_id TEXT,
    last_thread_id TEXT
  );
`;

export function bootstrapDatabase(database: Pick<SQLiteDatabase, 'execSync'>): void {
  database.execSync(schemaSql);
}
