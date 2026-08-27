const { withModuleFederation } = require('@module-federation/nextjs-mf');

module.exports = withModuleFederation({
  name: 'inventory',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './InventoryApp': './src/bootstrap'
  },
  shared: {
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false }
  }
});
