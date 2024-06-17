module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '@testing-library/react-native/dont-cleanup-after-each',
    '<rootDir>/jest.setup.js',  // Add the setup file here
  ],
  transform: {
    '^.+\\.[t|j]sx?$': ['babel-jest', { configFile: './babel-jest.config.js' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@react-native|react-native)/)',
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    '^react-native-google-places-autocomplete$': '<rootDir>/__mocks__/react-native-google-places-autocomplete.tsx',
    '^react-native-linear-gradient$': '<rootDir>/__mocks__/react-native-linear-gradient.tsx',
  },
};
