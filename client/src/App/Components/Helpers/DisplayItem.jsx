/* Generic component that can hold any seed item out of tracks, artists, and genres. */

import React, { Component } from 'react';
import {
  ListItem, ListItemText,
} from '@material-ui/core';
import Image from './Image';

const styles = {
  displayItemImg: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
};

class DisplayItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false, // indicates if track is selected
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, type, id) {
    e.preventDefault();

    if (!this.props.isButton) return; // prevent clicking results

    console.log(type);
    const { seedHandler } = this.props;
    const seedObj = { type, id };
    let toggle = true;

    if (!this.state.selected) { // selecting
      toggle = seedHandler('add', seedObj);
    } else { // deselecting
      seedHandler('remove', seedObj);
    }

    if (toggle) {
      this.setState(prevState => ({
        selected: !prevState.selected,
      }));
    }
  }

  render() {
    const {
      type, id, primaryText, secondaryText, image,
    } = this.props;

    return (
      <ListItem
        alignItems="flex-start"
        divider={true}
        button={this.props.isButton}
        selected={this.state.selected}
        onClick={e => this.handleClick(e, type, id)}
      >
        {image
          && <Image
            imageSrc={image.url}
            imageAlt={type === 'track' ? 'trackart' : 'artist'}
            style={styles.displayItemImg}
          />
        }
        <br/><br/>
        <ListItemText
          primary={primaryText}
          secondary={secondaryText}
        />
      </ListItem>
    );
  }
}

export default DisplayItem;
