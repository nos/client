import React from 'react';
import { func } from 'prop-types';

export default class Logout extends React.Component {
  static propTypes = {
    logout: func.isRequired,
    emptyAllRequests: func.isRequired
  };

  componentWillMount() {
    this.props.emptyAllRequests();
    this.props.logout();
  }

  render() {
    return null;
  }
}
