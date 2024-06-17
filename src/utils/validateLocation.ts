// src/utils/validateLocation.ts
import * as yup from 'yup';

export const locationSchema = yup
  .string()
  .required('Location is required')
  .trim();

export const validateLocation = async (
  location: string,
): Promise<string | undefined> => {
  try {
    await locationSchema.validate(location);
    return undefined; // No error if validation passes
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message; // Return the validation error message
    }
    return 'Validation failed'; // Fallback error message
  }
};
