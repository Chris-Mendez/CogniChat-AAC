const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Set required environment variables for expo-router
process.env.EXPO_ROUTER_APP_ROOT = __dirname;
process.env.EXPO_ROUTER_IMPORT_MODE = 'sync';

module.exports = config;