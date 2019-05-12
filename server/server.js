/* eslint-disable no-console */

const express = require('express');
const axios = require('axios');
const SpotifyRequests = require('./spotify-requests');

const auth = require('./auth/app');

const app = express();
const port = process.env.PORT || 3001;


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// GET route
app.get('/api/recents', (req, res) => {
  const token = 'BQBABE87R_ourSyXtRPQRWFeAuSObQCtgTF6NsocwnZxa67dsvju5RiK8GApKal81TrMygShE0Ta6b8baCJA9U74TCZlKYm5KYKDpWGW4cIWJlNhAJCSGb9BGSXBsy8BjXPcymMQPJ6SXB9jdYDThzq5wF8SMHB-gDoe6U7D-wCFmzJNQQ';
  const spotify = new SpotifyRequests(token);
  spotify.getTopTracks().then(resp => console.log(resp));

  /*
  res.send(spotify.getTopTracks().then((data) => {
    console.log(data);
  }) */
});

// Start server and listen on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
