import React from 'react';
import path from 'path';
import { shell } from 'electron';
import { string, func } from 'prop-types';

import RequestsProcessor from '../RequestsProcessor';
import styles from './DAppContainer.scss';

export default class DAppContainer extends React.Component {
  static propTypes = {
    sessionId: string.isRequired,
    src: string.isRequired,
    query: string.isRequired,
    doQuery: func.isRequired,
    enqueue: func.isRequired,
    dequeue: func.isRequired,
    empty: func.isRequired
  };

  componentDidMount() {
    this.webview.addEventListener('console-message', this.handleConsoleMessage);
    this.webview.addEventListener('ipc-message', this.handleIPCMessage);
    this.webview.addEventListener('new-window', this.handleNewWindow);
    this.webview.addEventListener('will-navigate', this.handleWillNavigate);
  }

  componentWillUnmount() {
    this.webview.removeEventListener('console-message', this.handleConsoleMessage);
    this.webview.removeEventListener('ipc-message', this.handleIPCMessage);
    this.webview.removeEventListener('new-window', this.handleNewWindow);
    this.webview.removeEventListener('will-navigate', this.handleWillNavigate);

    // remove any pending requests from the queue
    this.props.empty(this.props.sessionId);
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

        <RequestsProcessor
          sessionId={this.props.sessionId}
          src={this.props.query}
          onResolve={this.handleResolve}
          onReject={this.handleReject}
        />
      </div>
    );
  }

  handleConsoleMessage = (event) => {
    console.log('[DApp]', event.message); // eslint-disable-line no-console
  };

  handleIPCMessage = async (event) => {
    const { channel } = event;
    const id = event.args[0];
    const args = event.args.slice(1);

    this.props.enqueue(this.props.sessionId, { channel, id, args });
  };

  handleNewWindow = (event) => {
    event.preventDefault();
    shell.openExternal(event.url);
  }

  handleWillNavigate = (event) => {
    const url = new URL(event.url);
    const { protocol, host } = url;

    if (protocol === 'nos:') {
      event.preventDefault();
      this.props.doQuery(host);
    }
  }

  handleResolve = (request, result) => {
    const { channel, id } = request;
    this.webview.send(`${channel}-success-${id}`, result);
    this.props.dequeue(this.props.sessionId, id);
  }

  handleReject = (request, message) => {
    const { channel, id } = request;
    this.webview.send(`${channel}-failure-${id}`, message);
    this.props.dequeue(this.props.sessionId, id);
  }

  registerRef = (el) => {
    this.webview = el;
  };

  getPreloadPath = () => {
    const publicPath = process.env.NODE_ENV === 'production' ? __dirname : process.env.PUBLIC_PATH;
    return `file:${path.join(publicPath, 'preloadRenderer.js')}`;
  };
}
