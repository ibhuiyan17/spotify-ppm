// non-rendering component for determining view mode.

import React, { Component } from 'react';
import { throttle } from 'throttle-debounce';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = throttle(300, () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.props.handler(this.state.width, this.state.height);
  })

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }
}

export default View;
