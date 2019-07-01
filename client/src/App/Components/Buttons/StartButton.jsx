import React, { Component } from 'react';
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


function StartButton({ triggerFetch, compactViewHandler }) {
  function handleClick(e) {
    e.preventDefault();
    console.log('Clicked start button');

    triggerFetch();

    if (compactViewHandler) { // runs specific handler for compact view
      compactViewHandler();
    }
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
