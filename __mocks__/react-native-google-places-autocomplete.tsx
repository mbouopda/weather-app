// __mocks__/react-native-google-places-autocomplete.tsx

import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface GooglePlacesAutocompleteProps extends Omit<TextInputProps, 'onPress'> {
  onPress: (data: any, details: any) => void;
  // Add any other necessary props here based on the actual usage
}

const GooglePlacesAutocomplete = React.forwardRef<TextInput, GooglePlacesAutocompleteProps>(
  ({ onPress, ...props }: GooglePlacesAutocompleteProps, ref) => (
    <TextInput
      {...props}
      onChangeText={(text: string) => onPress({ description: text }, { formatted_address: text })}
      testID="mock-google-places-autocomplete"
      ref={ref}
    />
  )
);

export { GooglePlacesAutocomplete };
