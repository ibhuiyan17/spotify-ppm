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
const token = 'BQBqzb_1TVHVIHWPCy7Wg8bjZazzQOLJ4YW8jUW8pgljEjLlDERevaaHz0_QNaNTUjDQTWK_suiKBZKc6qTzxuUmyhleeb__WLG6Gl5znuPOsdO8A4advZDb1fWrWxhlrRioUhBdVTwgrlI-Pt_v2UqXJUMA9E_9JBenu0Mz91hm2ss94Q';
const spotify = new SpotifyRequests(token);
const NUM_TOTAL_SEEDS = 5; // max number of seeds suppoprted by spotify api

/*
  GET parameters for search. user's top 50 tracks
  and artists, feature analysis, and top genres
*/
app.get('/api/user/parameters', async (req, res) => {
  const returnObject = {};
  try {
    /*
      initRequests[0] contains array of filtered topTracks
      initRequests[1] contains array of filtered topArtists
    */
    const initRequests = await Promise.all([
      utils.getFilteredTopTracks(spotify, req.query.time_range),
      utils.getFilteredTopArtists(spotify, req.query.time_range),
    ]);
    const featureAnalysis = await utils.calculateFeatureAnalysis(spotify, initRequests[0]);
    const topGenres = await utils.calculateTopKGenres(spotify, initRequests[1], req.query.num_genres);

    returnObject.topTracks = [...initRequests[0]];
    returnObject.topArtists = [...initRequests[1]];
    returnObject.featureAnalysis = featureAnalysis;
    returnObject.topKGenres = [...topGenres];

    res.send(returnObject);
  } catch (err) {
    console.log(err);
    // return err;
  }
});


// GET recommendations
app.get('/api/recommendations', async (req, res) => {
  const returnObject = {};
  returnObject.parameters = {};
  try {
    /*
      initRequests[0] contains array of filtered topTracks
      initRequests[1] contains array of filtered topArtists
      initRequests[2] contains Spotify's available genre seeds
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
