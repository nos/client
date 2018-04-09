import React from 'react';
import { string, func } from 'prop-types';

export default class TestInvoke extends React.Component {
  static propTypes = {
    script: string.isRequired,
    onResolve: func.isRequired
  };

  componentDidMount() {
    this.props.onResolve(this.props.script);
  }

  render() {
    return null;
  }
}
