import React from 'react';
import path from 'path';
import { object, string, func, arrayOf } from 'prop-types';
import { map } from 'lodash';

import GetAddress from './handlers/GetAddress';
import GetBalance from './handlers/GetBalance';
import styles from './DAppContainer.scss';

const COMPONENT_MAP = {
  getAddress: GetAddress,
  getBalance: GetBalance
};

const mapComponent = (type) => {
  return COMPONENT_MAP[type];
};

export default class DAppContainer extends React.Component {
  static propTypes = {
    src: string.isRequired,
    requests: arrayOf(object).isRequired,
    enqueue: func.isRequired,
    dequeue: func.isRequired
  };

  componentDidMount() {
    this.webview.addEventListener('console-message', this.handleConsoleMessage);
    this.webview.addEventListener('ipc-message', this.handleIPCMessage);
  }

  componentWillUnmount() {
    this.webview.removeEventListener('console-message', this.handleConsoleMessage);
    this.webview.removeEventListener('ipc-message', this.handleIPCMessage);
  }

  render() {
    return (
      <div className={styles.dAppContainer}>
        <webview
          ref={this.registerRef}
          src={this.props.src}
          preload={this.getPreloadPath()}
          style={{ height: '100%' }}
        />

        {this.renderProcessingRequests()}
      </div>
    );
  }

  renderProcessingRequests = () => {
    return map(this.props.requests, (request) => {
      const Component = mapComponent(request.channel);

      return (
        <Component
          {...request}
          key={`request-${request.id}`}
          onResolve={this.handleResolve(request)}
          onReject={this.handleReject(request)}
        />
      );
    });
  }

  handleConsoleMessage = (event) => {
    console.log('[DApp]', event.message); // eslint-disable-line no-console
  };

  handleIPCMessage = async (event) => {
    const { channel } = event;
    const id = event.args[0];
    const args = event.args.slice(1);

    this.props.enqueue({ channel, id, args });
  };

  handleResolve = ({ channel, id }) => (result) => {
    this.webview.send(`${channel}-success-${id}`, result);
    this.props.dequeue(id);
  }

  handleReject = ({ channel, id }) => (message) => {
    this.webview.send(`${channel}-failure-${id}`, message);
    this.props.dequeue(id);
  }

  registerRef = (el) => {
    this.webview = el;
  };

  getPreloadPath = () => {
    const publicPath = process.env.NODE_ENV === 'production' ? __dirname : process.env.PUBLIC_PATH;
    return `file:${path.join(publicPath, 'preloadRenderer.js')}`;
  };
}
