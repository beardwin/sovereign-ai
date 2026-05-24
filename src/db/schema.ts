import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const servers = sqliteTable('servers', {
  id: text('id').primaryKey(),
  url: text('url').notNull(),
  api_key_id: text('api_key_id').notNull(),
  default_model: text('default_model').notNull().default(''),
  default_temperature: integer('default_temperature').notNull().default(0.7),
  system_prompt: text('system_prompt').notNull().default(''),
  created_at: text('created_at').notNull().default(new Date().toISOString()),
  updated_at: text('updated_at').notNull().default(new Date().toISOString()),
});

export const threads = sqliteTable('threads', {
  id: text('id').primaryKey(),
  server_id: text('server_id').notNull().references(() => servers.id),
  name: text('name').notNull().default('New Thread'),
  selected_model: text('selected_model').notNull().default(''),
  temperature_override: integer('temperature_override'),
  system_prompt_override: text('system_prompt_override'),
  created_at: text('created_at').notNull().default(new Date().toISOString()),
  updated_at: text('updated_at').notNull().default(new Date().toISOString()),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  thread_id: text('thread_id').notNull().references(() => threads.id),
  role: text('role', { enum: ['user', 'assistant'] }).notNull(),
  content: text('content').notNull(),
  created_at: text('created_at').notNull().default(new Date().toISOString()),
});

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey().notNull().default(1),
  theme: text('theme', { enum: ['light', 'dark', 'system'] }).notNull().default('system'),
  last_server_id: text('last_server_id'),
  last_thread_id: text('last_thread_id'),
});

export type Server = typeof servers.$inferSelect;
export type NewServer = typeof servers.$inferInsert;

export type Thread = typeof threads.$inferSelect;
export type NewThread = typeof threads.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;
