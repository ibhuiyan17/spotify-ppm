const axios = require('axios');

// class representing reqests to the Spotify Web API.
module.exports = class SpotifyRequests {
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

  /* return a list of user's top 50 favorite tracks.
    input: desired time range
    output: list of user's top tracks with metadata
  */
  async getTopTracks(timeRange) {
    try {
      const response = await this.instance.get('me/top/tracks', {
        params: {
          limit: 10,
          time_range: timeRange,
        },
      });
      return response.data.items;
    } catch (err) {
      return err;
    }
  }

  async getTopArtists(timeRange) {
    try {
      const response = await this.instance.get('me/top/artists', {
        params: {
          limit: 5,
          time_range: timeRange,
        },
      });
      return response.data.items;
    } catch (err) {
      return err;
    }
  }

  /* return a list of selected track features.
    input: array of trackIDs
    output: array of features for selected trackIDs
  */
  async getFeatures(trackIDs) {
    try {
      const response = await this.instance.get('audio-features', {
        params: {
          ids: trackIDs.toString(),
        },
      });
      return response.data.audio_features;
    } catch (err) {
      return err;
    }
  }
};
