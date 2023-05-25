import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator, View } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';


export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';

  

  const federated = { googleClientId: "705034194853-kht77urbsc6l7evgs7khk48h7lej835f.apps.googleusercontent.com"}

  const authConf =
  {
    aws_appsync_graphqlEndpoint: process.env.REACT_APP_GRAPHQL_URL,
    aws_appsync_region: process.env.REACT_APP_REGION,
    aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    Auth: {
      region: process.env.REACT_APP_REGION,
      userPoolId: process.env.REACT_APP_COGNTIO_USERPOOL_ID,
      userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
      mandatorySignIn: true,
      oauth: {
        domain: process.env.REACT_APP_COGNITO_DOMAIN,
        scope: ['email', 'openid', `${process.env.REACT_APP_BACKEND_URL}/plaid.rw}`],
        responseType: 'code'
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
  }

  const components = {
    SignUp: {
      Footer() {
        return (
          <View textAlign="center">
            <strong>Password Policy</strong>:
            <ul>
              <li>Minimum of 8 characters</li>
              <li>At least one lowercase character</li>
              <li>At least one uppercase character</li>
              <li>At least one number character</li>
              <li>At least one symbol character</li>
            </ul>
          </View>
        );
      }
    }
  }

  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);

  return (
    <View className="auth-wrapper">
      <Authenticator components={components} federated={federated} amplifyConfig={authConf} socialProviders={['google']}/>
    </View>
  );
}
