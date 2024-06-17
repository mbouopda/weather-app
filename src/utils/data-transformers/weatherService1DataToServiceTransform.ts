import {WeatherServiceType} from '@/utils/types';

// src/services/weatherServiceDataToServiceTransform.ts
export const weatherServiceDataToServiceTransform = (data: any) => {
  if (!data) {
    return null;
  }

  const service: WeatherServiceType = {
    location: `${data.location.name}, ${data.location.country}`,
    temperature: `${data.current.temp_c}`,
    description: data.current.condition.text,
  };

  return service;
};
