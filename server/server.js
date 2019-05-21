/* eslint-disable no-console */

const express = require('express');
const SpotifyRequests = require('./spotify-requests');

const auth = require('./auth/app');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
const token = 'BQAERxbmUAK_xOiZ7aZqeROtWEaUGfOfh0HfdabgW_zwdnIvQb0uzRtbcPL6KbfJxM-cCIRB3hkKVmWLu1XtrkHGeDxF06STpFFFmJHZLUw7RUTiWAd3wTi_OiN9Ct5bNc3acEXmkK8iShc35GkdDlcMUuYnU-FPFMBfZhO4pZWkYFx5Gw';
const spotify = new SpotifyRequests(token);
let topTracks = []; // array of track objects containing trackID, name, and list of artists
let topArtists = [];
let featureAnalysis = {};

// GET route
app.get('/api/top', async (req, res) => {
  try {
    // get top tracks and filter results
    /*
    topTracks = await utils.getFilteredTopTracks(spotify, req.query.time_range);
    console.log('top tracks: ', topTracks);
    topArtists = await utils.getFilteredTopArtists(spotify, req.query.time_range);
    console.log('top artists: ', topArtists); */

    const resp = await Promise.all([
      utils.getFilteredTopTracks(spotify, req.query.time_range),
      utils.getFilteredTopArtists(spotify, req.query.time_range),
    ]);
    console.log(resp);
    featureAnalysis = await utils.calculateFeatureAnalysis(spotify, resp[0]);

    res.send(featureAnalysis);
  } catch (err) {
    console.log(err);
  }
});

// Start server and listen on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
