// Top artists list component. Passes down artist info to the SeedItem Component.

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

function TopArtists({ artistList, seedHandler }) {
  // const { classes } = this.props;

  return (
    <Fragment>
      <List className="artist-list">
        {artistList.map(({ // destructure artist object
          artistID, name, genres, images,
        }) =>
          <SeedItem
            type="artist"
            id={artistID}
            primaryText={name}
            secondaryText={genres.slice(0, 3).join(', ')}
            image={images[0]}
            seedHandler={seedHandler}
          />)}
      </List>
    </Fragment>
  );
}

export default withStyles(styles)(TopArtists);
