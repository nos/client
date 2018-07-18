import path from 'path';
import React from 'react';
import classNames from 'classnames';
import { shell } from 'electron';
import { string, bool, number, func } from 'prop-types';

import getStaticPath from '../../../util/getStaticPath';
import Error from '../Error';
import RequestsProcessor from '../RequestsProcessor';
import styles from './DAppContainer.scss';

export default class DAppContainer extends React.Component {
  static propTypes = {
    className: string,
    errorCode: number,
    errorDescription: string,
    sessionId: string.isRequired,
    target: string.isRequired,
    addressBarEntry: bool.isRequired,
    requestCount: number.isRequired,
    setTabError: func.isRequired,
    setTabTitle: func.isRequired,
    setTabTarget: func.isRequired,
    setTabLoaded: func.isRequired,
    enqueue: func.isRequired,
    dequeue: func.isRequired,
    empty: func.isRequired,
    closeTab: func.isRequired
  }

  static defaultProps = {
    className: null,
    errorCode: null,
    errorDescription: null
  }

  componentDidMount() {
    this.webview.addEventListener('console-message', this.handleConsoleMessage);
    this.webview.addEventListener('ipc-message', this.handleIPCMessage);
    this.webview.addEventListener('new-window', this.handleNewWindow);
    this.webview.addEventListener('page-title-updated', this.handlePageTitleUpdated);
    this.webview.addEventListener('will-navigate', this.handleNavigatingToPage);
    this.webview.addEventListener('did-navigate', this.handleNavigatedToPage);
    this.webview.addEventListener('did-navigate-in-page', this.handleNavigatedToAnchor);
    this.webview.addEventListener('did-fail-load', this.handleNavigateFailed);
    this.webview.addEventListener('close', this.handleCloseWindow);

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
    this.webview.removeEventListener('close', this.handleCloseWindow);

    // remove any pending requests from the queue
    this.props.empty(this.props.sessionId);
  }

  render() {
    const { className, sessionId, target } = this.props;

    return (
      <div className={classNames(styles.dAppContainer, className)}>
        {this.renderWebView()}
        {this.renderError()}

        <RequestsProcessor
          sessionId={sessionId}
          src={target}
          onResolve={this.handleResolve}
          onReject={this.handleReject}
        />
      </div>
    );
  }

  renderError() {
    const { target, errorCode, errorDescription } = this.props;

    if (errorCode === null) {
      return null;
    }

    return (
      <Error
        target={target}
        code={errorCode}
        description={errorDescription}
      />
    );
  }

  renderWebView() {
    const { errorCode } = this.props;

    return (
      <webview
        ref={this.registerRef}
        preload={this.getPreloadPath()}
        className={classNames(styles.webview, { [styles.hidden]: errorCode !== null })}
      />
    );
  }

  handleConsoleMessage = (event) => {
    console.log('[DApp]', event.message); // eslint-disable-line no-console
  }

  handleIPCMessage = (event) => {
    const { channel } = event;
    const id = event.args[0];
    const args = event.args.slice(1);

    this.props.enqueue(this.props.sessionId, { channel, id, args });
  }

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

  handleNavigateFailed = ({ errorCode, errorDescription }) => {
    this.props.setTabError(this.props.sessionId, errorCode, errorDescription);
  }

  handleNewWindow = (event) => {
    event.preventDefault();
    shell.openExternal(event.url);
  }

  handleCloseWindow = () => {
    this.props.closeTab(this.props.sessionId);
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
  }

  getPreloadPath = () => {
    return `file:${path.join(getStaticPath(), 'preloadRenderer.js')}`;
  }
}
