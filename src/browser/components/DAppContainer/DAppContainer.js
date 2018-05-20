import path from 'path';
import React from 'react';
import classNames from 'classnames';
import { shell } from 'electron';
import { string, bool, number, func } from 'prop-types';

import RequestsProcessor from '../RequestsProcessor';
import styles from './DAppContainer.scss';

export default class DAppContainer extends React.Component {
  static propTypes = {
    className: string,
    sessionId: string.isRequired,
    target: string.isRequired,
    addressBarEntry: bool.isRequired,
    requestCount: number.isRequired,
    setTabTitle: func.isRequired,
    setTabTarget: func.isRequired,
    setTabLoaded: func.isRequired,
    enqueue: func.isRequired,
    dequeue: func.isRequired,
    empty: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  componentDidMount() {
    this.webview.addEventListener('console-message', this.handleConsoleMessage);
    this.webview.addEventListener('ipc-message', this.handleIPCMessage);
    this.webview.addEventListener('new-window', this.handleNewWindow);
    this.webview.addEventListener('page-title-updated', this.handlePageTitleUpdated);
    this.webview.addEventListener('will-navigate', this.handleNavigatingToPage);
    this.webview.addEventListener('did-navigate', this.handleNavigatedToPage);
    this.webview.addEventListener('did-navigate-in-page', this.handleNavigatedToAnchor);
    this.webview.addEventListener('did-fail-load', this.handleNavigateFailed);

    this.webview.src = this.props.target;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addressBarEntry && nextProps.requestCount !== this.props.requestCount) {
      this.webview.loadURL(nextProps.target);
    }
  }

  componentWillUnmount() {
    this.webview.removeEventListener('console-message', this.handleConsoleMessage);
    this.webview.removeEventListener('ipc-message', this.handleIPCMessage);
    this.webview.removeEventListener('new-window', this.handleNewWindow);
    this.webview.removeEventListener('page-title-updated', this.handlePageTitleUpdated);
    this.webview.removeEventListener('will-navigate', this.handleNavigatingToPage);
    this.webview.removeEventListener('did-navigate', this.handleNavigatedToPage);
    this.webview.removeEventListener('did-navigate-in-page', this.handleNavigatedToAnchor);
    this.webview.removeEventListener('did-fail-load', this.handleNavigateFailed);

    // remove any pending requests from the queue
    this.props.empty(this.props.sessionId);
  }

  render() {
    return (
      <div className={classNames(styles.dAppContainer, this.props.className)}>
        <webview
          ref={this.registerRef}
          preload={this.getPreloadPath()}
          style={{ height: '100%' }}
        />

        <RequestsProcessor
          sessionId={this.props.sessionId}
          src={this.props.target}
          onResolve={this.handleResolve}
          onReject={this.handleReject}
        />
      </div>
    );
  }

  handleConsoleMessage = (event) => {
    console.log('[DApp]', event.message); // eslint-disable-line no-console
  };

  handleIPCMessage = (event) => {
    const { channel } = event;
    const id = event.args[0];
    const args = event.args.slice(1);

    this.props.enqueue(this.props.sessionId, { channel, id, args });
  };

  handlePageTitleUpdated = (event) => {
    this.props.setTabTitle(this.props.sessionId, event.title);
  }

  handleNavigatingToPage = (event) => {
    this.props.setTabTarget(this.props.sessionId, event.url);
  }

  handleNavigatedToPage = () => {
    this.props.setTabLoaded(this.props.sessionId, true);
  }

  handleNavigatedToAnchor = (event) => {
    this.props.setTabTarget(this.props.sessionId, event.url, { leavingPage: false });
  }

  handleNavigateFailed = (_event) => {
    // TODO: Display an error page or something.  For now, just clear out the loading spinner.
    this.props.setTabLoaded(this.props.sessionId, true);
  }

  handleNewWindow = (event) => {
    event.preventDefault();
    shell.openExternal(event.url);
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
