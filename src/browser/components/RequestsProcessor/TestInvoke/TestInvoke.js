import React from 'react';
import { any, objectOf, func } from 'prop-types';

export default class TestInvoke extends React.Component {
  static propTypes = {
    result: objectOf(any).isRequired,
    onResolve: func.isRequired
  };

  componentDidMount() {
    this.props.onResolve(this.props.result);
  }

  render() {
    return null;
  }
}
