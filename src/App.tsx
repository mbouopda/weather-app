// src/screens/App.tsx
import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, StatusBar, SafeAreaView} from 'react-native';
import {useWeather} from '@/hooks/useWeather';
import LocationInput from '@/components/location-input/LocationInput';
import WeatherDisplay from '@/components/weather-display/WeatherDisplay';
import ServiceSelector from '@/components/service-selector/ServiceSelector';
import weatherServices from '@/config/weatherServices';
import {validateLocation} from '@/utils/validateLocation';
import LinearGradientBackground from '@/components/gradient-background/GradientBackground';

const App: React.FC = () => {
  const [location, setLocation] = useState('London');
  const [service, setService] =
    useState<keyof typeof weatherServices>('service1');
  const {weather, loading, error, theme, setError} = useWeather(
    location,
    service,
  );

  const handleLocationSubmit = async (newLocation: string) => {
    try {
      const errorMessage = await validateLocation(newLocation);

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setLocation(newLocation);
      }
    } catch (err: any) {
      setError(err);
    }
  };

  const dynamicTextStyles = useCallback(
    () => ({
      ...styles.title,
      color: theme.textColor || '#000000',
    }),
    [theme],
  )();

  return (
    <LinearGradientBackground
      temperature={Number(weather?.temperature)}
      backgroundColors={theme.backgroundColors}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar hidden />
        <View style={[styles.container]}>
          <WeatherDisplay  weather={weather} loading={loading} error={error} />
          <ServiceSelector
            currentService={service}
            onServiceChange={setService}
          />
          <View style={styles.header}>
            <Text style={[dynamicTextStyles]}>Weather App</Text>
            <LocationInput onLocationSubmit={handleLocationSubmit} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});

export default App;
