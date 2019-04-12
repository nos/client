import React from 'react';
import { Link } from 'react-router-dom';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './RegisterForm.scss';
import AuthButton from '../../AuthButton';

export default class RegisterForm extends React.PureComponent {
  static propTypes = {
    loading: bool,
    label: string,
    passphrase: string,
    passphraseConfirmation: string,
    secretWord: string,
    setLabel: func,
    setPassphrase: func,
    setPassphraseConfirmation: func,
    setSecretWord: func,
    onRegister: func
  };

  static defaultProps = {
    loading: false,
    label: '',
    passphrase: '',
    passphraseConfirmation: '',
    secretWord: '',
    setLabel: noop,
    setPassphrase: noop,
    setPassphraseConfirmation: noop,
    setSecretWord: noop,
    onRegister: noop
  };

  render = () => {
    const {
      label,
      passphrase,
      passphraseConfirmation,
      secretWord,
      loading
    } = this.props;

    return (
      <form className={styles.registerForm} onSubmit={this.handleRegister}>
        <LabeledInput
          id="label"
          type="text"
          label="Wallet Name"
          placeholder="Enter Wallet Name"
          value={label}
          disabled={loading}
          onChange={this.handleChangeLabel}
        />
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
        <LabeledInput
          id="secretWord"
          type="text"
          label="Secret Word"
          placeholder="Enter a simple word that you will recognize later"
          value={secretWord}
          disabled={loading}
          onChange={this.handleChangeSecretWord}
        />

        <AuthButton
          buttonText="Create Wallet"
          className={styles.register}
          type="submit"
          disabled={loading || !this.isValid()}
        />
      </form>
    );
  };

  handleChangeSecretWord = (event) => {
    this.props.setSecretWord(event.target.value);
  };

  handleChangeLabel = (event) => {
    this.props.setLabel(event.target.value);
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleChangePassphraseConfirmation = (event) => {
    this.props.setPassphraseConfirmation(event.target.value);
  };

  handleRegister = (event) => {
    const {
      label,
      passphrase,
      secretWord,
      passphraseConfirmation,
      onRegister
    } = this.props;

    event.preventDefault();
    onRegister({ label, passphrase, passphraseConfirmation, secretWord });
  };

  isValid = () => {
    return (
      this.props.passphrase !== '' && this.props.passphraseConfirmation !== ''
    );
  };
}
