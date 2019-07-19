// Top artists list component. Passes down artist info to the DisplayItem Component.

/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { List } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DisplayItem from '../Helpers/DisplayItem';

const styles = theme => ({
  trackItem: {
    button: true,
  },
});

function TopArtists({ artistList, seedHandler }) {
  // const { classes } = this.props;

  return (
    <>
      <List className="artist-list">
        {artistList.map(({ // destructure artist object
          artistID, name, genres, images,
        }) =>
          <DisplayItem key={artistID}
            isButton={true}
            type="artist"
            id={artistID}
            primaryText={name}
            secondaryText={genres.slice(0, 3).join(', ')}
            image={images[0]}
            seedHandler={seedHandler}
          />)}
      </List>
    </>
  );
}

export default withStyles(styles)(TopArtists);
