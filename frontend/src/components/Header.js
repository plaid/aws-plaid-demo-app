import React from "react";
import "./Header.css";
import { Flex } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import { useAuthenticator, Button} from '@aws-amplify/ui-react';
import { Outlet, useNavigate } from 'react-router-dom';

import Logo from "./Logo";
import HeaderNav from "./HeaderNav";
import HeaderSearchBar from "./HeaderSearchBar";

export default function Header() {
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
        <div className="header">
          <Flex
            direction="row"
            alignItems="center"
            wrap="nowrap"
            gap="1rem"
            justifyContent="space-between"
          >
            <div className="header-left">
              <div className="header-logo">
                <Link to="/">
                  <Logo />
                </Link>
              </div>
              <span>MonJDG</span>
            </div>  
            <div className="header-right">    
              <HeaderNav />
            </div>
          </Flex>
        </div>
      );
};
