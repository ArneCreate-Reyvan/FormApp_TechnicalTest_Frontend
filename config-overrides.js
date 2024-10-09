const webpack = require('webpack');
const { override, addWebpackPlugin } = require('customize-cra');

module.exports = override(
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser', // Ensures the process polyfill is correctly loaded
    })
  ),
  (config) => {
    config.resolve.fallback = {
      process: require.resolve('process/browser'), // Add process/browser as fallback
      buffer: require.resolve('buffer/'), // Add buffer fallback for Axios
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
    };
    config.resolve.extensions = ['.mjs', '.js', '.jsx', '.json', '.wasm'];
    return config;
  }
);
