/* Generic component that can hold any seed item out of tracks, artists, and genres. */

import React, { Component } from 'react';
import {
  ListItem, ListItemText,
} from '@material-ui/core';
import Image from './Image';

class SeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false, // indicates if track is selected
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, type, id) {
    e.preventDefault();
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
      <ListItem key={id}
        alignItems="flex-start"
        divider={true}
        button={true}
        selected={this.state.selected}
        onClick={e => this.handleClick(e, type, id)}
      >
        {image
          && <Image
            imageUrl={image.url}
            imageType={type === 'track' ? 'trackart' : 'artist'}
          />
        }
        <ListItemText
          primary={primaryText}
          secondary={secondaryText}
        />
      </ListItem>
    );
  }
}

export default SeedItem;
