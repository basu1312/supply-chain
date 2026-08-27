const { withModuleFederation } = require('@module-federation/nextjs-mf');

module.exports = withModuleFederation({
  name: 'shipment',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './ShipmentApp': './src/bootstrap'
  },
  shared: {
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false }
  }
});
