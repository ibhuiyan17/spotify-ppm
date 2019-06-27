import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


function StartButton(props) {
  function handleClick(e) {
    e.preventDefault();
    console.log('Clicked start button');

    props.triggerFetch();
  }

  return (
    <Button
      variant="contained"
      className="start-button"
      color="primary"
      onClick={handleClick}
    >
      Start
    </Button>
  );
}

export default withStyles(styles)(StartButton);
