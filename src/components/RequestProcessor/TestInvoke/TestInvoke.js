import React from 'react';
import { func, any, arrayOf } from 'prop-types';

export default class TestInvoke extends React.Component {
  static propTypes = {
    response: Object.isRequired,
    args: arrayOf(any).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentDidMount() {
    this.props.onResolve(this.props.response.result.script);
  }

  render() {
    return null;
  }
}
