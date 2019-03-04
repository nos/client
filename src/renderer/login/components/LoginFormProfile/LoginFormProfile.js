import React from 'react';
import { bool, string, func, arrayOf } from 'prop-types';
import { noop, map, isEmpty } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import accountShape from 'register/shapes/accountShape';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './LoginFormProfile.scss';
import LoginButton from '../LoginButton';

export default class LoginFormProfile extends React.PureComponent {
  static propTypes = {
    disabled: bool,
    walletsFound: bool.isRequired,
    passphrase: string,
    onLogin: func,
    setPassphrase: func,
    profiles: arrayOf(accountShape),
    currentProfile: string,
    setCurrentProfile: func,
    history: func.isRequired
  };

  static defaultProps = {
    disabled: false,
    passphrase: '',
    onLogin: noop,
    setCurrentProfile: noop,
    setPassphrase: noop,
    profiles: undefined,
    currentProfile: ''
  };

  render() {
    const { disabled, currentProfile, passphrase, walletsFound } = this.props;

    if (isEmpty(currentProfile)) {
      return this.renderNoWallet();
    } else {
      return this.renderRegisterForm({
        disabled,
        currentProfile,
        passphrase,
        walletsFound
      });
    }
  }

  renderRegisterForm = ({
    disabled,
    currentProfile,
    passphrase,
    walletsFound
  }) => (
    <form className={styles.loginForm} onSubmit={this.handleLogin}>
      <LabeledSelect
        className={styles.input}
        labelClass={styles.label}
        id="profiel"
        label="Select Wallet"
        disabled={!walletsFound}
        value={currentProfile}
        items={this.getProfiles()}
        onChange={this.handleChangeCurrentProfile}
      />

      <LabeledInput
        id="passphrase"
        type="password"
        label="Passphrase"
        placeholder="Enter passphrase"
        value={passphrase}
        disabled={disabled || !walletsFound}
        onChange={this.handleChangePassphrase}
      />

      <LoginButton disabled={disabled || !this.isValid()} />
    </form>
  );

  renderNoWallet = () => (
    <form className={styles.loginForm} onSubmit={this.handleRedirectRegister}>
      <div className={styles.disclaimer}>
        Looks like you don&apos;t have a wallet yet.
        <br />
        Click the button below to create one.
      </div>
      <PrimaryButton className={styles.registerBtn} type="submit">
        Create New Wallet
      </PrimaryButton>
    </form>
  );

  handleRedirectRegister = () => {
    this.props.history.push('/register');
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleChangeCurrentProfile = (value) => {
    this.props.setCurrentProfile(value);
  };

  handleLogin = (event) => {
    const { passphrase, currentProfile, onLogin } = this.props;

    event.preventDefault();
    onLogin({ passphrase, encryptedWIF: currentProfile });
  };

  getProfiles = () => {
    const { profiles, currentProfile } = this.props;

    if (!profiles) {
      return [{ label: 'No Wallets Found', value: currentProfile }];
    }

    return map(profiles, ({ walletName, address, encryptedKey }) => ({
      label: `${walletName} - ${address} `,
      value: encryptedKey
    }));
  };

  isValid = () => {
    return this.props.passphrase !== '';
  };
}
