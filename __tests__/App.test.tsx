import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import App from '@/App';
import {validateLocation as validateLocationMock} from '@/utils/validateLocation';

// Mock the validateLocation utility function
jest.mock('@/utils/validateLocation', () => ({
  validateLocation: jest.fn(),
}));

jest.mock('@/services/weatherService2', () => ({
  default: {
    getWeatherService: jest.fn(() => Promise.resolve({
      location: {name: 'Paris', sys:{
        country: 'FR'
      }},
      main: {
        temp: 300
      },
      weather: [{
        description: 'Partly cloudy'
      }]
    })),
  },
}));
jest.mock('@/services/weatherService1', () => ({
  default: {
    getWeatherService: jest.fn(() =>
      Promise.resolve({
        location: {name: 'New York', country: 'United States of America'},
        current: {temp_c: 20, condition: {text: 'Partly cloudy'}},
      }),
    ),
  },
}));

const validateLocation = validateLocationMock as jest.MockedFunction<
  typeof validateLocationMock
>;

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(<App />);
    expect(getByText('Weather App')).toBeDefined();
  });

  it('handles location submission correctly', async () => {
    const {getByTestId} = render(<App />);
    const locationInput = getByTestId('mock-google-places-autocomplete');
    const submitButton = getByTestId('get-weather-button');

    // Mocking validateLocation function to return falsy (no error)
    validateLocation.mockResolvedValue(undefined);

    fireEvent.changeText(locationInput, 'Paris');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(validateLocation).toHaveBeenCalledWith('Paris');
    });
  });
});
