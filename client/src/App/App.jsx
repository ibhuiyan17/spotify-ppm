/* Top level component for the app. */

/* eslint-disable import/no-unresolved */
import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import { CssBaseline, Grid } from '@material-ui/core';

import pick from 'lodash.pick';
import { Tokens, View } from './Components/StateProvider';
import { TitleBar } from './Components';
import { DesktopView, MobileView } from './Views';


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
      results: [],
    };
    this.searchParams = { // seeds -> list of seeds, targets
      seeds: [],
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
    this.searchParams.seeds.forEach(({ type, id }) => {
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
    // const searchParams = { ...this.searchParams };
    let success = true; // signals failed action

    switch (action) { // TODO: use array push
      case 'add': {
        if (this.searchParams.seeds.length < 5) {
          this.searchParams.seeds = [...this.searchParams.seeds, seedObj];
        } else {
          success = false;
        }
        break;
      }
      case 'remove': {
        this.searchParams.seeds = this.searchParams.seeds.filter(({ type, id }) => {
          return (type === seedObj.type) // remove if object matches
            ? id !== seedObj.id
            : true;
        });
        break;
      }
      default:
        break;
    }
    console.log(this.searchParams);
    // this.setState({ searchParams });
    return success;
  }

  // update between dekstop and mobile views based on screen size
  updateViewMode(width, height) {
    const updatedDefaultView = width > height;
    console.log(width, height);
    console.log('default view: ', updatedDefaultView);
    if (updatedDefaultView !== this.state.defaultView) { // only update if it changed
      this.setState({ defaultView: updatedDefaultView });
    }
  }

  render() {
    const viewProps = pick(this.state, [ // lodash func. for filtering object
      'topTracks', 'topArtists', 'topGenres', 'results',
    ]);
    console.log('props: ', viewProps);
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
        <Grid>
          <Grid item xl>
            <TitleBar />
          </Grid>
          <Grid item xl>
            {this.state.defaultView
              ? <DesktopView
                  { ...viewProps }
                  handleSeedSelect={this.handleSeedSelect}
                  fetchResults={this.fetchResults}
                />
              : <MobileView
                  { ...viewProps }
                  handleSeedSelect={this.handleSeedSelect}
                  fetchResults={this.fetchResults}
                />
            }
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default App;
