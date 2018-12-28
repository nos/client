import React from 'react';
import { Link } from 'react-router-dom';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './RegisterForm.scss';

export default class RegisterForm extends React.PureComponent {
  static propTypes = {
    loading: bool,
    passphrase: string,
    passphraseConfirmation: string,
    setPassphrase: func,
    setPassphraseConfirmation: func,
    onRegister: func
  };

  static defaultProps = {
    loading: false,
    passphrase: '',
    passphraseConfirmation: '',
    setPassphrase: noop,
    setPassphraseConfirmation: noop,
    onRegister: noop
  };

  render = () => {
    const { passphrase, passphraseConfirmation, loading } = this.props;

    return (
      <form className={styles.registerForm} onSubmit={this.handleRegister}>
        <LabeledInput
          id="passphrase"
          type="password"
          label="Passphrase"
          placeholder="Enter passphrase"
          value={passphrase}
          disabled={loading}
          onChange={this.handleChangePassphrase}
        />
        <LabeledInput
          id="passphraseConfirmation"
          type="password"
          label="Confirm Passphrase"
          placeholder="Enter passphrase again"
          value={passphraseConfirmation}
          disabled={loading}
          onChange={this.handleChangePassphraseConfirmation}
        />

        <div className={styles.actions}>
          <PrimaryButton
            className={styles.register}
            type="submit"
            disabled={loading || !this.isValid()}
          >
            Register
          </PrimaryButton>
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
