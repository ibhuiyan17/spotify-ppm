/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { Component, Fragment } from 'react';
import {
  List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TrackItem from './TrackItem';

const styles = theme => ({
  trackItem: {
    button: true,
  },
});


class TopTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracksSelected: [],
    };

    this.handleClickTrack = this.handleClickTrack.bind(this);
  }

  handleClickTrack(e, trackID) {
    e.preventDefault();
    console.log(e.target.alignItems);
    console.log(`trackID ${trackID} clicked`);

    if (!this.state.tracksSelected.includes(trackID) && this.state.tracksSelected.length < 5) {
      this.props.seedHandler('add', {
        seedType: 'track',
        id: trackID,
      });
    } else {
      this.props.seedHandler('remove', {
        seedType: 'track',
        id: trackID,
      });
    }
  }

  render() {
    const { classes } = this.props;
    let x = true;
    return (
      <Fragment>
        <List className="track-list">
          {this.props.trackList.map(trackObj =>
            <TrackItem
              track={trackObj}
              seedHandler={this.props.seedHandler}
            />)}
        </List>
      </Fragment>
    );
  }
}

export default withStyles(styles)(TopTracks);
