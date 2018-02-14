import React from 'react';
import { NavLink } from 'react-router-dom';
import { node } from 'prop-types';

import logo from './logo.svg';
import './App.css';

export default function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <NavLink exact to="/">Home</NavLink>
      </header>
      <div>
        {props.children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: node
};

App.defaultProps = {
  children: null
};
