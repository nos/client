import React from 'react';
import { Switch, Route, NoMatch } from 'react-router-dom';

const Home = () => (
  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
  </p>
);

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  );
}
