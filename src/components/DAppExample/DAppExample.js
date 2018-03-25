import React from 'react';
import path from 'path';

import styles from './DAppExample.scss';

export default class DAppExample extends React.Component {
  componentDidMount() {
    this.webview.addEventListener('console-message', (event) => {
      console.log('[DApp]', event.message); // eslint-disable-line no-console
    });

    this.webview.addEventListener('ipc-message', (event) => {
      try {
        console.log('[DApp IPC]', event.channel, event.args, event); // eslint-disable-line no-console
        this.webview.send(`${event.channel}-success`, '3.59460235');
      } catch (err) {
        this.webview.send(`${event.channel}-failure`, err.message);
      }
    });
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

  registerRef = (el) => {
    this.webview = el;
  }

  getPreloadPath = () => {
    const publicPath = process.env.NODE_ENV === 'production' ? __dirname : process.env.PUBLIC_PATH;
    return `file:${path.join(publicPath, 'preloadRenderer.js')}`;
  }
}
