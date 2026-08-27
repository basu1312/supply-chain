const { withModuleFederation } = require('@module-federation/nextjs-mf');

module.exports = withModuleFederation({
  name: 'shell',
  remotes: {
    dashboard: 'dashboard@http://localhost:3001/_next/static/chunks/remoteEntry.js',
    shipment: 'shipment@http://localhost:3002/_next/static/chunks/remoteEntry.js',
    inventory: 'inventory@http://localhost:3003/_next/static/chunks/remoteEntry.js',
    order: 'order@http://localhost:3004/_next/static/chunks/remoteEntry.js'
  },
  shared: {
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false }
  }
});
