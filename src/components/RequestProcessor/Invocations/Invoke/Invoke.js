import React from 'react';
import {func, any, arrayOf} from 'prop-types';

export default class Invoke extends React.Component {
  static propTypes = {
    response: Object.isRequired, // TODO do not return object, but shape
    args: arrayOf(any).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  async componentDidMount() {
    console.log('I come here', this.props);
    this.props.onResolve(this.props.response);
  }

  render() {
    return null;
  }
}
