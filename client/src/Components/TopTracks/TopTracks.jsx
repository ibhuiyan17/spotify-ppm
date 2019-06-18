/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { Component, Fragment } from 'react';
import {
  List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  trackItem: {
    button: true,
  },
  trackart: {
    height: 50,
    width: 50,
    marginRight: 10,
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
    console.log(`trackID ${trackID} clicked`);

    if (!this.state.tracksSelected.includes(trackID) && this.state.tracksSelected.length < 5) {
      this.setState(prevState => ({
        tracksSelected: [...prevState.tracksSelected, trackID],
      }));
      this.props.seedHandler('add', {
        seedType: 'track',
        id: trackID,
      });
    } else {
      console.log('shits full');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <List className="track-list">
          {this.props.trackList.map(({ trackID, name, images, artists }) =>
            <ListItem key={trackID}
              alignItems="flex-start"
              divider={true}
              button={true}
              onClick={e => this.handleClickTrack(e, trackID)}
            >
              <img
                className={classes.trackart}
                src={images[0].url}
                alt={`trackart-${name}`}
              />
              <ListItemText
                primary={name}
                secondary={artists.join(', ')}
              />
            </ListItem>)}
        </List>
      </Fragment>
    );
  }
}

export default withStyles(styles)(TopTracks);
