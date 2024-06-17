// src/hooks/useWeather.ts
import {useState, useEffect} from 'react';
import weatherServices from '@/config/weatherServices';
import {WeatherServiceType, Theme} from '@/utils/types';

type WeatherServiceName = keyof typeof weatherServices;
interface WeatherState {
  weather: WeatherServiceType | null;
  theme: Theme;
}
export const useWeather = (location: string, service: WeatherServiceName) => {
  const [state, setState] = useState<WeatherState>({weather: null, theme: {}});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const {getWeatherService} = await weatherServices[service].module();
        const data = await getWeatherService(location);
        const weather = await weatherServices[service].transform(data);
        const theme = await weatherServices[service].theme();
        setState(prevState => ({...prevState, weather, theme}));
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location, service]);

  const {weather, theme} = state;

  return {weather, loading, error, theme, setError};
};
