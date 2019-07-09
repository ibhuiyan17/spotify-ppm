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

  // return unfiltered user profile data.
  async getUserData() {
    try {
      const response = await this.instance.get('me');
      return response.data;
    } catch (error) {
      console.log('error with user data: ', error.message);
    }
  }

  /* return a list of user's top 50 favorite tracks.
    input: desired time range
    output: list of user's top tracks with metadata
  */
  async getTopTracks(timeRange) {
    try {
      const response = await this.instance.get('me/top/tracks', {
        params: {
          limit: 50,
          time_range: timeRange,
        },
      });
      return response.data.items;
    } catch (error) {
      console.log('error with topTracks');
      if (error.response) {
        console.log('request made and server responded with response code.', error.response);
      } else if (error.request) {
        console.log('no response received', error.request);
      } else {
        console.log('Error: ', error.message);
      }
    }
  }

  /* return a list of user's top 50 favorite artists.
    input: desired time range
    output: list of user's top tracks with metadata
  */
  async getTopArtists(timeRange) {
    try {
      const response = await this.instance.get('me/top/artists', {
        params: {
          limit: 50,
          time_range: timeRange,
        },
      });
      return response.data.items;
    } catch (error) {
      console.log('error in artists');
      if (error.response) {
        console.log('request made and server responded with response code.', error.response);
      } else if (error.request) {
        console.log('no response received');
      } else {
        console.log('Error: ', error.message);
      }
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
    } catch (error) {
      console.log('error in features');
      if (error.response) {
        console.log('request made and server responded with response code.', error.response);
      } else if (error.request) {
        console.log('no response received');
      } else {
        console.log('Error: ', error.message);
      }
    }
  }

  // return available genres to use as seeds.
  async getAvailableGenreSeeds() {
    try {
      const response = await this.instance.get('recommendations/available-genre-seeds');
      // console.log(response.data);
      return response.data.genres;
    } catch (error) {
      console.log('error in genres');
      if (error.response) {
        console.log('request made and server responded with response code.', error.response);
      } else if (error.request) {
        console.log('no response received');
      } else {
        console.log('Error: ', error.message);
      }
    }
  }

  /* return a list of reccommended tracks based on seeds.
    input:
    output:
  */
  async getRecommendations(searchParams) {
    // console.log('from spotify recommendations: ', searchParams);
    try {
      const response = await this.instance.get('recommendations', {
        params: searchParams,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return err;
    }
  }
};
