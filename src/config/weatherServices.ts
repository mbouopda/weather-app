// src/config/weatherServices.ts
import {Theme} from '@/utils/types';

interface WeatherServiceConfig {
  name: string;
  module: () => Promise<{
    getWeatherService: (location: string) => Promise<any>;
  }>;
  theme: () => Promise<Theme>;
  transform: (data: any) => Promise<any>;
}

const weatherServices: Record<string, WeatherServiceConfig> = {
  service1: {
    name: 'Service1',
    module: () => import('@/services/weatherService1'),
    theme: () =>
      import('@/themes/weatherService1Theme').then(
        module => module.weatherServiceTheme,
      ),
    transform: (data: any) =>
      import(
        '@/utils/data-transformers/weatherService1DataToServiceTransform'
      ).then(module => module.weatherServiceDataToServiceTransform(data)),
  },
  service2: {
    name: 'Service2',
    module: () => import('@/services/weatherService2'),
    theme: () =>
      import('@/themes/weatherService2Theme').then(
        module => module.weatherServiceTheme,
      ),
    transform: async (data: any) =>
      import(
        '@/utils/data-transformers/weatherService2DataToServiceTransform'
      ).then(module => module.weatherServiceDataToServiceTransform(data)),
  },
};

export default weatherServices;
