import './_static/js/sdk-ui.js';
import routes from './routes.js';

console.log('Set AM configuration');

forgerock.Config.set({
  clientId: 'WebOAuthClient',
  redirectUri: 'https://sdkapp.example.com:8443/_callback',
  scope: 'openid profile me.read',
  serverConfig: {
    baseUrl: 'https://default.iam.example.com:51927/am',
    timeout: '90000',
  },
  realmPath: 'root',
  tree: 'UsernamePassword',
});

console.log('Initiate routes')
routes(document.getElementById('root'));
