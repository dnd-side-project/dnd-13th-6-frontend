module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],

    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './components',
            '@': './',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ]
  };
};