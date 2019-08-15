import React from 'react';
import { string, func, arrayOf, bool } from 'prop-types';
import { omit } from 'lodash';

import RequestProcessor from './RequestProcessor';
import requestShape from '../../shapes/requestShape';

export default class RequestsProcessor extends React.PureComponent {
  static propTypes = {
    sessionId: string.isRequired,
    src: string.isRequired,
    requests: arrayOf(requestShape).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired,
    authenticated: bool.isRequired
  };

  render() {
    return this.props.requests.map(this.renderRequest);
  }

  renderRequest = (request) => {
    const { authenticated } = this.props;

    return (
      <RequestProcessor
        {...omit(this.props, 'requests')}
        key={`request-${request.id}`}
        request={request}
        authenticated={authenticated}
      />
    );
  };
}
