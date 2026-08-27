const { withModuleFederation } = require('@module-federation/nextjs-mf');

module.exports = withModuleFederation({
  name: 'dashboard',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './DashboardApp': './src/bootstrap'
  },
  shared: {
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false }
  }
});
