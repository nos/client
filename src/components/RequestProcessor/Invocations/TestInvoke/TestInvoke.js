import React from 'react';
import { func } from 'prop-types';

export default class TestInvoke extends React.Component {
  static propTypes = {
    response: Object.isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentDidMount() {
    if (this.props.response) {
      this.props.onResolve(this.props.response.result.script);
    } else {
      this.props.onReject('An error occurred.');
    }
  }

  render() {
    return null;
  }
}
