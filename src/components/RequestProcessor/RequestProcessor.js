import React from 'react';
import { string, number, func } from 'prop-types';

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
    sessionId: number.isRequired,
    src: string.isRequired,
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
    const { src, request } = this.props;
    const Component = this.getComponent(request.channel);

    return (
      <Component
        {...request}
        src={src}
        key={`request-${request.id}`}
        onResolve={this.handleResolve}
        onReject={this.handleReject}
      />
    );
  }

  handleResolve = (result) => {
    this.props.onResolve(this.props.request, result);
  }

  handleReject = (message) => {
    this.props.onReject(this.props.request, message);
  }

  getComponent = (type) => {
    const makeComponent = COMPONENT_MAP[type];
    return makeComponent(this.props.sessionId);
  }
}
