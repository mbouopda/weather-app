module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@babel/eslint-parser',
  requireConfigFile: false,
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
