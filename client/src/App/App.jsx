/* Top level component for the app. */

/* eslint-disable import/no-unresolved */
import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import { CssBaseline, Grid, Paper, Typography } from '@material-ui/core';

import Tokens from './Tokens';
import View from './View';
import TitleBar from './TitleBar';
import { TopTracks, TopArtists, TopGenres, Results } from './DataDisplay';
import StartButton from './StartButton';

const styles = {
  Paper: {
    padding: 0,
    marginTop: 5,
    marginBottom: 2,
    marginLeft: 5,
    maxHeight: 400,
    overflowY: 'scroll', // makes it scrollable
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultView: true, // determines layout based on screen
      accessToken: '',
      refreshToken: '',
      userInfo: {},
      timeRange: 'medium_term',
      topTracks: [],
      topArtists: [],
      topGenres: [],
      featureAnalysis: {},
      searchParams: { // seeds -> list of seeds, targets
        seeds: [],
      },
      results: [],
    };

    this.handleTokenUpdate = this.handleTokenUpdate.bind(this);
    this.fetchSpotifyData = this.fetchSpotifyData.bind(this);
    this.fetchResults = this.fetchResults.bind(this);
    this.handleSeedSelect = this.handleSeedSelect.bind(this);
    this.updateViewMode = this.updateViewMode.bind(this);
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

  // fetch results based on selected seeds from backend server.
  async fetchResults() {
    const params = { // holds request data for backend
      access_token: this.state.accessToken,
    };

    // load seeds and convert them to strings
    this.state.searchParams.seeds.forEach(({ type, id }) => {
      const seedType = `seed_${type}s`;
      if (!(seedType in params)) {
        params[seedType] = [];
      }
      params[seedType].push(id);
    });
    /*
    Object.keys(params).forEach((seedType) => {
      params[seedType] = params[seedType].toString();
    }); */

    console.log(params);
    const {
      data: {
        recommendations,
      },
    } = await axios.get('api/recommendations', {
      params,
    });

    this.setState({
      results: recommendations,
    });

    console.log('results: ', recommendations);
  }

  // update access and refresh tokens.
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

  /* Parent handler to update search params object.
    inputs: action (add/remove), seed object
    output: updated state of search params object and bool for successful
          add or remove
  */
  handleSeedSelect(action, seedObj) {
    const searchParams = { ...this.state.searchParams };
    let success = true; // signals failed action

    switch (action) {
      case 'add': {
        if (searchParams.seeds.length < 5) {
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

  // update between dekstop and mobile views based on screen size
  updateViewMode(width, height) {
    const defaultView = width > height;
    console.log(width, height);
    console.log('default view: ', defaultView);
    this.setState({ defaultView });
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
        <View handler={this.updateViewMode} />
        <TitleBar />
        {this.state.defaultView
          && <Fragment>
            <Grid container spacing={1}>
              <Grid item xs>
                <Typography
                  variant="h6"
                  style={{ marginLeft: 5, marginTop: 5 }}
                >
                  Your Top Tracks
                </Typography>
                <Paper style={styles.Paper} >
                  <TopTracks
                    trackList={this.state.topTracks}
                    seedHandler={this.handleSeedSelect}
                  />
                </Paper>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h6"
                  style={{ marginLeft: 5, marginTop: 5 }}
                >
                  Your Top Artists
                </Typography>
                <Paper style={styles.Paper}>
                  <TopArtists
                    artistList={this.state.topArtists}
                    seedHandler={this.handleSeedSelect}
                  />
                </Paper>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h6"
                  style={{ marginLeft: 5, marginTop: 5 }}
                >
                  Your Top Genres
                </Typography>
                <Paper style={styles.Paper}>
                  <TopGenres
                    genreList={this.state.topGenres}
                    seedHandler={this.handleSeedSelect}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Typography
              variant="h3"
              style={{ marginTop: 20 }}
            >
              Results
            </Typography>
            <Results
              trackList={this.state.results}
            />
            <StartButton
                triggerFetch={this.fetchResults}
            />
          </Fragment>
        }
      </Fragment>
    );
  }
}

export default App;
