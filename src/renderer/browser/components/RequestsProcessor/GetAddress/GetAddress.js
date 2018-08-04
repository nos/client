import React from 'react';
import { string, func } from 'prop-types';

export default class GetAddress extends React.PureComponent {
  static propTypes = {
    address: string.isRequired,
    onResolve: func.isRequired
  };

  componentDidMount() {
    this.props.onResolve(this.props.address);
  }

  render() {
    return null;
  }
}
