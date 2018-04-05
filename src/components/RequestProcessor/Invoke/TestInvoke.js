import React from 'react';
import { func, any, arrayOf } from 'prop-types';

export default class TestInvoke extends React.Component {
  static propTypes = {
    args: arrayOf(any).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentDidMount() {
    // TODO process invoke result
    this.props.onResolve(this.props.args);
  }

  render() {
    return null;
  }
}
