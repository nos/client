import React from 'react';
import { func, any, objectOf } from 'prop-types';

export default class GetStorage extends React.Component {
  static propTypes = {
    response: objectOf(any).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentDidMount() {
    const { result } = this.props.response;
    if (result) {
      this.props.onResolve(result);
    } else {
      this.props.onReject('An error occurred');
    }
  }

  render() {
    return null;
  }
}
