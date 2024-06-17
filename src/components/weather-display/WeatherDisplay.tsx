// src/components/weather-display/WeatherDisplay.tsx
import {capitalizeFirstLetter} from '@/utils/helpers';
import {WeatherServiceType} from '@/utils/types';
import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface Props {
  weather: WeatherServiceType | null;
  loading: boolean;
  error: string | null;
}

const {height} = Dimensions.get('window');

const WeatherDisplay: React.FC<Props> = ({weather, loading, error}) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {weather && (
            <>
              <View>
                <Text style={styles.cityText}>{weather.location}</Text>
              </View>
              <Text style={styles.temperatureText}>
                {Number(weather.temperature)}°
              </Text>
              {weather.description && (
                <Text style={styles.text}>
                  {capitalizeFirstLetter(weather.description)}
                </Text>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    position: 'relative',
    marginTop: 0.22 * height,
  },
  temperatureText: {
    fontSize: 64,
    color: 'white',
    marginBottom: 8,
  },
  cityText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default WeatherDisplay;
