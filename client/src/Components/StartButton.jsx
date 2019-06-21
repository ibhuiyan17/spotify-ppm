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
/*
class StartButton extends Component {
  // Send request to server to initiate algorithm.

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log('Clicked start button'); // eslint-disable-line no-console

    this.setState({
      clicked: true,
    });

    this.callBackendAPI();
  }

  render() {
    return (
      <Button
        variant="contained"
        className="start-button"
        color="primary"
        onClick={this.handleClick}
      >
        Start
      </Button>
    );
  }
} */

/*
StartButton.PropTypes = {

}; */
export default withStyles(styles)(StartButton);