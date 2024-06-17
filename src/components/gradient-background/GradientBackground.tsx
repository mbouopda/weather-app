// src/components/SunnyDayBackground.tsx
import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getTemperatureColors} from '@/utils/helpers';
import {TemperatureColorMap} from '@/utils/types';

interface GradientBackgroundProps {
  children: React.ReactNode;
  temperature: number;
  backgroundColors: TemperatureColorMap;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  temperature,
  backgroundColors,
}) => {
  const colors = getTemperatureColors(temperature, backgroundColors);
  return (
    <LinearGradient
      colors={colors}
      style={styles.background}
      testID="linear-gradient">
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default GradientBackground;
