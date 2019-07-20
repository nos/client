import React from 'react';
import { string, func } from 'prop-types';
import { isEqual, castArray } from 'lodash';

import { getComponent, getActions } from './mappings';
import requestShape from '../../shapes/requestShape';

export default class RequestProcessor extends React.PureComponent {
  static propTypes = {
    sessionId: string.isRequired,
    src: string.isRequired,
    request: requestShape.isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentWillMount = () => {
    this.Component = this.getComponent(this.props);
  };

  componentWillReceiveProps = (nextProps) => {
    if (
      this.props.sessionId !== nextProps.sessionId ||
      this.props.src !== nextProps.src ||
      !isEqual(this.props.request, nextProps.request)
    ) {
      this.Component = this.getComponent(nextProps);
    }
  };

  render() {
    const { request } = this.props;

    return (
      <this.Component
        {...request}
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
  };

  handleReject = (request) => {
    return (message) => {
      this.props.onReject(request, message);
    };
  };

  getComponent = ({ sessionId, request }) => {
    const makeComponent = getComponent(request.channel);
    const makeActions = getActions(request.channel);
    const actions = castArray(makeActions).map((makeAction) => makeAction(sessionId, request.id));

    return makeComponent(...actions);
  };
}
