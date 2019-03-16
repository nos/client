import React from 'react';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';

import styles from './LoginFormPassphrase.scss';
import LoginButton from '../LoginButton';

export default class LoginFormWIF extends React.PureComponent {
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
        <LabeledInput
          id="encryptedWIF"
          type="password"
          label="Encrypted key"
          placeholder="Enter encrypted key"
          value={encryptedWIF}
          disabled={disabled}
          onChange={this.handleChangeEncryptedWIF}
        />
        <LabeledInput
          id="passphrase"
          type="password"
          label="Passphrase"
          placeholder="Enter passphrase"
          value={passphrase}
          disabled={disabled}
          onChange={this.handleChangePassphrase}
        />

        <LoginButton disabled={disabled || !this.isValid()} />
      </form>
    );
  }

  handleChangeEncryptedWIF = (event) => {
    this.props.setEncryptedWIF(event.target.value);
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleLogin = (event) => {
    const { passphrase, encryptedWIF, onLogin } = this.props;

    event.preventDefault();
    onLogin({ passphrase, encryptedWIF });
  };

  isValid = () => {
    return this.props.passphrase !== '' && this.props.encryptedWIF !== '';
  };
}
