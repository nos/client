import React from 'react';
import path from 'path';
import { object, string } from 'prop-types';

import createIPCHandler from '../../util/createIPCHandler';
import styles from './DAppContainer.scss';

export default class DAppContainer extends React.Component {
  static contextTypes = {
    store: object.isRequired
  };

  static propTypes = {
    src: string.isRequired
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

    try {
      const handle = createIPCHandler(channel);
      const result = await handle(this.context.store, ...args);
      this.webview.send(`${channel}-success-${id}`, result);
    } catch (err) {
      this.webview.send(`${channel}-failure-${id}`, err.message);
    }
  };

  registerRef = (el) => {
    this.webview = el;
  };

  getPreloadPath = () => {
    const publicPath = process.env.NODE_ENV === 'production' ? __dirname : process.env.PUBLIC_PATH;
    return `file:${path.join(publicPath, 'preloadRenderer.js')}`;
  };
}
