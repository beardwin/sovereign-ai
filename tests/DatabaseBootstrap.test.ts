import { describe, expect, it, vi } from 'vitest';
import { bootstrapDatabase, schemaSql } from '../src/db/bootstrap';

describe('bootstrapDatabase', () => {
  it('executes the schema with execSync', () => {
    const execSync = vi.fn();

    bootstrapDatabase({ execSync });

    expect(execSync).toHaveBeenCalledOnce();
    expect(execSync).toHaveBeenCalledWith(schemaSql);
  });

  it('includes the settings table in the schema SQL', () => {
    expect(schemaSql).toContain('CREATE TABLE IF NOT EXISTS settings');
  });
});
