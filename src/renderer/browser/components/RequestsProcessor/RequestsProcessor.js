import React from 'react';
import { string, func, arrayOf } from 'prop-types';
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
    progress: string.isRequired
  };

  render() {
    return this.props.requests.map(this.renderRequest);
  }

  renderRequest = (request) => {
    const { progress } = this.props;

    return (
      <RequestProcessor
        {...omit(this.props, 'requests', 'progress')}
        key={`request-${request.id}`}
        request={request}
        authenticated={progress === LOADED}
      />
    );
  };
}
