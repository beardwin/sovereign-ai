const { withPodfileProperties } = require('@expo/config-plugins');

module.exports = function withNoPrecompiledExpoModules(config) {
  return withPodfileProperties(config, (configuration) => {
    configuration.modResults.EXPO_USE_PRECOMPILED_MODULES = 'false';
    return configuration;
  });
};
