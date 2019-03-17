import React from 'react';
import { bool, string, func, shape, object, arrayOf } from 'prop-types';
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
    profiles: arrayOf(accountShape),
    currentProfile: string,
    setCurrentProfile: func,
    history: shape({
      location: object.isRequired,
      push: func.isRequired
    }).isRequired
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
    const { disabled, currentProfile, passphrase, profiles } = this.props;

    console.log('dakwoida', this.props);

    if (isEmpty(currentProfile)) {
      return this.renderNoWallet();
    } else {
      return this.renderRegisterForm({
        disabled,
        currentProfile,
        profiles,
        passphrase
      });
    }
  }

  renderRegisterForm = ({ disabled, currentProfile, profiles, passphrase }) => (
    <form className={styles.loginForm} onSubmit={this.handleLogin}>
      <LabeledSelect
        className={styles.input}
        labelClass={styles.label}
        id="profiel"
        label="Select Wallet"
        disabled={isEmpty(profiles)}
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

    return map(profiles, ({ label, mnemonic }) => ({
      label,
      value: mnemonic
    }));
  };

  isValid = () => {
    return this.props.passphrase !== '';
  };
}
