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

class StartButton extends Component {
  // Send request to server to initiate algorithm.

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.callBackendAPI = this.callBackendAPI.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log('Clicked start button'); // eslint-disable-line no-console

    this.setState({
      clicked: true,
    });

    this.callBackendAPI();
  }

  callBackendAPI() {
    fetch(this.props.targ)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Button variant="contained" className="start-button" onClick={this.handleClick}>
        Start
      </Button>
    );
  }
}

/*
StartButton.PropTypes = {

}; */
export default withStyles(styles)(StartButton);