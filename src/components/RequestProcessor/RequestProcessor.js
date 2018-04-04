import React from 'react';
import { string, func } from 'prop-types';

import GetAddress from './GetAddress';
import GetBalance from './GetBalance';
import SampleConfirm from './SampleConfirm';
import TestInvoke from './Invoke';
import requestShape from '../../shapes/requestShape';

const COMPONENT_MAP = {
  getAddress: GetAddress,
  getBalance: GetBalance,
  sampleConfirm: SampleConfirm,
  testInvoke: TestInvoke
};

export default class RequestProcessor extends React.Component {
  static propTypes = {
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
