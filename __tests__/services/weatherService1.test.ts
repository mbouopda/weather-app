// src/services/__tests__/weatherService1.test.ts
import {getWeatherService} from '@/services/weatherService1';
import fetchMock from 'jest-fetch-mock';

describe('getWeatherService', () => {
  beforeEach(() => {
    fetchMock.enableMocks(); // Enable mocking fetch
    fetchMock.resetMocks(); // Reset mocks before each test
  });

  it('fetches weather data successfully', async () => {
    const mockLocation = 'New York';
    const mockResponse = {
      location: {
        name: 'New York',
        country: 'United States of America',
      },
      current: {
        temp_c: 25,
        condition: {
          text: 'Sunny',
        },
      },
    };

    // Mock fetch function with jest-fetch-mock
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await getWeatherService(mockLocation);

    expect(result.location.name).toEqual('New York');
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.SERVICE1_URL}/forecast.json?q=${mockLocation}`,
      expect.objectContaining({
        method: 'GET',
        headers: {
          'x-rapidapi-key': expect.any(String),
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        },
      }),
    );
  });

  it('handles fetch error', async () => {
    const mockLocation = 'Invalid Location';
    const mockErrorMessage = 'No matching location found.';

    // Mock fetch function to simulate network error
    fetchMock.mockRejectOnce(new Error(mockErrorMessage));

    try {
      await getWeatherService(mockLocation);
    } catch (error: any) {
      expect(error.message).toBe(mockErrorMessage);
    }
  });
});
