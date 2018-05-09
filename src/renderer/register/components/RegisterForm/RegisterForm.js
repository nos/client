import React from 'react';
import { Link } from 'react-router-dom';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import Input from 'shared/components/Forms/Input';
import Button from 'shared/components/Forms/Button';

import styles from './RegisterForm.scss';

export default class RegisterForm extends React.Component {
  static propTypes = {
    disabled: bool,
    passphrase: string,
    passphraseConfirmation: string,
    setPassphrase: func,
    setPassphraseConfirmation: func,
    onRegister: func
  };

  static defaultProps = {
    disabled: false,
    passphrase: '',
    passphraseConfirmation: '',
    setPassphrase: noop,
    setPassphraseConfirmation: noop,
    onRegister: noop
  };

  render = () => {
    const { passphrase, passphraseConfirmation, disabled } = this.props;

    return (
      <form className={styles.registerForm} onSubmit={this.handleRegister}>
        <Input
          id="passphrase"
          type="password"
          label="Passphrase"
          placeholder="Enter passphrase"
          value={passphrase}
          disabled={disabled}
          onChange={this.handleChangePassphrase}
        />
        <Input
          id="passphraseConfirmation"
          type="password"
          label="Confirm Passphrase"
          placeholder="Enter passphrase again"
          value={passphraseConfirmation}
          disabled={disabled}
          onChange={this.handleChangePassphraseConfirmation}
        />

        <div className={styles.actions}>
          <Button type="submit" disabled={disabled || !this.isValid()}>Register</Button>
          <span className={styles.login}>
            Already have an account?{' '}
            <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    );
  }

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  }

  handleChangePassphraseConfirmation = (event) => {
    this.props.setPassphraseConfirmation(event.target.value);
  }

  handleRegister = (event) => {
    const { passphrase, passphraseConfirmation, onRegister } = this.props;

    event.preventDefault();
    onRegister({ passphrase, passphraseConfirmation });
  }

  isValid = () => {
    return this.props.passphrase !== '' && this.props.passphraseConfirmation !== '';
  }
}
