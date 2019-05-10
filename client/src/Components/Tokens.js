import { Component } from 'react';
import queryString from 'query-string';

class Tokens extends Component {
  componentDidMount() {
    const query = this.props.location.search;
    const parsed = queryString.parse(query);
    this.props.handler(parsed.access_token, parsed.refresh_token);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }
}

export default Tokens;
