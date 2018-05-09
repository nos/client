import React from 'react';
import { func } from 'prop-types';

import testInvokeShape from '../../../shapes/testInvokeShape';

export default class TestInvoke extends React.Component {
  static propTypes = {
    result: testInvokeShape.isRequired,
    onResolve: func.isRequired
  };

  componentDidMount() {
    this.props.onResolve(this.props.result);
  }

  render() {
    return null;
  }
}
