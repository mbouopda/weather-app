// src/components/__tests__/SunnyDayBackground.test.tsx
import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';
import GradientBackground from '@/components/gradient-background/GradientBackground';
import {TemperatureColorMap} from '@/utils/types';

// Mock the getTemperatureColors function and TemperatureColorMap
jest.mock('@/utils/helpers', () => ({
  getTemperatureColors: jest.fn(() => ['#32CD32', '#FFD700']), // Mock colors for sunny day
}));

const mockChildren = <Text>Mock Children</Text>;
const mockTemperature = 25; // Mock temperature
const mockBackgroundColors: TemperatureColorMap = {
  freezing: [Number.NEGATIVE_INFINITY, 0, ['#1E90FF', '#4682B4']],
  cold: [0, 10, ['#4682B4', '#87CEEB']],
  cool: [10, 20, ['#87CEEB', '#32CD32']],
  warm: [20, 30, ['#32CD32', '#FFD700']],
  hot: [30, 40, ['#FFD700', '#FF8C00']],
  veryHot: [40, Number.POSITIVE_INFINITY, ['#FF8C00', '#DC143C']],
};

describe('GradientBackground', () => {
  it('renders Linear Gradient with correct props', () => {
    const {getByTestId} = render(
      <GradientBackground
        temperature={mockTemperature}
        backgroundColors={mockBackgroundColors}>
        {mockChildren}
      </GradientBackground>,
    );

    const linearGradientComponent = getByTestId('linear-gradient');
    expect(linearGradientComponent).toBeTruthy();

    // Verify that LinearGradient is rendered with the correct colors prop
    expect(linearGradientComponent.props.colors).toEqual([
      '#32CD32',
      '#FFD700',
    ]);

    // Verify that LinearGradient is rendered with the correct style prop
    expect(linearGradientComponent.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
      }),
    );
  });
});
