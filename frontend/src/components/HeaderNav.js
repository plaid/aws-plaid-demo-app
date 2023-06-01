import React from "react";
import { Menu, MenuItem, MenuButton, Link, useAuthenticator, View, Badge  } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";


export default function HeaderNav() {
  const { route, signOut, user } = useAuthenticator((context) => [
    context.route,
    context.signOut,
    context.user
  ]);

  function logOut() {
    signOut();
    navigate('/login');
  }

  const navigate = useNavigate();
  return (
    <>
      {"https://monjdg.com" ? (
        <div className="github-link">
          <Link
            href="https://monjdg.com"
            isExternal={true}
            ariaLabel="github"
          >
          </Link>
        </div>
      ) : (
        <></>
      )}

      <Menu
        menuAlign="end"
        trigger={
          <MenuButton variation="menu">
          <View>
            {route === 'authenticated' ? <Badge>{user.signInUserSession.idToken.payload.email}</Badge> : 'Menu'}
          </View>
          </MenuButton>
        }
      >
        <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem onClick={() => logOut()}>Logout</MenuItem>
      </Menu>
    </>
  );
};
