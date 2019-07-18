// Compact layout component.

import React, { Component } from 'react';
import {
  Grid, Paper, Typography,
} from '@material-ui/core';
import {
  TopTracks, TopArtists, TopGenres, Results, NumSelected, Label,
} from '../Components/DataDisplay';
import { BottomNavBar } from '../Components/AppBars';
import { StartButton, ResetButton } from '../Components/Control';


const styles = {
  label: {
    marginLeft: 5,
    marginTop: 5,
  },
  numSelected: {
    position: 'fixed',
    right: 0,
    top: 80,
    width: '20%',
  },
  startButton: {
    position: 'fixed',
    right: 10,
    top: 350,
  },
  resetButton: {
    position: 'fixed',
    right: 10,
    top: 390,
  },
  navBar: {
    position: 'fixed',
    top: 120,
    right: 0,
  },
};


class CompactView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVal: 'tracks', // represents chosen tab
    };

    this.displayHandler = this.displayHandler.bind(this);
    this.switchToResults = this.switchToResults.bind(this);
    this.displaySelectedComponent = this.displaySelectedComponent.bind(this);
  }

  // handler for tab change
  displayHandler(newValue) {
    this.setState({ selectedVal: newValue });
  }

  // Handler passed to StartButton to switch to results tab onClick
  switchToResults() {
    this.displayHandler('results');
  }

  // display component based on selected tab
  displaySelectedComponent() {
    return <>
      <div style={{ display: this.state.selectedVal === 'tracks' ? 'block' : 'none' }}>
      <Label style={styles.label} text="Your Top Tracks" variant="h4" color="secondary"/>
      <TopTracks
        trackList={this.props.topTracks}
        seedHandler={this.props.handleSeedSelect}
      />
      </div>
      <div style={{ display: this.state.selectedVal === 'artists' ? 'block' : 'none' }}>
        <Label style={styles.label} text="Your Top Artists" variant="h4" color="secondary"/>
        <TopArtists
          artistList={this.props.topArtists}
          seedHandler={this.props.handleSeedSelect}
        />
      </div>
      <div style={{ display: this.state.selectedVal === 'genres' ? 'block' : 'none' }}>
        <Label style={styles.label} text="Your Top Genres" variant="h4" color="secondary"/>
        <TopGenres
          genreList={this.props.topGenres}
          seedHandler={this.props.handleSeedSelect}
        />
      </div>
      <div style={{ display: this.state.selectedVal === 'results' ? 'block' : 'none' }}>
        <Label style={styles.label} text="Results" variant="h4" color="secondary"/>
        <Results
          trackList={this.props.results}
          seedHandler={this.props.handleSeedSelect}
        />
      </div></>;
  }

  render() {
    const {
      numSelected, fetchResults, resetSelection,
    } = this.props;
    return (
      <>
        <Grid>
          <Grid item xs>
            {this.displaySelectedComponent()}
          </Grid>
          <Grid item xs style={styles.navBar}>
            <BottomNavBar
              handler={this.displayHandler}
              selectedVal={this.state.selectedVal}
            />
          </Grid>
          <Grid item xs style={styles.numSelected}>
            <Paper elevation={0}>
              <NumSelected count={numSelected} />
            </Paper>
          </Grid>
          <Grid item xs style={styles.startButton}>
            <StartButton
              compactViewHandler={this.switchToResults}
              triggerFetch={fetchResults}
            />
          </Grid>
          <Grid item xs style={styles.resetButton}>
            <ResetButton
              triggerReset={resetSelection}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default CompactView;
