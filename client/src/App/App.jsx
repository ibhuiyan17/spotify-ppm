// Top level component for the app.

/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import pick from 'lodash.pick';
import { CssBaseline, Grid } from '@material-ui/core';
import { Tokens, View } from './Components/StateProvider';
import { TitleBar } from './Components/AppBars';
import { LandingPage, StandardView, CompactView } from './Views';

// const backendUrl = 'http://localhost:3001';
const backendUrl = 'https://spotify-ppm-server.herokuapp.com';


class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.initialState = {
      loggedIn: false,
      defaultView: true, // determines layout based on screen
      accessToken: '',
      refreshToken: '',
      profileData: {},
      timeRange: 'long_term',
      topTracks: [],
      topArtists: [],
      topGenres: [],
      featureAnalysis: {},
      numSelected: 0,
      results: [],
    };

    this.state = this.initialState;
    this.searchParams = { // seeds -> list of seeds, targets
      seeds: [],
    };

    this.resetSelection = this.resetSelection.bind(this);
    this.handleTokenUpdate = this.handleTokenUpdate.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchSpotifyData = this.fetchSpotifyData.bind(this);
    this.fetchResults = this.fetchResults.bind(this);
    this.handleSeedSelect = this.handleSeedSelect.bind(this);
    this.updateViewMode = this.updateViewMode.bind(this);
  }

  // reset seeds for new search
  resetSelection() {
    this.setState({
      numSelected: 0,
      // results: [],
    });

    this.searchParams.seeds = [];
  }

  // update access and refresh tokens.
  handleTokenUpdate(accessToken, refreshToken, loggedIn) {
    // TODO: Do these tokens get updated after first set?
    if (!loggedIn) return; // only run function if user is logged in
    this.setState({
      loggedIn: true,
      accessToken,
      refreshToken,
    }, () => {
      console.log('access token updated: ', this.state.accessToken);
      console.log('refresh token updated: ', this.state.refreshToken);
      this.fetchUserData();
      this.fetchSpotifyData();
    });
  }

  // handler to reset state and log out.
  handleLogout() {
    console.log('logout clicked');
    this.setState(this.initialState, () => console.log('resetting state'));
  }

  // fetch user profile data from backend server and set state.
  async fetchUserData() {
    try {
      const {
        data: profileData,
      } = await axios.get(`${backendUrl}/api/user/profile`, {
        params: {
          access_token: this.state.accessToken,
        },
      });

      this.setState({ profileData });
    } catch (err) {
      console.log(err);
    }
  }

  // fetch user's spotify data from backend server and set state.
  async fetchSpotifyData() {
    try {
      console.log('starting fetch spotify data');
      // object destructuring
      const {
        data: {
          topTracks, topArtists, topGenres, featureAnalysis,
        },
      } = await axios.get(`${backendUrl}/api/user/spotify_data`, {
        params: {
          access_token: this.state.accessToken,
          time_range: this.state.timeRange,
        },
      });

      this.setState({
        topTracks, topArtists, topGenres, featureAnalysis,
      });
    } catch (err) {
      console.log(err); // TODO: change these
    }
  }

  // fetch results based on selected seeds from backend server and set state.
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

    try {
      const {
        data: {
          recommendations,
        },
      } = await axios.get(`${backendUrl}/api/recommendations`, {
        params,
      });

      this.setState({
        results: recommendations,
      });
    } catch (err) {
      console.log(err);
    }
  }

  /* Parent handler to update search params object.
    inputs: action (add/remove), seed object
    output: updated state of search params object and bool for successful
          add or remove
  */
  handleSeedSelect(action, seedObj) {
    let success = true; // signals failed action

    switch (action) {
      case 'add': { // add seed if there is less than 5 present and update state
        if (this.searchParams.seeds.length < 5) {
          this.searchParams.seeds = [...this.searchParams.seeds, seedObj]; // TODO: try array push
          this.setState(prevState => ({
            numSelected: prevState.numSelected + 1,
          }));
        } else {
          success = false;
        }
        break;
      }
      case 'remove': { // remove specified seed object and update state
        this.searchParams.seeds = this.searchParams.seeds.filter(({ type, id }) => {
          return (type === seedObj.type) // remove if object matches
            ? id !== seedObj.id
            : true;
        });
        this.setState(prevState => ({
          numSelected: prevState.numSelected - 1,
        }));
        break;
      }
      default:
        break;
    }
    return success;
  }

  // update between dekstop and mobile views based on screen size
  updateViewMode(width, height) {
    const updatedDefaultView = width > height;

    if (updatedDefaultView !== this.state.defaultView) { // only update if it changed
      this.setState({ defaultView: updatedDefaultView }, () => {
        if (this.state.numSelected !== 0) {
          this.resetSelection();
        }
      });
    }
  }

  render() {
    const viewProps = pick(this.state, [ // filter selected props to send to views
      'accessToken', 'profileData', 'topTracks', 'topArtists', 'topGenres', 'results', 'numSelected',
    ]);

    return (
      <>
        <CssBaseline />
        <Router>
          <Route
            path='/'
            render={props => <Tokens {...props} handler={this.handleTokenUpdate} />}
          />
        </Router>
        <View handler={this.updateViewMode} />
        <Grid>
          <TitleBar
            backendUrl={backendUrl}
            loggedIn={this.state.loggedIn}
            logoutHandler={this.handleLogout}
          />
          {!this.state.loggedIn
            ? <LandingPage />
            : <Grid item xl>
              {this.state.defaultView
                ? <StandardView
                    { ...viewProps }
                    handleSeedSelect={this.handleSeedSelect}
                    fetchResults={this.fetchResults}
                    resetHandler={this.resetSelection}
                  />
                : <CompactView
                    { ...viewProps }
                    handleSeedSelect={this.handleSeedSelect}
                    fetchResults={this.fetchResults}
                    resetHandler={this.resetSelection}
                    initialTab={this.state.results.length !== 0 ? 'results' : 'tracks'}
                  />
              }
              </Grid>
          }
        </Grid>
      </>
    );
  }
}

export default App;
