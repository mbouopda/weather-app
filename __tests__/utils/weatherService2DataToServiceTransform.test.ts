// src/services/__tests__/weatherServiceDataToServiceTransform.test.ts
import {weatherServiceDataToServiceTransform} from '@/utils/data-transformers/weatherService2DataToServiceTransform';
import {WeatherServiceType} from '@/utils/types';
import {waitFor} from '@testing-library/react-native';

describe('weatherServiceDataToServiceTransform',  () => {

  it('transforms weather data correctly', async() => {
    // Example weather data to simulate input
    const mockData = {
      name: 'New York',
      sys: {country: 'US'},
      main: {temp: 300}, // Temperature in Kelvin (300 K)
      weather: [{description: 'Partly cloudy'}],
    };

    // Expected output based on the transformation function
    const expectedService: WeatherServiceType = {
      location: 'New York, US',
      temperature: '27', // Converted to Celsius and rounded to 2 decimal places
      description: 'Partly cloudy',
    };

    // Call the transformation function
    const result = weatherServiceDataToServiceTransform(mockData);

    // Assert that the result matches the expected output
    await waitFor(() => {
      expect(result).toEqual(expectedService);
    });
  });

  it('handles undefined input gracefully', async () => {
    // Call the transformation function with undefined data
    const result = weatherServiceDataToServiceTransform(undefined);

    // Assert that the result is null or handles it gracefully based on your application logic
    await waitFor(() => {
      expect(result).toBeNull();
    });
  });
});
