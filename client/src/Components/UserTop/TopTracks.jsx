// Top tracks list component. Passes down track info to the SeedItem Component.

/* eslint-disable implicit-arrow-linebreak */
import React, { Fragment } from 'react';
import { List } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SeedItem from '../SeedItem';

const styles = theme => ({
  trackItem: {
    button: true,
  },
});

function TopTracks({ trackList, seedHandler }) {
  // const { classes } = this.props;

  return (
    <Fragment>
      <List className="track-list">
        {trackList.map(({ // destructure track object
          trackID, name, artists, images,
        }) =>
          <SeedItem
            type="track"
            id={trackID}
            primaryText={name}
            secondaryText={artists.join(', ')}
            image={images[0]}
            seedHandler={seedHandler}
          />)}
      </List>
    </Fragment>
  );
}

export default withStyles(styles)(TopTracks);
