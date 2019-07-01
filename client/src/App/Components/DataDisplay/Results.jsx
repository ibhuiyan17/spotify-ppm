// Resulsts list component.

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

function Results({ trackList }) {
  // const { classes } = this.props;

  return (
    <>
      <List className="track-list">
        {trackList.map(({ // destructure track object
          trackID, name, artists, images,
        }) =>
          <DisplayItem key={trackID}
            type="result"
            id={trackID}
            primaryText={name}
            secondaryText={artists.join(', ')}
            image={images[0]}
            // seedHandler={seedHandler}
          />)}
      </List>
    </>
  );
}

export default withStyles(styles)(Results);
