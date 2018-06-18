import React from 'react';
import { string, func } from 'prop-types';

export default class GetPublicKey extends React.Component {
  static propTypes = {
    publicKey: string.isRequired,
    onResolve: func.isRequired
  };

  componentDidMount() {
    this.props.onResolve(this.props.publicKey);
  }

  render() {
    return null;
  }
}
