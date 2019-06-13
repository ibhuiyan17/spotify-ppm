/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import StartButton from './start-button';
import Tokens from './tokens';


class Index extends Component {
  // Top level component for the app.
  constructor(props) {
    super(props);
    this.state = {
      access_token: '',
      refresh_token: '',
    };

    this.handleTokenUpdate = this.handleTokenUpdate.bind(this);
  }

  handleTokenUpdate(access, refresh) {
    // TODO: Do these tokens get updated after first set?
    this.setState({
      access_token: access,
      refresh_token: refresh,
    }, () => {
      console.log('access token updated: ', this.state.access_token);
      console.log('refresh token updated: ', this.state.refresh_token);
    });
  }

  render() {
    return (
      <div>
        <h1>Spotify: Personalized Productivity Playlist</h1>
        <Router>
          <Route
            path='/'
            render={props => <Tokens {...props} handler={this.handleTokenUpdate} />}
          />
        </Router>
        <StartButton targ={'/api/recents'}/>
      </div>
    );
  }
}

export default Index;
