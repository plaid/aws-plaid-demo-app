import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button, Heading, View, Badge } from '@aws-amplify/ui-react';
import Header from './Header';
import Footer from './Footer';



export default function Layout() {
  const { route, signOut, user } = useAuthenticator((context) => [
    context.route,
    context.signOut,
    context.user
  ]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate('/login');
  }
  return (
    <>
      <nav>
        <Header></Header>
      </nav>
      <Heading level={2}>MonJDG Finance</Heading>
      <View>
        {route === 'authenticated' ? <Badge>{user.signInUserSession.idToken.payload.email}</Badge> : 'Please Login!'}
      </View>
      

      <Outlet />
      <Footer></Footer>
    </>
  );
}
