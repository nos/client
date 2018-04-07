import React from 'react';
import { func } from 'prop-types';

export default class Invoke extends React.Component {
  static propTypes = {
    response: Object.isRequired, // TODO do not return object, but shape
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  async componentDidMount() {
    if (this.props.response) {
      this.props.onResolve(this.props.response);
    } else {
      this.props.onReject('An error occurred');
    }
  }

  render() {
    return null;
  }
}
