import React from 'react';
import { bool, any, string, func, objectOf } from 'prop-types';
import { noop, map } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import accountShape from 'register/shapes/accountShape';

import styles from './LoginFormProfile.scss';
import LoginButton from '../LoginButton';

export default class LoginFormProfile extends React.PureComponent {
  static propTypes = {
    disabled: bool,
    passphrase: string,
    onLogin: func,
    setPassphrase: func,
    profiles: objectOf(accountShape),
    currentProfile: string,
    setCurrentProfile: func
  };

  static defaultProps = {
    disabled: false,
    passphrase: '',
    onLogin: noop,
    setCurrentProfile: noop,
    setPassphrase: noop,
    profiles: [{ label: 'No Wallets Found', value: '' }],
    currentProfile: ''
  };

  render() {
    const { disabled, currentProfile, passphrase } = this.props;

    return (
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <LabeledSelect
          className={styles.input}
          labelClass={styles.label}
          id="profiel"
          label="Select Wallet"
          placeHolder="jdaow"
          value={currentProfile}
          items={this.props.profiles}
          onChange={this.handleChangeCurrentProfile}
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
    const { profiles } = this.props;

    if (profiles[0].value === '') return profiles;

    return map(profiles, ({ walletName, address, encryptedKey }) => ({
      label: `${walletName} - ${address} `,
      value: encryptedKey
    }));
  };

  isValid = () => {
    return this.props.passphrase !== '';
  };
}
