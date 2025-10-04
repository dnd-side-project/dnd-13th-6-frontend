module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
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
      'react-native-worklets/plugin', // 이 줄 추가
    ]
  };
};