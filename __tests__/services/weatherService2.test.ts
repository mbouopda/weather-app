// src/services/__tests__/weatherService2.test.ts
import {getWeatherService} from '@/services/weatherService2';
import fetchMock from 'jest-fetch-mock';

describe('getWeatherService', () => {
  beforeEach(() => {
    fetchMock.enableMocks(); // Enable mocking fetch
    fetchMock.resetMocks(); // Reset mocks before each test
  });

  it('fetches weather data successfully', async () => {
    const mockLocation = 'New York';
    const mockResponse = {
      name: 'New York',
      sys: {
        country: 'US',
      },
      main: {
        temp: 280.15,
      },
      weather: [
        {
          description: 'Clear sky',
        },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const data = await getWeatherService(mockLocation);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.SERVICE2_URL}/data/2.5/weather?q=${mockLocation}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': expect.any(String),
          'x-rapidapi-host': 'rapidweather.p.rapidapi.com',
        },
      },
    );

    expect(data.name).toEqual('New York');
  });

  it('handles fetch error', async () => {
    const mockLocation = 'Invalid Location';
    const mockErrorMessage = 'Failed to fetch';

    fetchMock.mockRejectOnce(new Error(mockErrorMessage));

    try {
      await getWeatherService(mockLocation);
    } catch (error: any) {
      expect(error.message).toBe(mockErrorMessage);
    }
  });
});
