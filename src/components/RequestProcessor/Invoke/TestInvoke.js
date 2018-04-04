import React from 'react';
import { func, any, arrayOf } from 'prop-types';

export default class TestInvoke extends React.Component {
  static propTypes = {
    args: arrayOf(any).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentDidMount() {
    console.log('API called with args:', this.props.args); // eslint-disable-line no-console
    this.props.onResolve(this.props.args);
  }

  render() {
    return null;
  }
}
