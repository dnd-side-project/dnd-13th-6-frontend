const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Path alias 설정 추가
config.resolver.alias = {
  '@': '.',
  '@/components': './components',
  '@/constants': './constants',
  '@/hooks': './hooks',
  '@/assets': './assets',
};

module.exports = config; 