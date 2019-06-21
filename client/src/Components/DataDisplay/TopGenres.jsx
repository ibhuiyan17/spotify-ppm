// Top genres list component. Passes down genre info to the DisplayItem Component.

/* eslint-disable implicit-arrow-linebreak */
import React, { Fragment } from 'react';
import { List } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DisplayItem from './DisplayItem';

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
          <DisplayItem key={genre}
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
