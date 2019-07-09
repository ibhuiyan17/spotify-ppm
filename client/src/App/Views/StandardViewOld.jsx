import React, { Component } from 'react';
import {
  Grid, Paper, Typography,
} from '@material-ui/core';
import {
  TopTracks, TopArtists, TopGenres, Results, NumSelected,
} from '../Components/DataDisplay';
import { StartButton, ResetButton } from '../Components/Control';

const styles = {
  Paper: {
    padding: 0,
    marginTop: 5,
    marginBottom: 2,
    marginLeft: 5,
    maxHeight: 400,
    overflow: 'auto', // makes it scrollable
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
  topTracks, topArtists, topGenres, handleSeedSelect, numSelected, results, fetchResults, resetSelection,
}) {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs>
          <Typography
            variant="h6"
            style={{ marginLeft: 5, marginTop: 5 }}
          >
            Your Top Tracks
          </Typography>
          <Paper style={styles.Paper} >
            <TopTracks
              trackList={topTracks}
              seedHandler={handleSeedSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Typography
            variant="h6"
            style={{ marginLeft: 5, marginTop: 5 }}
          >
            Your Top Artists
          </Typography>
          <Paper style={styles.Paper}>
            <TopArtists
              artistList={topArtists}
              seedHandler={handleSeedSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Typography
            variant="h6"
            style={{ marginLeft: 5, marginTop: 5 }}
          >
            Your Top Genres
          </Typography>
          <Paper style={styles.Paper}>
            <TopGenres
              genreList={topGenres}
              seedHandler={handleSeedSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs styles={styles.numSelected}>
          <NumSelected
            count={numSelected}
          />
        </Grid>
        <Grid item xs styles={styles.startButton}>
          <StartButton
            triggerFetch={fetchResults}
          />
        </Grid>
        <Grid item xs styles={styles.resetButton}>
          <ResetButton
            triggerReset={resetSelection}
          />
        </Grid>
      </Grid>


      <Typography
        variant="h3"
        style={{ marginTop: 20 }}
      >
        Results
      </Typography>
      <Results
        trackList={results}
      />
      <StartButton
        triggerFetch={fetchResults}
      />
    </>
  );
}

export default StandardView;
