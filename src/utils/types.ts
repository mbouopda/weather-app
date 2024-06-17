interface WeatherServiceType {
  location: string;
  temperature: string;
  description?: string;
}

type Theme = Record<string, string | any>;
type TemperatureColorMap = {
  [key: string]: [number, number, [string, string]];
};

export type {WeatherServiceType, Theme, TemperatureColorMap};
