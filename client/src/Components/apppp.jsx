/* Top level component for the app. */

/* eslint-disable import/no-unresolved */
import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';

import Tokens from './Tokens';
import TitleBar from './TitleBar';
import TopTracks from './TopTracks/TopTracks';
import StartButton from './StartButton';


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
      searchParams: {
        seeds: [],
      }, // seeds -> list of seeds, targets
    };

    this.handleTokenUpdate = this.handleTokenUpdate.bind(this);
    this.fetchSpotifyData = this.fetchSpotifyData.bind(this);
    this.handleSeedSelect = this.handleSeedSelect.bind(this);
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

  /* Parent handler to update search params object
    inputs: action (add/remove), seed object, type of seed (if add)
    output: updated search params object
  */
  handleSeedSelect(action, seedObj, type) {
    switch (action) {
      case 'add': {
        const searchParams = { ...this.state.searchParams };
        searchParams.seeds = [...searchParams.seeds, seedObj];
        this.setState({
          searchParams,
        });
        break;
      }
      case 'remove': {
        this.setState(prevState => ({
          searchParams: prevState.searchParams.seeds[type].filter(({ id }) => {
            return id !== seedObj.id;
          }),
        }));
        break;
      }
      default:
        break;
    }
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Router>
          <Route
            path='/'
            render={props => <Tokens {...props} handler={this.handleTokenUpdate} />}
          />
        </Router>
        <TitleBar />
        <TopTracks
          trackList={this.state.topTracks}
          seedHandler={this.handleSeedSelect}
        />
        <StartButton targ={'/api/recents'}/>
      </Fragment>
    );
  }
}

export default App;
