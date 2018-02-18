import React from 'react';
import path from 'path';

import styles from './DAppExample.scss';

export default class DAppExample extends React.Component {
  componentDidMount() {
    this.webview.addEventListener('console-message', (e) => {
      console.log('[DApp]', e.message); // eslint-disable-line no-console
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
    console.log('process.env', process.env);
    const publicPath = process.env.NODE_ENV === 'production' ? __dirname : process.env.PUBLIC_PATH;
    return `file:${path.join(publicPath, 'preloadRenderer.js')}`;
  }
}
