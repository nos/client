import React from 'react';
import { string, func } from 'prop-types';

export default class Decrypt extends React.Component {
  static propTypes = {
    data: string.isRequired,
    onResolve: func.isRequired
  };

  componentDidMount() {
    this.props.onResolve(this.props.data);
  }

  render() {
    return null;
  }
}
