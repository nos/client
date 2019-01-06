import React from 'react';
import { string, func } from 'prop-types';

export default class Encrypt extends React.Component {
  static propTypes = {
    iv: string.isRequired,
    mac: string.isRequired,
    data: string.isRequired,
    onResolve: func.isRequired
  };

  componentDidMount() {
    this.props.onResolve({ iv: this.props.iv, mac: this.props.mac, data: this.props.data });
  }

  render() {
    return null;
  }
}
