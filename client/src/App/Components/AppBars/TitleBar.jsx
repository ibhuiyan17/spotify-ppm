import React from 'react';
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';
import { Label } from '../DataDisplay';
import { Image } from '../Helpers';

const styles = {
  title: {
    flexGrow: 1,
  },
};

function TitleBar({ backendUrl, loggedIn, logoutHandler }) {
  // call parent handler to handle logout
  function signalLogout(e) {
    e.preventDefault();
    logoutHandler();
  }

  // call parent handler to handle login
  function redirectLogin(e) {
    e.preventDefault();

    window.location.href = `${backendUrl}/login`;
  }

  return (
    <AppBar position="sticky" style={{maxHeight: 70}} color="primary">
    <Toolbar>
      <Image style={{ width: 30, height: 30, marginRight: 10}} imageSrc="/images/icon.png" />
      <Label style={styles.title}
        text="  Personalized Playlist Maker"
        variant="subtitle1"
        color="inherit"
      />
      {!loggedIn
        ? <Button
            onClick={e => redirectLogin(e)}
            color="inherit"
          >
            <Label
              text="Log in with Spotify"
              variant="body2"
              color="inherit"
            />
          </Button>
        : <Button
            onClick={e => signalLogout(e)}
            color="inherit"
          >
            Logout
          </Button>
      }
    </Toolbar>
  </AppBar>
  );
}

export default TitleBar;
