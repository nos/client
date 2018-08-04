import React from 'react';
import { func } from 'prop-types';

export default class Logout extends React.PureComponent {
  static propTypes = {
    logout: func.isRequired
  };

  componentWillMount() {
    this.props.logout();
  }

  render() {
    return null;
  }
}
