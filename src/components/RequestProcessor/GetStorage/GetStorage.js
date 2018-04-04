import React from 'react';
import { func, any, arrayOf } from 'prop-types';

export default class GetBalance extends React.Component {
  static propTypes = {
    args: arrayOf(any).isRequired,
    onResolve: func.isRequired
    // onReject: func.isRequired
  };

  componentDidMount() {
    console.log('mounted', this.props);
    const response = this.getResponse();
    this.props.onResolve(response.result);
  }

  render() {
    return null;
  }

  getResponse = () => this.props.args[0];
}
