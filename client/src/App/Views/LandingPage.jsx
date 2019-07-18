import React from 'react';
import { Grid } from '@material-ui/core';
import { Label } from '../Components/DataDisplay';
import { GithubChip } from '../Components/Control';
import { Image } from '../Components/Helpers';

const styles = {
  centeredLabel: {
    margin: 30,
    textAlign: 'center',
  }, /*
  centeredImage: {
    display: 'block',
    marginLeft: 150,
    marginRight: 150,
    maxWidth: '70%',
    maxHieght: '100vh',
  }, */
  chip: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function LandingPage() {
  return (
    <>
      <Label style={styles.centeredLabel}
        text="Make relevant playlists with the click of a few buttons"
        variant="h4"
        color="secondary"
      />
      <Label style={styles.centeredLabel}
        text="Pick any combination of up to 5 seeds from your top Tracks, Artists, and Genres to generate a playlist"
        variant="h5"
        color="secondary"
      />
      <Label style={styles.centeredLabel}
        text="Export playlists directly to your spotify account"
        variant="h5"
        color="secondary"
      />
      <Label style={styles.centeredLabel}
        text="Note: all of the data displayed in this app is provided by and falls under the rights of Spotify"
        variant="h6"
        color="inherit"
      />
      <div style={styles.chip}>
        <GithubChip />
      </div>
    </>
  );
  // { position: 'absolute', left: '50%', marginBottom: 15 }
}

export default LandingPage;
