import React from 'react';
import { string, func, arrayOf } from 'prop-types';

import { getComponent, getActions } from './mappings';
import requestShape from '../../shapes/requestShape';

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
    const { channel } = request;
    const { sessionId } = this.props;

    const makeComponent = getComponent(channel);
    const makeActions = getActions(channel);
    const actions = makeActions(sessionId, request.id);

    return makeComponent(actions);
  }
}
