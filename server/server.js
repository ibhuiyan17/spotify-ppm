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
const token = 'BQByEtbkQZbqTPW2v_Run8owbEJ5jMSDibXERDepqJXxuMWrK4naG0cQR6d5uVfUX8Xi_A5ikNBuPSslGdngTsH9OOI7xrY_Mg81O2EB7SLLDg1Zi4lLsD83p3m0OMj8_a0-isLqpCq57tYZ5zDJDMWbFXPw-_YCGRsdxbo5TJpyqY1AXw';
const spotify = new SpotifyRequests(token);
let topTracks = []; // array of track objects containing trackID, name, and list of artists
let averageFeatures = {};

/*
  input: array of track objects
  output: object containing average features of input tracks
*/
function getAverageFeatures(trackList) {
  spotify.getFeatures(trackList.map(track => track.trackID))
    .then(spotifyResponse => utils.calculateAverageFeatures(spotifyResponse));
}

// GET route
app.get('/api/top', (req, res) => {
  spotify.getTopTracks(req.query.time_range)
    .then((spotifyResponse) => {
      topTracks = utils.filterTrackList(spotifyResponse);
      averageFeatures = getAverageFeatures(topTracks);
      res.send(averageFeatures);
    })
    .catch(() => res.send('error'));
});

// Start server and listen on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
