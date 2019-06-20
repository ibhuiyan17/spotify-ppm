import React from 'react';
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';

const styles = {
  title: {
    flexGrow: 1,
  },
};

function TitleBar() {
  return (
    <AppBar position="sticky">
    <Toolbar>
      <Typography variant="h6" style={styles.title}>
        Spotify: Personalized Playlist Builder
      </Typography>
      <Button color="inherit">Logout</Button>
    </Toolbar>
  </AppBar>
  );
}

export default TitleBar;
