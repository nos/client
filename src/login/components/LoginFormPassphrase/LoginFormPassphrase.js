import React from 'react';
import { Link } from 'react-router-dom';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import Input from 'shared/components/Forms/Input';
import Button from 'shared/components/Forms/Button';

import styles from './LoginFormPassphrase.scss';

export default class LoginFormWIF extends React.Component {
  static propTypes = {
    disabled: bool,
    passphrase: string,
    encryptedWIF: string,
    setPassphrase: func,
    setEncryptedWIF: func,
    onLogin: func
  };

  static defaultProps = {
    disabled: false,
    passphrase: '',
    encryptedWIF: '',
    setPassphrase: noop,
    setEncryptedWIF: noop,
    onLogin: noop
  };

  render() {
    const { passphrase, encryptedWIF, disabled } = this.props;

    return (
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <Input
          id="encryptedWIF"
          type="password"
          label="Encrypted WIF"
          placeholder="Enter encrypted WIF"
          value={encryptedWIF}
          disabled={disabled}
          onChange={this.handleChangeEncryptedWIF}
        />
        <Input
          id="passphrase"
          type="password"
          label="Passphrase"
          placeholder="Enter passphrase"
          value={passphrase}
          disabled={disabled}
          onChange={this.handleChangePassphrase}
        />

        <div className={styles.actions}>
          <Button type="submit" disabled={disabled || !this.isValid()}>Login</Button>
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

  isValid = () => {
    return this.props.passphrase !== '' && this.props.encryptedWIF !== '';
  }
}
