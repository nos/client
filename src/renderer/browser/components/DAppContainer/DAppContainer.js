import path from 'path';
import React from 'react';
import classNames from 'classnames';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import getStaticPath from '../../../util/getStaticPath';
import bindContextMenu from '../../util/bindContextMenu';
import fetchBestIcon from '../../util/fetchBestIcon';
import RequestsProcessor from '../RequestsProcessor';
import tabShape from '../../shapes/tabShape';
import styles from './DAppContainer.scss';

export default class DAppContainer extends React.PureComponent {
  static propTypes = {
    className: string,
    sessionId: string.isRequired,
    active: bool,
    tab: tabShape.isRequired,
    setTabTitle: func.isRequired,
    setTabTarget: func.isRequired,
    setTabIcon: func.isRequired,
    setTabLoaded: func.isRequired,
    enqueue: func.isRequired,
    dequeue: func.isRequired,
    empty: func.isRequired,
    openTab: func.isRequired,
    closeTab: func.isRequired,
    onFocus: func // eslint-disable-line react/no-unused-prop-types
  };

  static defaultProps = {
    className: null,
    active: false,
    onFocus: noop
  };

  async componentDidMount() {
    window.addEventListener('focus', this.handleWindowFocus);

    this.webview.addEventListener('dom-ready', this.handleDomReady);
    this.webview.addEventListener('ipc-message', this.handleIPCMessage);
    this.webview.addEventListener('new-window', this.handleNewWindow);
    this.webview.addEventListener('page-title-updated', this.handlePageTitleUpdated);
    this.webview.addEventListener('page-favicon-updated', this.handlePageIconUpdated);
    this.webview.addEventListener('will-navigate', this.handleNavigatingToPage);
    this.webview.addEventListener('did-navigate', this.handleNavigatedToPage);
    this.webview.addEventListener('did-navigate-in-page', this.handleNavigatedToAnchor);
    this.webview.addEventListener('did-start-loading', this.handleLoading);
    this.webview.addEventListener('did-stop-loading', this.handleLoaded);
    this.webview.addEventListener('did-fail-load', this.handleNavigateFailed);
    this.webview.addEventListener('close', this.handleCloseWindow);

    bindContextMenu(this.webview);

    this.webview.src = this.props.tab.target;
  }

  async componentWillReceiveProps(nextProps) {
    const nextTab = nextProps.tab;

    if (nextTab.addressBarEntry && nextTab.requestCount !== this.props.tab.requestCount) {
      this.webview.loadURL(nextTab.target);
    }

    if (nextProps.active && !this.props.active) {
      this.focusAndNotify();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.handleWindowFocus);

    this.webview.removeEventListener('dom-ready', this.handleDomReady);
    this.webview.removeEventListener('ipc-message', this.handleIPCMessage);
    this.webview.removeEventListener('new-window', this.handleNewWindow);
    this.webview.removeEventListener('page-title-updated', this.handlePageTitleUpdated);
    this.webview.removeEventListener('page-favicon-updated', this.handlePageIconUpdated);
    this.webview.removeEventListener('will-navigate', this.handleNavigatingToPage);
    this.webview.removeEventListener('did-navigate', this.handleNavigatedToPage);
    this.webview.removeEventListener('did-navigate-in-page', this.handleNavigatedToAnchor);
    this.webview.removeEventListener('did-fail-load', this.handleNavigateFailed);
    this.webview.removeEventListener('did-start-loading', this.handleLoading);
    this.webview.removeEventListener('did-stop-loading', this.handleLoaded);
    this.webview.removeEventListener('close', this.handleCloseWindow);

    // remove any pending requests from the queue
    this.props.empty(this.props.sessionId);
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classNames(styles.dAppContainer, className)}>
        {this.renderWebView()}
        {this.renderRequestProcessor()}
      </div>
    );
  }

  renderWebView() {
    return (
      <webview ref={this.registerRef} preload={this.getPreloadPath()} className={styles.webview} />
    );
  }

  renderRequestProcessor = () => {
    const { sessionId, tab } = this.props;

    return (
      <RequestsProcessor
        sessionId={sessionId}
        src={tab.target}
        onResolve={this.handleResolve}
        onReject={this.handleReject}
      />
    );
  };

  handleWindowFocus = () => {
    this.webview.focus();
  };

  handleDomReady = () => {
    this.focusAndNotify();
  };

  handleIPCMessage = (event) => {
    switch (event.channel) {
      case 'view:zoom':
        this.handleIPCZoom(event);
        break;
      default:
        this.handleIPCAPI(event);
    }
  };

  handleIPCZoom = (event) => {
    const difference = event.args[0] > 0 ? -0.5 : 0.5;

    this.webview.getZoomLevel((zoomLevel) => {
      this.webview.setZoomLevel(zoomLevel + difference);
    });
  };

  handleIPCAPI = (event) => {
    const { channel } = event;
    const id = event.args[0];
    const args = event.args.slice(1);

    this.props.enqueue(this.props.sessionId, { channel, id, args });
  };

  handlePageTitleUpdated = (event) => {
    this.props.setTabTitle(this.props.sessionId, event.title);
  };

  handlePageIconUpdated = async (event) => {
    this.props.setTabIcon(this.props.sessionId, await fetchBestIcon(event.favicons));
  };

  handleNavigatingToPage = (event) => {
    this.props.setTabTarget(this.props.sessionId, event.url);
  };

  handleNavigatedToPage = (event) => {
    this.props.setTabTarget(this.props.sessionId, event.url);
  };

  handleNavigatedToAnchor = (event) => {
    if (event.isMainFrame) {
      this.props.setTabTarget(this.props.sessionId, event.url);
    }
  };

  handleNavigateFailed = (event) => {
    if (event.isMainFrame) {
      this.webview.send(
        'did-fail-load',
        event.validatedURL,
        event.errorCode,
        event.errorDescription
      );
    }
  };

  handleLoading = () => {
    this.props.setTabLoaded(this.props.sessionId, false);
  };

  handleLoaded = () => {
    this.props.setTabLoaded(this.props.sessionId, true);
  };

  handleNewWindow = (event) => {
    this.props.openTab({ target: event.url });
  };

  handleCloseWindow = () => {
    this.props.closeTab(this.props.sessionId);
  };

  handleResolve = (request, result) => {
    const { channel, id } = request;
    this.webview.send(`${channel}-success-${id}`, result);
    this.props.dequeue(this.props.sessionId, id);
  };

  handleReject = (request, message) => {
    const { channel, id } = request;
    this.webview.send(`${channel}-failure-${id}`, message);
    this.props.dequeue(this.props.sessionId, id);
  };

  registerRef = (el) => {
    this.webview = el;
  };

  getPreloadPath = () => {
    return `file:${path.join(getStaticPath(), 'preloadRenderer.js')}`;
  };

  focusAndNotify = () => {
    this.webview.focus();
    this.props.onFocus(this.webview.getWebContents().getId());
  };
}
