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
const token = 'BQAEnBOTi3xE53fqeVpSAKqH0qOA_0kRMdBnf38WovdHDmHKrK-0QHpt2exYIR-SsFuSYL4ba9DrCgUPvspCad19IcVy_ZTcLwhVIbZoeC982PzoeEXxUNZFU0eQzfGYiN7YDhqJLTRo9sTA-nuFPCPgqwEoAQUopji1LB4KGv6CFa0XmA';
const spotify = new SpotifyRequests(token);
const returnObject = {};
const NUM_TOTAL_SEEDS = 5; // max number of seeds suppoprted by spotify api


// GET route
app.get('/api/top', async (req, res) => {
  returnObject.searchQueries = {};
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

    returnObject.searchQueries.topTracks = [...initRequests[0]];
    returnObject.searchQueries.topArtists = [...initRequests[1]];
    returnObject.searchQueries.featureAnalysis = featureAnalysis;
    returnObject.searchQueries.topKGenres = [...topGenres];
    returnObject.recommendations = await utils.getTargetRecommendations(
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
