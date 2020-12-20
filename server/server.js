/* eslint-disable */
require('dotenv').config() // import env variables

const express = require('express');
const path = require('path');
var request = require('request'); // "Request" library
let cookieParser = require('cookie-parser');
let cors = require('cors');
var querystring = require('querystring');


const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '/public')))
  .use(cors())
  .use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

var redirect_uri = process.env.REDIRECT_URI;
var app_uri = process.env.APP_URI;


// var redirect_uri = 'http://localhost:3001/callback';
// var app_uri = 'http://localhost:3000/?';

/* ---------------------------------------- Authentication Routes ---------------------------------------- */
var stateKey = 'spotify_auth_state';

app.get('/login', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-top-read playlist-modify-public';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
      show_dialog: true
  }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(app_uri +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            logged_in: true,
          }));
      } else {
        res.redirect(app_uri +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});


/* ---------------------------------------- API Routes ---------------------------------------- */
const utils = require('./utils');
const SpotifyRequests = require('./spotify-requests');

/*
  GET user profile
*/
app.get('/api/user/profile', async(req, res) => {
  const spotify = new SpotifyRequests(req.query.access_token);

  try {
    const returnObject = await utils.getFilteredUserData(spotify)
    res.send(returnObject);
  } catch (err) {
    console.log(err);
  }
});

/*
  GET user's data from spotify. Top 50 tracks
  and artists, feature analysis, and top genres
*/
 app.get('/api/user/spotify_data', async (req, res) => {
  const returnObject = {};

  const spotify = new SpotifyRequests(req.query.access_token);

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


/*
  GET recommendations based on seeds
*/
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


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
