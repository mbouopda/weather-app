import { TemperatureColorMap } from '@/utils/types';
import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

interface LinearGradientProps extends ViewProps {
  children?: ReactNode;
  temperature: number;
  backgroundColors: TemperatureColorMap;
}

const LinearGradient: React.FC<LinearGradientProps> = ({ children,temperature, backgroundColors, ...props }) => {
  return <View {...props} testID="linear-gradient">{children}</View>;
};

export default LinearGradient;
