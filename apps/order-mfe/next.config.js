const { withModuleFederation } = require('@module-federation/nextjs-mf');

module.exports = withModuleFederation({
  name: 'order',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './OrderApp': './src/bootstrap'
  },
  shared: {
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false }
  }
});
