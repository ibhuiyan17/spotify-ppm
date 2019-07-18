import { Component } from 'react';
import queryString from 'query-string';

class Tokens extends Component {
  componentDidMount() {
    const query = this.props.location.search;
    const { access_token, refresh_token, logged_in } = queryString.parse(query);
    this.props.handler(access_token, refresh_token, logged_in);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }
}

export default Tokens;
