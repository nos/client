import React from 'react';
import { Link } from 'react-router-dom';
import { bool, string, func, arrayOf } from 'prop-types';
import { noop, map } from 'lodash';

import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import Select from '../../Forms/Select';
import styles from './LoginFormPassphrase.scss';

export default class LoginFormWIF extends React.Component {
  static propTypes = {
    disabled: bool,
    passphrase: string,
    encryptedWIF: string,
    encryptedWIFs: arrayOf(string),
    setPassphrase: func,
    setEncryptedWIF: func,
    onLogin: func
  };

  static defaultProps = {
    disabled: false,
    passphrase: '',
    encryptedWIF: '',
    encryptedWIFs: [],
    setPassphrase: noop,
    setEncryptedWIF: noop,
    onLogin: noop
  };

  render() {
    const { passphrase, encryptedWIF, encryptedWIFs, disabled } = this.props;
    console.log(encryptedWIFs);

    return (
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <Select className={styles.accounts} value={encryptedWIF} onChange={this.handleSelect}>
          <option value="">Select an account</option>
          {map(encryptedWIFs, (account, index) => (
            <option value={account} key={`account${index}`}>{account}</option>
          ))}
        </Select>
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

  handleSelect = (event) => {
    this.props.setEncryptedWIF(event.target.value);
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
