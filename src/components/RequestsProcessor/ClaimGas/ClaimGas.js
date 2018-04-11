import React from 'react';
import { string, func } from 'prop-types';

export default class Invoke extends React.Component {
  static propTypes = {
    txid: string.isRequired,
    onResolve: func.isRequired
  };

  async componentDidMount() {
    this.props.onResolve(this.props.txid);
  }

  render() {
    return null;
  }
}
