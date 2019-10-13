import React from 'react';
import { func, any, objectOf } from 'prop-types';

export default class CurrentNetwork extends React.PureComponent {
  static propTypes = {
    data: objectOf(any).isRequired,
    onResolve: func.isRequired
  };

  componentDidMount() {
    this.props.onResolve(this.props.data);
  }

  render() {
    return null;
  }
}
