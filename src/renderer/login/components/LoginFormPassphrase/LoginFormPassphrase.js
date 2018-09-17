import React from 'react';
import { Link } from 'react-router-dom';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './LoginFormPassphrase.scss';

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
          label="Encrypted WIF"
          placeholder="Enter encrypted WIF"
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

        <div className={styles.actions}>
          <PrimaryButton
            className={styles.login}
            type="submit"
            disabled={disabled || !this.isValid()}
          >
            Login
          </PrimaryButton>
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
