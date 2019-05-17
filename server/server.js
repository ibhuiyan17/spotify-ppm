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
const token = 'BQCYhqdgQAj03Kbf_kFUb3La1iVuq_ka-8mBZvEk1gJeZ8b_FmjMU-IfU-Rvdklm4gKeiOvSoKzy-hK-H0zUJM6iKcn-wCx11J8mix_STA0SWXC63Hb4VNmMBwODvIuJVp5qtRwtdJB-LlKwcoDpw7tokSeEgWv6QoBxqGcSj3qsg79D-g';
const spotify = new SpotifyRequests(token);
let topTracks = []; // array of track objects containing trackID, name, and list of artists
let averageFeatures = {};
let medianFeatures = {};

// GET route
app.get('/api/top', async (req, res) => {
  try {
    // get top tracks and filter results
    topTracks = await utils.getFilteredTopTracks(spotify, req.query.time_range);
    averageFeatures = await utils.calculateAverageFeatures(spotify, topTracks);
    medianFeatures = await utils.calculateMedianFeatures(spotify, topTracks);
    res.send(medianFeatures);
  } catch (err) {
    console.log(err);
  }
});

// Start server and listen on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
