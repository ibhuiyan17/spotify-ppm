import React, { Component, Fragment } from 'react';
import { Grid, Paper, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import Category from '@material-ui/icons/Category';
import {
  StartButton, TopTracks, TopArtists, TopGenres, Results,
} from '../Components';

class MobileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVal: 'tracks', // represents chosen tab
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
  }

  handleChange(e, newValue) {
    e.preventDefault();

    window.scrollTo(0, 0);
    this.setState({
      selectedVal: newValue,
    });
  }

  // render component based on tab value
  renderSwitch(value) {
    console.log('from mobile view: ', this.props.topTracks);
    switch (value) {
      case 'tracks':
        return <TopTracks
          trackList={this.props.topTracks}
          seedHandler={this.props.handleSeedSelect}
        />;
      case 'artists':
        return <TopArtists
          artistList={this.props.topArtists}
          seedHandler={this.props.handleSeedSelect}
        />;
      case 'genres':
        return <TopGenres
          genreList={this.props.topGenres}
          seedHandler={this.props.handleSeedSelect}
        />;
      case 'results':
        return <Results
          trackList={this.props.results}
          seedHandler={this.props.handleSeedSelect}
        />;
      default:
        return <p>fuck</p>;
    }
  }

  render() { // style={{ position: 'fixed', bottom: 0, width: '100%'}}
    return (
      <Fragment>
        <Grid>
          <Grid item xs>
            <BottomNavigation showLabels style={{flexDirection: 'column', marginTop: 80, position: 'absolute', width: 50}}
              value={this.state.selectedVal}
              onChange={(e, newValue) => this.handleChange(e, newValue)}
            >
              <BottomNavigationAction
                label="Tracks"
                value="tracks"
                icon={<Category />}
              />
              <BottomNavigationAction
                label="Artists"
                value="artists"
                icon={<Category />}
              />
              <BottomNavigationAction
                label="Genres"
                value="genres"
                icon={<Category />}
              />
              <BottomNavigationAction
                label="Results"
                value="results"
                icon={<Category />}
              />
            </BottomNavigation>
          </Grid>
          <Grid item xs style={{ marginLeft: 70, display: 'flex'}}>
            <Paper style={{ maxHeight: window.innerHeight, overflow: 'auto', width: window.innerWidth}} elevation={0}>
              {this.renderSwitch(this.state.selectedVal)}
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default MobileView;
