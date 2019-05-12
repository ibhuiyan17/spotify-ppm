const axios = require('axios');


module.exports = class SpotifyRequest {
  // class representing reqests to the Spotify Web API
  constructor(accessToken) {
    this.token = accessToken;
    this.instance = axios.create({
      baseURL: 'https://api.spotify.com/v1/',
      timeout: 1000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getTopTracks() {
    // Get user's top tracks.
    return this.instance.get('me/top/tracks')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }
};
