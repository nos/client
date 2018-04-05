import React from 'react';
import { func, any, arrayOf, objectOf } from 'prop-types';

export default class GetStorage extends React.Component {
  static propTypes = {
    response: objectOf(any).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentDidMount() {
    const { result } = this.props.response;
    this.props.onResolve(result);
  }

  render() {
    return null;
  }
}
