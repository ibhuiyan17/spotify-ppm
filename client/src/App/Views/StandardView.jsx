import React, { Component } from 'react';
import {
  Grid, Paper, Typography,
} from '@material-ui/core';
import {
  StartButton, TopTracks, TopArtists, TopGenres, Results,
} from '../Components';

const styles = {
  Paper: {
    padding: 0,
    marginTop: 5,
    marginBottom: 2,
    marginLeft: 5,
    maxHeight: 400,
    overflow: 'auto', // makes it scrollable
  },
};

function StandardView({
  topTracks, topArtists, topGenres, handleSeedSelect, results, fetchResults,
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