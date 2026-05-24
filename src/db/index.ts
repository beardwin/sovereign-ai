import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import type { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { bootstrapDatabase } from './bootstrap';
import { servers, threads, messages, settings } from './schema';

const schema = { servers, threads, messages, settings };

const database = SQLite.openDatabaseSync('sovereign-ai.db');
bootstrapDatabase(database);

export const db: ExpoSQLiteDatabase<typeof schema> = drizzle(database, {
  schema,
});

export type Database = ExpoSQLiteDatabase<typeof schema>;

export { database };
