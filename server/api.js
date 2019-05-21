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
const token = 'BQBB3HhQm0ef2O0QccMtlFLXohr2AZ4nkt_VwtnN1dQP4Na6LizLOzwt3aQf6VhP13bIyZFh4DCDUx8RjK8etNEBy3RC5nvUapKfRp6zaNuAOCGMaJdTBmo8h8Y36HzkVZm69Z0UKQKy6Rtu3sFAWTlm227WvDQzZenKHydGx0VYEs1R6A';
const spotify = new SpotifyRequests(token);
const returnObject = {};


// GET route
app.get('/api/top', async (req, res) => {
  returnObject.searchQueries = {};
  try {
    // userTop[0] contains array of filtered topTracks, userTop[1] contains array of filtered topArtists
    const userTop = await Promise.all([
      utils.getFilteredTopTracks(spotify, req.query.time_range),
      utils.getFilteredTopArtists(spotify, req.query.time_range),
    ]);
    const featureAnalysis = await utils.calculateFeatureAnalysis(spotify, userTop[0]);
    const topGenres = utils.calculateTopKGenres(userTop[1]);

    returnObject.searchQueries.topTracks = [...userTop[0]];
    returnObject.searchQueries.topArtists = [...userTop[1]];
    returnObject.searchQueries.featureAnalysis = featureAnalysis;
    returnObject.searchQueries.topKGenres = [...topGenres];
    returnObject.recommendations = await utils.getTargetReccommendations(
      spotify,
      returnObject.searchQueries,
    );
    
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
