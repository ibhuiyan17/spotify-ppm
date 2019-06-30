import React, { Component } from 'react';
import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import {
  StartButton, ResetButton, BottomNavBar, NumSelected,
  TopTracks, TopArtists, TopGenres, Results,
} from '../Components';


const styles = theme => ({
  displayedComponent: {
    marginBottom: 50,
  },
  numSelected: {
    position: 'fixed',
    right: 0,
    top: 80,
    width: '20%',
  },
  startButton: {
    position: 'fixed',
    right: 0,
    top: 120,
    width: '15%',
  },
  resetButton: {
    position: 'fixed',
    right: 0,
    top: 160,
    width: '15%',
  },
  navBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    maxHeight: 50,
  },
});


class CompactView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVal: 'tracks', // represents chosen tab
    };

    this.displayHandler = this.displayHandler.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
    this.switchToResults = this.switchToResults.bind(this);
  }

  // handler for tab change
  displayHandler(newValue) {
    this.setState({ selectedVal: newValue });
  }

  // Handler passed to StartButton to switch to results tab onClick
  switchToResults() {
    this.displayHandler('results');
  }

  // render component based on tab value
  renderSwitch(value) {
    switch (value) {
      case 'tracks':
        return <>
          <Typography
            variant="h4"
            style={{ marginLeft: 5, marginTop: 5 }}
          >
            Your Top Tracks
          </Typography>
          <TopTracks
            trackList={this.props.topTracks}
            seedHandler={this.props.handleSeedSelect}
          /></>;
      case 'artists':
        return <>
          <Typography
            variant="h4"
            style={{ marginLeft: 5, marginTop: 5 }}
          >
            Your Top Artists
          </Typography>
          <TopArtists
            artistList={this.props.topArtists}
            seedHandler={this.props.handleSeedSelect}
          /></>;
      case 'genres':
        return <>
          <Typography
            variant="h4"
            style={{ marginLeft: 5, marginTop: 5 }}
          >
            Your Top Genres
          </Typography>
          <TopGenres
            genreList={this.props.topGenres}
            seedHandler={this.props.handleSeedSelect}
          /></>;
      case 'results':
        return <>
          <Typography
            variant="h4"
            style={{ marginLeft: 5, marginTop: 5 }}
          >
            Results
          </Typography>
          <Results
            trackList={this.props.results}
            seedHandler={this.props.handleSeedSelect}
          /></>;
      default:
        return <p>internal error</p>;
    }
  }

  render() {
    const { classes, numSelected, fetchResults, resetSelection } = this.props;
    return (
      <>
        <Grid>
          <Grid item xs className={classes.displayedComponent}>
            {this.renderSwitch(this.state.selectedVal)}
          </Grid>
          <Grid item xs className={classes.navBar}>
            <BottomNavBar
              handler={this.displayHandler}
              selectedVal={this.state.selectedVal}
            />
          </Grid>
          <Grid item xs className={classes.numSelected}>
            <Paper elevation={0}>
              <NumSelected count={numSelected} />
            </Paper>
          </Grid>
          <Grid item xs className={classes.startButton}>
            <Paper elevation={0}>
              <StartButton
                compactViewHandler={this.switchToResults}
                triggerFetch={fetchResults}
              />
            </Paper>
          </Grid>
          <Grid item xs className={classes.resetButton}>
            <Paper elevation={0}>
              <ResetButton
                triggerReset={resetSelection}
              />
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(CompactView);
