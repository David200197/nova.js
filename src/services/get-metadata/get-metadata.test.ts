import { vi, afterAll } from 'vitest';
const READ_FILE_SYNC_RESPONSE = `this is a read file sync response`;
vi.mock('fs', () => {
  return {
    readFileSync: vi.fn(() => READ_FILE_SYNC_RESPONSE),
  };
});
import { describe, expect, it } from 'vitest';
import { getMetadata } from '.';

describe('getMetadata', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('Should return the correct data', () => {
    const path = '/src/Home.nova';
    const metadata = getMetadata(path);
    const expected = {
      data: READ_FILE_SYNC_RESPONSE,
      fileName: 'Home.nova',
      folder: '/src',
      name: 'Home',
      path,
    };
    expect(metadata).toEqual(expected);
  });
  it('Should return the same value', () => {
    const path = '';
    const metadata = getMetadata(path);
    const expected = {
      data: READ_FILE_SYNC_RESPONSE,
      fileName: path,
      folder: path,
      name: path,
      path,
    };
    expect(metadata).toEqual(expected);
  });
});
