import {TemperatureColorMap} from './types';

// src/utils/capitalizeFirstLetter.ts
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getTemperatureColors = (
  temperature: number,
  temperatureColorMap: TemperatureColorMap,
): [string, string] => {
  for (const key in temperatureColorMap) {
    const [min, max, colors] = temperatureColorMap[key];
    if (temperature > min && temperature <= max) {
      return colors;
    }
  }
  return ['#FFFFFF', '#FFFFFF'];
};
