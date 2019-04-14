import React from 'react';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';

import Input from 'shared/components/Forms/Input';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import Label from 'shared/components/Forms/Label';
import AuthFooter from 'auth/components/AuthFooter';

import styles from './RegisterForm.scss';

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
    const { label, passphrase, passphraseConfirmation, secretWord, loading } = this.props;

    return (
      <form className={styles.registerForm} onSubmit={this.handleRegister}>
        <LabeledInput
          id="label"
          type="text"
          label="Wallet Name"
          placeholder="Enter a name for your crypto-currency wallet"
          value={label}
          disabled={loading}
          onChange={this.handleChangeLabel}
        />

        <div className={styles.horizontal}>
          <LabeledInput
            id="passphrase"
            type="password"
            label="Passphrase"
            placeholder="Enter passphrase"
            value={passphrase}
            disabled={loading}
            onChange={this.handleChangePassphrase}
            className={styles.password}
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
        </div>

        <LabeledInput
          id="secretWord"
          type="text"
          label="Secret Word"
          placeholder="A simple word you will recognize later"
          value={secretWord}
          disabled={loading}
          onChange={this.handleChangeSecretWord}
        />

        <div className={classNames(styles.horizontal, styles.bottom)}>
          <Input
            id="useLedger"
            type="checkbox"
            value={secretWord}
            disabled={loading}
            onChange={this.handleChangeSecretWord}
            renderAfter={this.renderSearchIcon}
            className={styles.checkbox}
          />

          <PrimaryButton
            className={styles.button}
            type="submit"
            disabled={loading || !this.isValid()}
          >
            Next: Recovery Seed
          </PrimaryButton>
        </div>
      </form>
    );
  };

  renderSearchIcon = () => {
    return <Label htmlFor="useLedger" label="Use Ledger for next step" className={styles.label} />;
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
    const { label, passphrase, secretWord, passphraseConfirmation, onRegister } = this.props;

    event.preventDefault();
    onRegister({ label, passphrase, passphraseConfirmation, secretWord });
  };

  isValid = () => {
    return this.props.passphrase !== '' && this.props.passphraseConfirmation !== '';
  };
}
