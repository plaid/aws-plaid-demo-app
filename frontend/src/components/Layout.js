import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button, Heading, View, Badge } from '@aws-amplify/ui-react';
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import "./Layout.css";



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
    <div className="layout-container">
    <>
      <nav>
        <Header></Header>
      </nav>
      <SideBar />      
      <div className="page-container">

      <Heading level={2}>MonJDG</Heading>
      <Outlet />
      </div>
      <Footer></Footer>
    </>
    </div>
  );
}
