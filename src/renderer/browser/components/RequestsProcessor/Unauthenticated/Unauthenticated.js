import React from 'react';
import { func } from 'prop-types';

export default class Unauthenticated extends React.PureComponent {
  static propTypes = {
    onReject: func.isRequired
  };

  componentDidMount() {
    this.props.onReject('User not authenticated.');
  }

  render() {
    return null;
  }
}
