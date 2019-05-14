/* eslint-disable no-console */

const express = require('express');
const SpotifyRequests = require('./spotify-requests');

const auth = require('./auth/app');

const app = express();
const port = process.env.PORT || 3001;

// let topTracks = [];


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// GET route
app.get('/api/recents', (req, res) => {
  const token = 'BQDBODXtceDr16hPSS6G9lwOgKi7wiGrsklNR_7etvwiSrQZYMr-G1L4lW3TeTJAP_jwp6SoNdXe4vMH0dGFe1mJToOKOQSiy8sskVVtm3rMDSTUE8rgGEitc8CkkMj9dzq9K9-ujHjdim9GOUsL4-YZhJp64-HOEryeeaOcHr3oY0I6Gg';
  const spotify = new SpotifyRequests(token);

  spotify.getTopTracks()
    .then((spotifyResponse) => {
      const topTracks = spotifyResponse.map(trackObject => ({ // filter tracklist array
        trackID: trackObject.id,
        name: trackObject.name,
        artists: trackObject.artists.map(artistObj => artistObj.name),
      }));
      res.send(topTracks);
    });
  /*
  spotify.getTopTracks()
    .then((data) => {
      console.log(data.items);
      // topTracks = [...data.items];
      // console.log(topTracks);
    })
    .catch((reject) => {
      console.log(reject);
    }); */

  /*
  res.send(spotify.getTopTracks().then((data) => {
    console.log(data);
  }) */
});

// Start server and listen on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
