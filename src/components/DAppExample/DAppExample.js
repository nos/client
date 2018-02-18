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
    if (process.platform === 'darwin' && process.env.NODE_ENV !== 'production') {
      // On MacOS, the preloadRenderer.js file is not included in the `.asar` file when running
      // in development.  To work around this, just point to the `public` development version.
      return `file:${path.join(__dirname, '../../../../../../../../public/preloadRenderer.js')}`;
    } else {
      return `file:${path.join(__dirname, 'preloadRenderer.js')}`;
    }
  }
}
