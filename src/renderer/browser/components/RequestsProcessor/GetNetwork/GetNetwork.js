import React from 'react';
import { string, func, arrayOf } from 'prop-types';

export default class GetAddress extends React.PureComponent {
  static propTypes = {
    network: string.isRequired,
    neoscan: string.isRequired,
    servers: arrayOf(string).isRequired,
    onResolve: func.isRequired
  };

  componentDidMount() {
    const { network, neoscan, servers } = this.props;
    this.props.onResolve({ network, neoscan, servers });
  }

  render() {
    return null;
  }
}
