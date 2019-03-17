import React from 'react';
import { bool, string, func, shape, object, any } from 'prop-types';
import { noop, map, isEmpty } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import accountShape from 'auth/shapes/accountShape';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './LoginFormProfile.scss';
// import LoginButton from '../LoginButton';
import AuthButton from '../../AuthButton';

export default class LoginFormProfile extends React.PureComponent {
  static propTypes = {
    disabled: bool,
    passphrase: string,
    onLogin: func,
    setPassphrase: func,
    profiles: any, // TODO fix
    currentMnemonic: string,
    setCurrentMnemonic: func,
    history: shape({
      location: object.isRequired,
      push: func.isRequired
    }).isRequired
  };

  static defaultProps = {
    disabled: false,
    passphrase: '',
    onLogin: noop,
    setCurrentMnemonic: noop,
    setPassphrase: noop,
    profiles: undefined,
    currentMnemonic: ''
  };

  render() {
    const { disabled, currentMnemonic, passphrase, profiles } = this.props;

    console.log('dakwoida', this.props);

    if (isEmpty(currentMnemonic)) {
      return this.renderNoWallet();
    } else {
      return this.renderRegisterForm({
        disabled,
        currentMnemonic,
        profiles,
        passphrase
      });
    }
  }

  renderRegisterForm = ({ disabled, currentMnemonic, profiles, passphrase }) => (
    <form className={styles.loginForm} onSubmit={this.handleLogin}>
      <LabeledSelect
        className={styles.input}
        labelClass={styles.label}
        id="profiel"
        label="Select Wallet"
        disabled={isEmpty(profiles)}
        value={currentMnemonic}
        items={this.getProfiles()}
        onChange={this.handleChangeCurrentProfile}
      />

      <LabeledInput
        id="passphrase"
        type="password"
        label="Passphrase"
        placeholder="Enter passphrase"
        value={passphrase}
        disabled={disabled || isEmpty(profiles)}
        onChange={this.handleChangePassphrase}
      />

      <AuthButton
        buttonText="Unlock Wallet"
        className={styles.register}
        type="submit"
        disabled={disabled || !this.isValid()}
      />
      {/* <LoginButton  /> */}
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

  handleChangeCurrentMnemonic = (value) => {
    this.props.setCurrentMnemonic(value);
  };

  handleLogin = (event) => {
    const { passphrase, currentMnemonic, onLogin, profiles } = this.props;

    event.preventDefault();
    const currentProfile = profiles[currentMnemonic];
    onLogin({ profile: currentProfile, passphrase });
  };

  getProfiles = () => {
    const { profiles, currentMnemonic } = this.props;

    if (!profiles) {
      return [{ label: 'No Wallets Found', value: currentMnemonic }];
    }

    return map(profiles, ({ label }) => ({
      label,
      value: label
    }));
  };

  isValid = () => {
    return this.props.passphrase !== '';
  };
}
