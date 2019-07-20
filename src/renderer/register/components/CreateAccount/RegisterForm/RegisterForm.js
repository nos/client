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
    passphraseConfirm: string,
    secretWord: string,
    isHardware: bool,
    setAccountLabel: func,
    setPassphrase: func,
    setPassphraseConfirm: func,
    setSecretWord: func,
    storeFormData: func,
    setIsHardware: func
  };

  static defaultProps = {
    loading: false,
    accountLabel: '',
    passphrase: '',
    passphraseConfirm: '',
    secretWord: '',
    setAccountLabel: noop,
    setPassphrase: noop,
    setPassphraseConfirm: noop,
    setSecretWord: noop,
    storeFormData: noop,
    setIsHardware: noop,
    isHardware: false
  };

  render = () => {
    const {
      accountLabel,
      passphrase,
      passphraseConfirm,
      secretWord,
      loading,
      isHardware
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
            id="passphraseConfirm"
            type="password"
            label="Confirm Passphrase"
            placeholder="Enter passphrase again"
            value={passphraseConfirm}
            disabled={loading}
            onChange={this.handleChangePassphraseConfirm}
          />
        </div>

        <LabeledInput
          id="secretWord"
          type="text"
          label="Secret Word"
          placeholder="A simple word you will recognize later"
          maxLength="24"
          value={secretWord}
          disabled={loading}
          onChange={this.handleChangeSecretWord}
        />

        <div className={classNames(styles.horizontal, styles.bottom)}>
          <Input
            id="isHardware"
            type="checkbox"
            checked={isHardware}
            disabled={loading}
            onChange={this.handleChangeIsHardware}
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
    return <Label htmlFor="isHardware" label="Use Ledger for next step" className={styles.label} />;
  };

  handleChangeIsHardware = () => {
    this.props.setIsHardware(!this.props.isHardware);
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

  handleChangePassphraseConfirm = (event) => {
    this.props.setPassphraseConfirm(event.target.value);
  };

  handleStoreFormData = (event) => {
    const {
      accountLabel,
      passphrase,
      secretWord,
      passphraseConfirm,
      storeFormData,
      isHardware
    } = this.props;

    event.preventDefault();
    storeFormData({
      accountLabel,
      passphrase,
      passphraseConfirm,
      secretWord,
      isHardware
    });
  };

  isValid = () => {
    const { passphrase, passphraseConfirm, secretWord, accountLabel } = this.props;
    return passphrase !== '' && passphraseConfirm !== '' && secretWord !== '' && accountLabel !== '';
  };
}
