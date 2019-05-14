const axios = require('axios');


module.exports = class SpotifyRequests {
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

  async getTopTracks() {
    // return a list of user's top 50 favorite songs
    try {
      const response = await this.instance.get('me/top/tracks?limit=50&time_range=short_term');
      return response.data.items;
    } catch (err) {
      return err;
    }
  }
  /*
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
  } */
};
