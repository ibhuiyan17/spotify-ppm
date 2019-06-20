// Top genres list component. Passes down genre info to the SeedItem Component.

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

function TopGenres({ genreList, seedHandler }) {
  // const { classes } = this.props;

  return (
    <Fragment>
      <List className="artist-list">
        {genreList.map(genre =>
          <SeedItem
            type="genre"
            id={genre}
            primaryText={genre}
            seedHandler={seedHandler}
          />)}
      </List>
    </Fragment>
  );
}

export default withStyles(styles)(TopGenres);
