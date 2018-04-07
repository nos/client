import React from 'react';
import { func } from 'prop-types';

import GetAddress from './GetAddress';
import GetBalance from './GetBalance';
import SampleConfirm from './SampleConfirm';
import TestInvoke from './Invocations/TestInvoke';
import Invoke from './Invocations/Invoke';
import GetStorage from './GetStorage';

import requestShape from '../../shapes/requestShape';

const COMPONENT_MAP = {
  // Actions - No confirmation required
  getAddress: GetAddress,
  getBalance: GetBalance,
  getStorage: GetStorage,

  testInvoke: TestInvoke,

  // Actions - Confirmation required
  sampleConfirm: SampleConfirm,
  invoke: Invoke
};

export default class RequestProcessor extends React.Component {
  static propTypes = {
    request: requestShape,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  static defaultProps = {
    request: null
  };

  render() {
    if (!this.props.request) {
      return null;
    }

    return this.renderRequest();
  }

  renderRequest = () => {
    const { request } = this.props;
    const Component = this.getComponent(request.channel);

    return (
      <Component
        {...request}
        key={`request-${request.id}`}
        onResolve={this.handleResolve}
        onReject={this.handleReject}
      />
    );
  };

  handleResolve = (result) => {
    this.props.onResolve(this.props.request, result);
  };

  handleReject = (message) => {
    this.props.onReject(this.props.request, message);
  };

  getComponent = (type) => {
    return COMPONENT_MAP[type];
  }
}
