import React, {useState} from 'react';
import {View, Button, StyleSheet, Alert, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {validateLocation} from '@/utils/validateLocation';

interface Props {
  onLocationSubmit: (location: string) => void;
}

const ListEmptyComponent = () => (
  <View style={styles.listEmptyComponent}>
    <Text>No results were found</Text>
  </View>
);

const LocationInput: React.FC<Props> = ({onLocationSubmit}) => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelect = async (data: any, details: any = null) => {
    try {
      if (details) {
        setLocation(details.formatted_address);
        await validateLocation(details.formatted_address);
        setError(null);
        onLocationSubmit(details.formatted_address);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  const handleSubmit = async () => {
    const errorMessage = await validateLocation(location);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError(null);
      onLocationSubmit(location);
    }
  };

  const onFail = () => {
    setError('Failed to fetch location details');
  };

  const onNotFound = () => {
    setError('No results were found for the location');
  };

  return (
    <View style={styles.container} testID="location-container">
      <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          placeholder="Enter location"
          minLength={2}
          fetchDetails
          onPress={handleLocationSelect}
          onFail={onFail}
          onNotFound={onNotFound}
          query={{
            key: `${process.env.GOOGLE_PLACES_API_KEY}`,
            language: 'en',
            types: '(cities)',
          }}
          styles={{
            textInput: styles.input,
            listView: styles.listView,
          }}
          debounce={200}
          currentLocation={true}
          listEmptyComponent={<ListEmptyComponent />}
        />
        <Button
          title="Get Weather"
          onPress={handleSubmit}
          testID="get-weather-button"
        />
      </View>

      {error && (
        <Text testID="get-weather-error" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 16,
    position: 'relative',
    zIndex: 0,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
  listView: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 3,
    borderRadius: 8,
  },
  listEmptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationInput;
