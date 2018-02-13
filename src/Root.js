import React from 'react';
import { HashRouter } from 'react-router-dom';

import App from './App';
import Routes from './Routes';

export default function Root() {
  return (
    <HashRouter>
      <App>
        <Routes />
      </App>
    </HashRouter>
  );
}
