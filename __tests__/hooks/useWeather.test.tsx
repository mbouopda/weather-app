// src/hooks/__tests__/useWeather.test.ts
import {renderHook} from '@testing-library/react-hooks';
import {useWeather} from '@/hooks/useWeather';
import weatherServices from '@/config/weatherServices';

// Mocking weatherServices
jest.mock('@/config/weatherServices', () => ({
  service1: {
    module: jest.fn().mockResolvedValue({
      getWeatherService: jest
        .fn()
        .mockResolvedValue({temperature: 25, description: 'sunny'}),
    }),
    transform: jest.fn().mockResolvedValue({
      temperature: 25,
      description: 'sunny',
      location: 'Test City',
    }),
    theme: jest
      .fn()
      .mockResolvedValue({backgroundColor: ['#FFD700', '#87CEEB']}),
  },
  service2: {
    module: jest.fn().mockResolvedValue({
      getWeatherService: jest
        .fn()
        .mockResolvedValue({temperature: 10, description: 'rainy'}),
    }),
    transform: jest.fn().mockResolvedValue({
      temperature: 10,
      description: 'rainy',
      location: 'Test City',
    }),
    theme: jest
      .fn()
      .mockResolvedValue({backgroundColor: ['#00BFFF', '#1E90FF']}),
  },
}));

describe('useWeather', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches weather data and sets state correctly for service1', async () => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useWeather('Test City', 'service1'),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.weather).toEqual({
      temperature: 25,
      description: 'sunny',
      location: 'Test City',
    });
    expect(result.current.theme).toEqual({
      backgroundColor: ['#FFD700', '#87CEEB'],
    });
    expect(result.current.error).toBeNull();
  });

  it('fetches weather data and sets state correctly for service2', async () => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useWeather('Test City', 'service2'),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.weather).toEqual({
      temperature: 10,
      description: 'rainy',
      location: 'Test City',
    });
    expect(result.current.theme).toEqual({
      backgroundColor: ['#00BFFF', '#1E90FF'],
    });
    expect(result.current.error).toBeNull();
  });

  it('handles error correctly', async () => {
    (weatherServices.service1.module as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch'),
    );

    const {result, waitForNextUpdate} = renderHook(() =>
      useWeather('Test City', 'service1'),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.weather).toBeNull();
    expect(result.current.theme).toEqual({});
    expect(result.current.error).toBe('Failed to fetch weather data');
  });
});
