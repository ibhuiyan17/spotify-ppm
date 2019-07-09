import React, { Component } from 'react';
import { 
  BottomNavigation, BottomNavigationAction, withStyles,
} from '@material-ui/core';
import QueueMusic from '@material-ui/icons/QueueMusic';
import RecentActors from '@material-ui/icons/RecentActors';
import Category from '@material-ui/icons/Category';
import Send from '@material-ui/icons/Send';

class BottomNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVal: 'tracks', // represents selected nav tab
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // highlight selected tab and pass newValue to caller
  handleChange(e, newValue) {
    e.preventDefault();

    window.scrollTo(0, 0);
    if (newValue !== this.props.selectedVal) {
      this.props.handler(newValue);
    }
  }

  render() {
    return (
      <BottomNavigation showLabels style={{display: 'flex', flexDirection: 'column', height: '100%'}}
        value={this.props.selectedVal}
        onChange={(e, newValue) => this.handleChange(e, newValue)}
      >
        <BottomNavigationAction
          label="Tracks"
          value="tracks"
          icon={<QueueMusic />}
        />
        <BottomNavigationAction
          label="Artists"
          value="artists"
          icon={<RecentActors />}
        />
        <BottomNavigationAction
          label="Genres"
          value="genres"
          icon={<Category />}
        />
        <BottomNavigationAction
          label="Go"
          value="results"
          icon={<Send />}
        />
      </BottomNavigation>
    );
  }
}

export default BottomNavBar;
