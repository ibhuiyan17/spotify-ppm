import React, { Component, Fragment } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

const styles = {
  trackart: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
};

class TrackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false, // indicates if track is selected
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, trackID) {
    e.preventDefault();
    const seedObj = {
      type: 'track',
      id: trackID,
    };
    let toggle = true;

    if (!this.state.selected) { // selecting
      toggle = this.props.seedHandler('add', seedObj);
    } else { // unselecting
      this.props.seedHandler('remove', seedObj);
    }

    if (toggle) {
      this.setState(prevState => ({
        selected: !prevState.selected,
      }));
    }
  }

  render() {
    const { // destructure track object
      trackID, name, artists, images,
    } = this.props.track;

    return (
      <ListItem key={trackID}
        alignItems="flex-start"
        divider={true}
        button={true}
        selected={this.state.selected}
        onClick={e => this.handleClick(e, trackID)}
      >
        <img
          style={styles.trackart}
          src={images[0].url}
          alt={`trackart-${name}`}
        />
        <ListItemText
          primary={name}
          secondary={artists.join(', ')}
        />
      </ListItem>
    );
  }
}

export default TrackItem;