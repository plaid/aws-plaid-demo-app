import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator, View } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';

  const components = {
    SignUp: {
      Footer() {
        return (
          <View textAlign="center">
            <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })}>Open Google</button>
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
      <Authenticator components={components} socialProviders={['google']}/>
    </View>
  );
}
