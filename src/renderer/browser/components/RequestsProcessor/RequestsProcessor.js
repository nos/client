import React from 'react';
import { string, func, arrayOf, bool } from 'prop-types';
import { omit } from 'lodash';
import { progressValues } from 'spunky';

import RequestProcessor from './RequestProcessor';
import requestShape from '../../shapes/requestShape';

const { LOADED } = progressValues;

export default class RequestsProcessor extends React.PureComponent {
  static propTypes = {
    sessionId: string.isRequired,
    src: string.isRequired,
    requests: arrayOf(requestShape).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired,
    progress: bool.isRequired
  };

  render() {
    const { progress, requests } = this.props;

    // progress state of authAction, not LOAEDED = unauthenticated
    if (progress !== LOADED) {
      return null;
    }

    return requests.map(this.renderRequest);
  }

  renderRequest = (request) => {
    return (
      <RequestProcessor
        {...omit(this.props, 'requests')}
        key={`request-${request.id}`}
        request={request}
      />
    );
  };
}
