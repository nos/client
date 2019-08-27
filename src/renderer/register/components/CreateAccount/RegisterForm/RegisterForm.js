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
    isImport: bool,
    setAccountLabel: func,
    setPassphrase: func,
    setPassphraseConfirm: func,
    setSecretWord: func,
    storeFormData: func,
    setIsHardware: func,
    setIsImport: func
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
    setIsImport: noop,
    isHardware: false,
    isImport: false
  };

  render = () => {
    const {
      accountLabel,
      passphrase,
      passphraseConfirm,
      secretWord,
      loading,
      isHardware,
      isImport
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
          <div className={styles.checkboxContainer}>
            <Input
              id="isImport"
              type="checkbox"
              checked={isImport}
              disabled={loading}
              onChange={this.handleChangeIsImport}
              renderAfter={this.renderImportLabel}
              className={styles.checkbox}
            />
            <Input
              id="isHardware"
              type="checkbox"
              checked={isHardware}
              disabled={loading}
              onChange={this.handleChangeIsHardware}
              renderAfter={this.renderLedgerLabel}
              className={styles.checkbox}
            />
          </div>

          <PrimaryButton
            className={styles.button}
            type="submit"
            disabled={loading || !this.isValid()}
          >
            {this.renderButtonMessage()}
          </PrimaryButton>
        </div>
      </form>
    );
  };

  renderButtonMessage = () => {
    const { isHardware, isImport } = this.props;
    if (isHardware) return 'Next: connect Ledger';
    if (isImport) return 'Next: import seed';
    return 'Next: recovery seed';
  };

  renderImportLabel = () => {
    return <Label htmlFor="isImport" label="Use existing seed" className={styles.label} />;
  };

  renderLedgerLabel = () => {
    return <Label htmlFor="isHardware" label="Use a Ledger" className={styles.label} />;
  };

  handleChangeIsImport = () => {
    this.props.setIsImport(!this.props.isImport);
    this.props.setIsHardware(false);
  };

  handleChangeIsHardware = () => {
    this.props.setIsHardware(!this.props.isHardware);
    this.props.setIsImport(false);
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
      isHardware,
      isImport
    } = this.props;

    event.preventDefault();
    storeFormData({
      accountLabel,
      passphrase,
      passphraseConfirm,
      secretWord,
      isHardware,
      isImport
    });
  };

  isValid = () => {
    const { passphrase, passphraseConfirm, secretWord, accountLabel } = this.props;
    return (
      passphrase !== '' && passphraseConfirm !== '' && secretWord !== '' && accountLabel !== ''
    );
  };
}
