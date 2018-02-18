import React from 'react';
import PropTypes from 'prop-types';

import styles from './Login.scss';

const { func } = PropTypes;

export default class Login extends React.Component {
  static propTypes = {
    onLogin: func.isRequired
  };

  state = {
    wif: ''
  };

  render() {
    return (
      <div className={styles.login}>
        <label htmlFor="wif">
          WIF:
          <input id="wif" type="text" value={this.state.wif} onChange={this.handleChange} />
        </label>
        <button type="button" onClick={this.handleLogin}>Login</button>
      </div>
    );
  }

  handleChange = (event) => {
    this.setState({ wif: event.target.value });
  }

  handleLogin = () => {
    this.props.onLogin(this.state.wif);
  }
}
