/* Top level component for the app. */

/* eslint-disable import/no-unresolved */
import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import axios from 'axios';

import StartButton from './StartButton';
import Tokens from './Tokens';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      refreshToken: '',
      userInfo: {},
      timeRange: 'long_term',
      topTracks: [],
      topArtists: [],
      topGenres: [],
      featureAnalysis: {},
      searchParams: {},
    };

    this.handleTokenUpdate = this.handleTokenUpdate.bind(this);
    this.fetchSpotifyData = this.fetchSpotifyData.bind(this);
  }

  // fetch user's spotify data from backend server.
  async fetchSpotifyData() {
    try {
      // object destructuring
      const {
        data: {
          topTracks, topArtists, topGenres, featureAnalysis,
        },
      } = await axios.get('/api/user/spotify_data', {
        params: {
          access_token: this.state.accessToken,
          time_range: this.state.timeRange,
        },
      });

      this.setState({
        topTracks: [...topTracks],
        topArtists: [...topArtists],
        topGenres: [...topGenres],
        featureAnalysis,
      }, () => {
        console.log('updated state');
        console.log('this.state: ', this.state);
      });
    } catch (err) {
      console.log(err); // TODO: change these
    }
  }

  // update access and refresh tokens
  handleTokenUpdate(accessToken, refreshToken) {
    // TODO: Do these tokens get updated after first set?
    this.setState({
      accessToken,
      refreshToken,
    }, () => {
      console.log('access token updated: ', this.state.accessToken);
      console.log('refresh token updated: ', this.state.refreshToken);
      this.fetchSpotifyData();
    });
  }

  render() {
    return (
      <Fragment>
        <Router>
          <Route
            path='/'
            render={props => <Tokens {...props} handler={this.handleTokenUpdate} />}
          />
        </Router>
        <h1>Spotify: Personalized Playlist Builder</h1>
        <StartButton targ={'/api/recents'}/>
      </Fragment>
    );
  }
}

export default App;
