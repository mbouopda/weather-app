module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
      'module:metro-react-native-babel-preset',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.ios.tsx',
            '.android.ts',
            '.android.tsx',
            '.ts',
            '.tsx',
          ],
          alias: {
            '@': './src/',
          },
        },
      ],
      ['module:react-native-dotenv'],
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }]
    ],
  };
  