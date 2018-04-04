import React from 'react';
import { Link } from 'react-router-dom';
import { string, func } from 'prop-types';
import { noop } from 'lodash';

import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import styles from './LoginFormPassphrase.scss';

export default class LoginFormWIF extends React.Component {
  static propTypes = {
    passphrase: string,
    encryptedWIF: string,
    setPassphrase: func,
    setEncryptedWIF: func,
    onLogin: func
  };

  static defaultProps = {
    passphrase: '',
    encryptedWIF: '',
    setPassphrase: noop,
    setEncryptedWIF: noop,
    onLogin: noop
  };

  render() {
    return (
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <label htmlFor="encryptedWIF">
          <Input
            id="encryptedWIF"
            type="password"
            label="Encrypted WIF"
            placeholder="Enter encrypted WIF"
            value={this.props.encryptedWIF}
            onChange={this.handleChangeEncryptedWIF}
          />
        </label>
        <label htmlFor="passphrase">
          <Input
            id="passphrase"
            type="password"
            label="Passphrase"
            placeholder="Enter passphrase"
            value={this.props.passphrase}
            onChange={this.handleChangePassphrase}
          />
        </label>

        <div className={styles.actions}>
          <Button type="submit">Login</Button>
          <span className={styles.register}>
            New to NEO?{' '}
            <Link to="/register">Create an account</Link>
          </span>
        </div>
      </form>
    );
  }

  handleChangeEncryptedWIF = (event) => {
    this.props.setEncryptedWIF(event.target.value);
  }

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  }

  handleLogin = (event) => {
    const { passphrase, encryptedWIF, onLogin } = this.props;

    event.preventDefault();
    onLogin({ passphrase, encryptedWIF });
  }
}
