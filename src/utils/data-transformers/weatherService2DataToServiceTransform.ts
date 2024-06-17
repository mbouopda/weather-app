import {WeatherServiceType} from '@/utils/types';

// src/services/weatherServiceDataToServiceTransform.ts
export const weatherServiceDataToServiceTransform = (data: any) => {
  if (!data) {
    return null;
  }

  const service: WeatherServiceType = {
    location: `${data.name}, ${data.sys.country}`,
    temperature: `${Math.round(data.main.temp - 273.15)}`,
    description: data.weather[0].description,
  };

  return service;
};
