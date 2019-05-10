import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import StartButton from './StartButton';
import Tokens from './Tokens';


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
      <Router>
        <div>
          <h1>Spotify: Personalized Productivity Playlist</h1>
          <Route
            path='/'
            render={props => <Tokens {...props} handler={this.handleTokenUpdate} />}
          />
          <StartButton targ={'/api/recents'}/>
        </div>
      </Router>
    );
  }
}

export default Index;
