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


function ResetButton({ resetHandler }) {
  function handleClick(e) {
    e.preventDefault();
    console.log('Clicked reset button');

    //resetHandler(); // call parent handler to reset app state

    window.location.reload();
  }

  return (
    <Button
      variant="contained"
      className="reset-button"
      color="primary"
      onClick={handleClick}
    >
      Reset
    </Button>
  );
}

export default withStyles(styles)(ResetButton);
