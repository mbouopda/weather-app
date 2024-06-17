// src/utils/__tests__/validateLocation.test.ts
import {validateLocation, locationSchema} from '@/utils/validateLocation';

describe('validateLocation', () => {
  it('returns undefined for valid location', async () => {
    const result = await validateLocation('New York');
    expect(result).toBeUndefined();
  });

  it('returns error message for empty location', async () => {
    const result = await validateLocation('');
    expect(result).toBe('Location is required');
  });

  it('returns error message for whitespace-only location', async () => {
    const result = await validateLocation('   ');
    expect(result).toBe('Location is required');
  });

  it('handles unexpected validation errors', async () => {
    // Mocking console.error to suppress error logs in test output
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Mocking yup string schema to throw an unexpected error
    const schemaValidateSpy = jest
      .spyOn(locationSchema, 'validate')
      .mockImplementationOnce(() => {
        throw new Error('Unexpected error');
      });

    const result = await validateLocation('New York');
    expect(result).toBe('Validation failed');

    // Cleanup: Restore the original implementation
    schemaValidateSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
