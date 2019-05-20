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
const token = 'BQCstfg3nAK2-WNTAM2ffREoGyC9zyBEwrcEWYw1GoeoUn0rlUIcDMDkwj0zlONKDUFVu0CCGWs4Qz5u4tbjC7HlPkFV9O0t3Tr8kVxYhr4oKK62WuICwA3oskzbPQ6uuGlqZ7tx8m7reIIom2tl86hUzHdqizgnICeUWUSO72rooFiA6w';
const spotify = new SpotifyRequests(token);
let topTracks = []; // array of track objects containing trackID, name, and list of artists
let featureAnalysis = {};

// GET route
app.get('/api/top', async (req, res) => {
  try {
    // get top tracks and filter results
    topTracks = await utils.getFilteredTopTracks(spotify, req.query.time_range);
    featureAnalysis = await utils.calculateFeatureAnalysis(spotify, topTracks);

    res.send(featureAnalysis);
  } catch (err) {
    console.log(err);
  }
});

// Start server and listen on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
