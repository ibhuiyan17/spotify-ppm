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
const token = 'BQB5OeDwLKU8XoqVgu-QzvvYe60Cv_nwDDK3cjxgrRij3M2e2kxJT3aKFwTuFAt0znbCIk5UgQh07ch0AtGFZeFEG3vFCaD78zVmsd4M9BeIsCMjFoN88LTEy-2h1yScYsjc6bNbN4YBYRMrzkpA3XScEb-6LT96Lx139-_hQcwSMoQ9EA';
const spotify = new SpotifyRequests(token);
let topTracks = []; // array of track objects containing trackID, name, and list of artists
let averageFeatures = {};

// GET route
app.get('/api/top', async (req, res) => {
  try {
    // get top tracks and filter results
    topTracks = await utils.getFilteredTopTracks(spotify, req.query.time_range);
    averageFeatures = await utils.calculateAverageFeatures(spotify, topTracks);
    res.send(averageFeatures);
  } catch (err) {
    console.log(err);
  }
});

// Start server and listen on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
