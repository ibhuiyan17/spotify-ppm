// Desktop layout componenent.

import React from 'react';
import {
  Grid, Paper, Typography,
} from '@material-ui/core';
import {
  TopTracks, TopArtists, TopGenres, Results, NumSelected, Label,
} from '../Components/DataDisplay';
import { StartButton, ResetButton, ExportPlaylist } from '../Components/Control';


const styles = {
  Paper: {
    padding: 0,
    marginTop: 5,
    marginBottom: 2,
    marginLeft: 5,
    maxHeight: 400,
    overflow: 'auto', // makes it scrollable
  },
  topLabel: {
    marginLeft: 5,
    marginTop: 5,
  },
  resultLabel: {
    marginTop: 20,
  },
  numSelected: {
    position: 'fixed',
    right: 0,
    top: 80,
    width: '20%',
  },
  startButton: {
    position: 'fixed',
    right: 10,
    top: 350,
  },
  resetButton: {
    position: 'fixed',
    right: 10,
    top: 390,
  },
};

function StandardView({
  accessToken, profileData, topTracks, topArtists, topGenres, handleSeedSelect,
  numSelected, results, fetchResults, resetSelection,
}) {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs>
          <Label style={styles.topLabel} text="Your Top Tracks" variant="h6" color="secondary"/>
          <Paper style={styles.Paper} >
            <TopTracks
              trackList={topTracks}
              seedHandler={handleSeedSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Label style={styles.topLabel} text="Your Top Artists" variant="h6" color="secondary"/>
          <Paper style={styles.Paper}>
            <TopArtists
              artistList={topArtists}
              seedHandler={handleSeedSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Label style={styles.topLabel} text="Your Top Genres" variant="h6" color="secondary"/>
          <Paper style={styles.Paper}>
            <TopGenres
              genreList={topGenres}
              seedHandler={handleSeedSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs style={styles.numSelected}>
          <NumSelected
            count={numSelected}
          />
        </Grid>
        <Grid item xs style={styles.startButton}>
          <StartButton
            triggerFetch={fetchResults}
          />
        </Grid>
        <Grid item xs style={styles.resetButton}>
          <ResetButton
            triggerReset={resetSelection}
          />
        </Grid>
      </Grid>
      <Label style={styles.resultLabel} text="Results" variant="h3" color="secondary"/>
      {results.length !== 0
        ? <ExportPlaylist
            accessToken={accessToken}
            userID={profileData.id}
            playlist={results}
          />
        : null}
      <Results
        trackList={results}
      />
    </>
  );
}

export default StandardView;
