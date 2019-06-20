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
    inputs: action (add/remove), seed object
    output: updated search params object
  */
  handleSeedSelect(action, seedObj) {
    const searchParams = { ...this.state.searchParams };
    console.log(searchParams);
    let success = true; // signals failed action
    switch (action) {
      case 'add': {
        if (searchParams.seeds.length < 5) {
          console.log('what up bitch')
          searchParams.seeds = [...searchParams.seeds, seedObj];
        } else {
          success = false;
        }
        break;
      }
      case 'remove': {
        searchParams.seeds = searchParams.seeds.filter(({ type, id }) => {
          return (type === seedObj.type) // remove if object matches
            ? id !== seedObj.id
            : true;
        });
        break;
      }
      default:
        break;
    }
    this.setState({ searchParams });
    return success;
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
