// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: ['import', '@typescript-eslint'],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "./tsconfig.json",
      "tsconfigRootDir": "./"
    },
    "extends": [
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    settings: {
      "import/resolver": {
        "alias": {
          "map": [
            ["@", "./"],
            ["@components", "./components"]
          ],
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        },
        "typescript": {
          "project": "./tsconfig.json"
        }
      },
    }
  },
]);
