import React from 'react';
import { string, func, arrayOf } from 'prop-types';

import GetAddress from './GetAddress';
import GetBalance from './GetBalance';
import SampleConfirm from './SampleConfirm';
import Invoke from './Invoke';
import Send from './Send';
import ClaimGas from './ClaimGas';
import TestInvoke from './TestInvoke';
import GetStorage from './GetStorage';

import requestShape from '../../shapes/requestShape';

const COMPONENT_MAP = {
  getAddress: GetAddress,
  getBalance: GetBalance,
  getStorage: GetStorage,
  testInvoke: TestInvoke,
  sampleConfirm: SampleConfirm,
  send: Send,
  claimGas: ClaimGas,
  invoke: Invoke
};

export default class RequestProcessor extends React.Component {
  static propTypes = {
    sessionId: string.isRequired,
    src: string.isRequired,
    requests: arrayOf(requestShape).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  render() {
    return this.props.requests.map(this.renderRequest);
  }

  renderRequest = (request) => {
    const Component = this.getComponent(request);

    return (
      <Component
        {...request}
        key={`request-${request.id}`}
        src={this.props.src}
        onResolve={this.handleResolve(request)}
        onReject={this.handleReject(request)}
      />
    );
  }

  handleResolve = (request) => {
    return (result) => {
      this.props.onResolve(request, result);
    };
  }

  handleReject = (request) => {
    return (message) => {
      this.props.onReject(request, message);
    };
  }

  getComponent = (request) => {
    const makeComponent = COMPONENT_MAP[request.channel];
    return makeComponent(this.props.sessionId);
  }
}
