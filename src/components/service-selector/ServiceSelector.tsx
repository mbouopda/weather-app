// src/components/service-selector/ServiceSelector.tsx
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import weatherServices from '@/config/weatherServices';

interface ServiceSelectorProps {
  currentService: string;
  onServiceChange: (service: string) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  currentService,
  onServiceChange,
}) => {
  return (
    <View style={styles.container}>
      {Object.keys(weatherServices).map(service => (
        <TouchableOpacity
          key={service}
          style={[
            styles.button,
            currentService === service && styles.selectedButton,
          ]}
          onPress={() => onServiceChange(service)}
          disabled={currentService === service}>
          <Text
            style={[
              styles.buttonText,
              currentService === service && styles.selectedButtonText,
            ]}>{`Use ${weatherServices[service].name}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 16,
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
    marginBottom: 16,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  selectedButtonText: {
    color: '#ffffff',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
  },
});

export default ServiceSelector;
