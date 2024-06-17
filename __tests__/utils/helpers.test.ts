// src/utils/__tests__/helpers.test.ts
import {getTemperatureColors, capitalizeFirstLetter} from '@/utils/helpers';
import {TemperatureColorMap} from '@/utils/types';

describe('getTemperatureColors', () => {
  const temperatureColorMap: TemperatureColorMap = {
    freezing: [Number.NEGATIVE_INFINITY, 0, ['#00BFFF', '#1E90FF']],
    cold: [0, 10, ['#1E90FF', '#87CEFA']],
    cool: [10, 20, ['#87CEFA', '#00FF7F']],
    warm: [20, 30, ['#00FF7F', '#FFD700']],
    hot: [30, 40, ['#FFD700', '#FFA500']],
    veryHot: [40, Number.POSITIVE_INFINITY, ['#FFA500', '#FF4500']],
  };

  it('returns correct colors for freezing temperature', () => {
    const temperature = -10; // Example temperature for freezing
    const expectedColors = ['#00BFFF', '#1E90FF'];
    const result = getTemperatureColors(temperature, temperatureColorMap);
    expect(result).toEqual(expectedColors);
  });

  it('returns correct colors for cold temperature', () => {
    const temperature = 5; // Example temperature for cold
    const expectedColors = ['#1E90FF', '#87CEFA'];
    const result = getTemperatureColors(temperature, temperatureColorMap);
    expect(result).toEqual(expectedColors);
  });

  it('returns correct colors for warm temperature', () => {
    const temperature = 25; // Example temperature for warm
    const expectedColors = ['#00FF7F', '#FFD700'];
    const result = getTemperatureColors(temperature, temperatureColorMap);
    expect(result).toEqual(expectedColors);
  });

  describe('capitalizeFirstLetter', () => {
    it('capitalizes the first letter of a string', () => {
      const input = 'hello';
      const expectedOutput = 'Hello';
      const result = capitalizeFirstLetter(input);
      expect(result).toBe(expectedOutput);
    });

    it('handles an empty string', () => {
      const input = '';
      const expectedOutput = '';
      const result = capitalizeFirstLetter(input);
      expect(result).toBe(expectedOutput);
    });

    it('handles a string with only one character', () => {
      const input = 'a';
      const expectedOutput = 'A';
      const result = capitalizeFirstLetter(input);
      expect(result).toBe(expectedOutput);
    });

    it('does not change already capitalized strings', () => {
      const input = 'Hello';
      const expectedOutput = 'Hello';
      const result = capitalizeFirstLetter(input);
      expect(result).toBe(expectedOutput);
    });
  });
});
