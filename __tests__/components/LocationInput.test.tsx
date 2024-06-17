// LocationInput.test.tsx
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LocationInput from '@/components/location-input/LocationInput';
import {validateLocation as validateLocationMock} from '@/utils/validateLocation';

// Mock the validateLocation utility function
jest.mock('@/utils/validateLocation', () => ({
  validateLocation: jest.fn(),
}));

const validateLocation = validateLocationMock as jest.MockedFunction<
  typeof validateLocationMock
>;

describe('<LocationInput />', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock function calls before each test
  });

  it('submits location successfully', async () => {
    const mockOnLocationSubmit = jest.fn();
    validateLocation.mockResolvedValue(undefined); // Mock successful validation

    const {getByTestId, queryByTestId} = render(
      <LocationInput onLocationSubmit={mockOnLocationSubmit} />,
    );

    // Simulate entering text into the input field
    const input = getByTestId('mock-google-places-autocomplete');
    fireEvent.changeText(input, 'New York');

    // Simulate pressing the "Get Weather" button
    const submitButton = getByTestId('get-weather-button');
    fireEvent.press(submitButton);

    // Wait for the async validation to complete
    await waitFor(() =>
      expect(validateLocation).toHaveBeenCalledWith('New York'),
    );

    // Assert that onLocationSubmit function was called with the correct location
    expect(mockOnLocationSubmit).toHaveBeenCalledWith('New York');

    // Assert that error message is not displayed
    await waitFor(() => {
      expect(queryByTestId('get-weather-error')).toBeNull();
    });
  });

  it('displays error message on failed location validation', async () => {
    validateLocation.mockResolvedValue('Invalid location'); // Mock failed validation

    const {getByPlaceholderText, getByTestId, queryByTestId} = render(
      <LocationInput onLocationSubmit={jest.fn()} />,
    );

    // Simulate entering text into the input field
    const input = getByPlaceholderText('Enter location');
    fireEvent.changeText(input, 'Invalid Location');

    // Simulate pressing the "Get Weather" button
    const submitButton = getByTestId('get-weather-button');
    fireEvent.press(submitButton);

    // Wait for the async validation to complete
    await waitFor(() =>
      expect(validateLocation).toHaveBeenCalledWith('Invalid Location'),
    );

    // Assert that error message is displayed
    expect(queryByTestId('get-weather-error')).toBeTruthy();
  });

  it('displays error message on location fetch failure', async () => {
    validateLocation.mockResolvedValue('Validation failed'); // Mock validation failure

    const {getByPlaceholderText, getByTestId, queryByTestId} = render(
      <LocationInput onLocationSubmit={jest.fn()} />,
    );

    // Simulate entering text into the input field
    const input = getByPlaceholderText('Enter location');
    fireEvent.changeText(input, 'New York');

    // Simulate pressing the "Get Weather" button
    const submitButton = getByTestId('get-weather-button');
    fireEvent.press(submitButton);

    // Wait for the async validation to complete
    await waitFor(() =>
      expect(validateLocation).toHaveBeenCalledWith('New York'),
    );

    // Check if error message is displayed
    await waitFor(() => {
      expect(queryByTestId('get-weather-error')).toBeTruthy();
    });
  });
});
