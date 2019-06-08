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
const token = 'BQCJ_nCjiaC7-Lzcy_RMMXH0WHXAtq9xlWKGbiZu_UmBuRVzrVzrHPf8yCsRLh2TvqE_PmZ3bXFGIHU0zPiNyRhiEoFyZxMRMzpCD1K8iYQZHVdw7m7J9UX7rKVF7xiCCBJdaQzKS7yjHv2BMK4lJEXesE_hfYBIy-FgZGxu2o3GSlr-xw';
const spotify = new SpotifyRequests(token);
const returnObject = {};
const NUM_TOTAL_SEEDS = 5; // max number of seeds suppoprted by spotify api


// GET route
app.get('/api/top', async (req, res) => {
  returnObject.parameters = {};
  try {
    /*
      initRequests[0] contains array of filtered topTracks
      initRequests[1] contains array of filtered topArtists
      initRequests[3] contains Spotify's availanle genre seeds
    */
    const initRequests = await Promise.all([
      utils.getFilteredTopTracks(spotify, req.query.time_range),
      utils.getFilteredTopArtists(spotify, req.query.time_range),
    ]);
    const featureAnalysis = await utils.calculateFeatureAnalysis(spotify, initRequests[0]);
    const topGenres = await utils.calculateTopKGenres(spotify, initRequests[1], req.query.num_genres);

    const numArtistSeeds = NUM_TOTAL_SEEDS - topGenres.length; // accounts for less genres available than requested
    returnObject.recommendations = await utils.getTargetRecommendations(
      spotify,
      featureAnalysis,
      topGenres,
      initRequests[1].slice(0, numArtistSeeds).map(artistObj => artistObj.artistID),
    );

    returnObject.parameters.topTracks = [...initRequests[0]];
    returnObject.parameters.topArtists = [...initRequests[1]];
    returnObject.parameters.featureAnalysis = featureAnalysis;
    returnObject.parameters.topKGenres = [...topGenres];

    res.send(returnObject);
  } catch (err) {
    console.log('err');
    console.log(err);
  }
});

// Start server and listen on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
