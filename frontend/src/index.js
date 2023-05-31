

import { createRoot } from 'react-dom/client';
import { Amplify, Auth, API } from "aws-amplify";
import App from './App';

import '@aws-amplify/ui-react/styles.css';
import '@fontsource-variable/inter';
import "./index.css";


const container = document.getElementById('root');
const root = createRoot(container);

Amplify.Logger.LOG_LEVEL = 'VERBOSE';

Amplify.configure({
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_GRAPHQL_URL,
  aws_appsync_region: process.env.REACT_APP_REGION,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  Auth: {
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_COGNTIO_USERPOOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    mandatorySignIn: true,
    cookieStorage: {
      // - Cookie domain (only required if cookieStorage is provided)
      domain: '.monjdg.com',
      // (optional) - Cookie path
      path: '/',
      // (optional) - Cookie expiration in days
      expires: 365,
      // (optional) - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      sameSite: 'lax',
      // (optional) - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: false
    },
    oauth: {
      domain: process.env.REACT_APP_COGNITO_DOMAIN,
      scope: ['openid', 'email', 'profile', 'aws.cognito.signin.user.admin'],
      responseType: 'code',
      redirectSignIn: 'https://monjdg.com',
      redirectSignOut: 'https://monjdg.com',
    }
  },
  API: {
    endpoints: [
      {
        name: "plaidapi",
        endpoint: process.env.REACT_APP_BACKEND_URL,
        region: process.env.REACT_APP_REGION,
        clientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
        custom_header: async () => {
          return { Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
        }
      }
    ]
  }
});


root.render(<App />);