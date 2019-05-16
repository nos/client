import React from 'react';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';

import Input from 'shared/components/Forms/Input';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import Label from 'shared/components/Forms/Label';

import styles from './RegisterForm.scss';

export default class RegisterForm extends React.PureComponent {
  static propTypes = {
    loading: bool,
    accountLabel: string,
    passphrase: string,
    passphraseConfirmation: string,
    secretWord: string,
    isLedger: bool,
    setAccountLabel: func,
    setPassphrase: func,
    setPassphraseConfirmation: func,
    setSecretWord: func,
    storeFormData: func,
    setIsLedger: func
  };

  static defaultProps = {
    loading: false,
    accountLabel: '',
    passphrase: '',
    passphraseConfirmation: '',
    secretWord: '',
    setAccountLabel: noop,
    setPassphrase: noop,
    setPassphraseConfirmation: noop,
    setSecretWord: noop,
    storeFormData: noop,
    setIsLedger: noop,
    isLedger: false
  };

  render = () => {
    const {
      accountLabel,
      passphrase,
      passphraseConfirmation,
      secretWord,
      loading,
      isLedger
    } = this.props;

    return (
      <form className={styles.registerForm} onSubmit={this.handleStoreFormData}>
        <LabeledInput
          id="label"
          type="text"
          label="Account Name"
          placeholder="Enter a name for your crypto-currency account"
          value={accountLabel}
          disabled={loading}
          onChange={this.handleChangeAccountLabel}
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
            id="isLedger"
            type="checkbox"
            checked={isLedger}
            disabled={loading}
            onChange={this.handleChangeIsLedger}
            renderAfter={this.renderCheckboxLabel}
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

  renderCheckboxLabel = () => {
    return <Label htmlFor="isLedger" label="Use Ledger for next step" className={styles.label} />;
  };

  handleChangeIsLedger = () => {
    this.props.setIsLedger(!this.props.isLedger);
  };

  handleChangeSecretWord = (event) => {
    this.props.setSecretWord(event.target.value);
  };

  handleChangeAccountLabel = (event) => {
    this.props.setAccountLabel(event.target.value);
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleChangePassphraseConfirmation = (event) => {
    this.props.setPassphraseConfirmation(event.target.value);
  };

  handleStoreFormData = (event) => {
    const {
      accountLabel,
      passphrase,
      secretWord,
      passphraseConfirmation,
      storeFormData,
      isLedger
    } = this.props;

    event.preventDefault();
    storeFormData({
      accountLabel,
      passphrase,
      passphraseConfirmation,
      secretWord,
      isLedger
    });
  };

  isValid = () => {
    return this.props.passphrase !== '' && this.props.passphraseConfirmation !== '';
  };
}
