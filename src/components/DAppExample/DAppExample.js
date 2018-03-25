import React from 'react';
import path from 'path';
import { object } from 'prop-types';

import createIPCHandler from '../../util/createIPCHandler';
import styles from './DAppExample.scss';

export default class DAppExample extends React.Component {
  static contextTypes = {
    store: object.isRequired
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
      <div className={styles.dappExample}>
        <h1>DApp Example</h1>
        <webview
          ref={this.registerRef}
          src="dapp.html"
          preload={this.getPreloadPath()}
          style={{ background: '#fcc', height: '200px' }}
        />
      </div>
    );
  }

  handleConsoleMessage = (event) => {
    console.log('[DApp]', event.message); // eslint-disable-line no-console
  }

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
  }

  registerRef = (el) => {
    this.webview = el;
  }

  getPreloadPath = () => {
    const publicPath = process.env.NODE_ENV === 'production' ? __dirname : process.env.PUBLIC_PATH;
    return `file:${path.join(publicPath, 'preloadRenderer.js')}`;
  }
}
