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
// const token = 'BQBI-afTmIC88dO4IQL2H3oVqUBaFljybmKo0mJmb4YRDHxs0onNbcoX3B2Ftea2ItY5PFmUfOFqRwjrK8vCKj3WJl6HSnKNxnEysZ08j6x8oGq4tfbWWWPvFa5k7myblJJDVtTlc8W91Wb05hUX1_ySxJVoJ056AGk5hcBr_brHzhIa8g';
// const spotify = new SpotifyRequests(token);
const NUM_TOTAL_SEEDS = 5; // max number of seeds suppoprted by spotify api

/*
  GET user's data from spotify. Top 50 tracks
  and artists, feature analysis, and top genres
*/
app.get('/api/user/spotify_data', async (req, res) => {
  const returnObject = {};

  const spotify = new SpotifyRequests(req.query.access_token);

  // TODO: initialize spotify instance
  try {
    const [topTracks, topArtists] = await Promise.all([
      utils.getFilteredTopTracks(spotify, req.query.time_range),
      utils.getFilteredTopArtists(spotify, req.query.time_range),
    ]);
    const featureAnalysis = await utils.calculateFeatureAnalysis(spotify, topTracks);
    const topGenres = await utils.calculateTopKGenres(spotify, topArtists, req.query.num_genres);

    returnObject.topTracks = [...topTracks];
    returnObject.topArtists = [...topArtists];
    returnObject.featureAnalysis = featureAnalysis;
    returnObject.topGenres = [...topGenres];

    res.send(returnObject);
  } catch (err) {
    console.log(err);
    // return err;
  }
});


// GET recommendations
app.get('/api/recommendations', async (req, res) => {
  const returnObject = {
    recommendations: [],
  };
  const spotify = new SpotifyRequests(req.query.access_token);

  try {
    // returnObject.recommendations = await utils.getTargetRecommendations();
    returnObject.recommendations = await utils.getTargetRecommendations(spotify, req.query);

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
