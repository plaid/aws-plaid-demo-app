import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator, View } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';


export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';



  const authConfig = {
    Auth: {
      region: process.env.REACT_APP_REGION,
      userPoolId: process.env.REACT_APP_COGNTIO_USERPOOL_ID,
      userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
      mandatorySignIn: true,
      oauth: {
        domain: process.env.REACT_APP_COGNITO_DOMAIN,
        scope: ['email', 'openid', `${process.env.REACT_APP_BACKEND_URL}/plaid.rw}`],
        responseType: "code"
      },
  },
  };

  const federated = { googleClientId: "705034194853-kht77urbsc6l7evgs7khk48h7lej835f.apps.googleusercontent.com"}


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
      <Authenticator components={components} amplifyConfig={authConf} federated={federated} socialProviders={['google']}/>
    </View>
  );
}
