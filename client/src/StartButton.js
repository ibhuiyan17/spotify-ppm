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
	constructor () {

	} 
	
	render () {
		return (
			<Button variant="contained" className="start-button" onClick={handleClick}>
				Start
			</Button>
		);
	}

	handleClick (e) {
		
	}
}

/*
StartButton.PropTypes = {

}; */
//export default StartButton;
export default withStyles(styles)(StartButton);