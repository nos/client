import React from 'react';
import { bool, string, func, shape, object, any } from 'prop-types';
import { noop, map, isEmpty } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import AuthButton from '../../AuthButton';

import styles from './LoginFormAccount.scss';

export default class LoginFormAccount extends React.PureComponent {
  static propTypes = {
    disabled: bool,
    passphrase: string,
    onLogin: func,
    setPassphrase: func,
    accounts: any,
    currentAccount: string,
    setCurrentAccount: func,
    history: shape({
      location: object.isRequired,
      push: func.isRequired
    }).isRequired
  };

  static defaultProps = {
    disabled: false,
    passphrase: '',
    onLogin: noop,
    setCurrentAccount: noop,
    setPassphrase: noop,
    accounts: undefined,
    currentAccount: ''
  };

  render() {
    const { disabled, currentAccount, passphrase, accounts } = this.props;

    if (isEmpty(currentAccount)) {
      return this.renderNoWallet();
    } else {
      return this.renderRegisterForm({
        disabled,
        currentAccount,
        accounts,
        passphrase
      });
    }
  }

  renderRegisterForm = ({ disabled, currentAccount, accounts, passphrase }) => (
    <form className={styles.loginForm} onSubmit={this.handleLogin}>
      <LabeledSelect
        className={styles.input}
        labelClass={styles.label}
        id="profiel"
        label="Account"
        disabled={isEmpty(accounts)}
        value={currentAccount}
        items={this.getProfiles()}
        onChange={this.handleChangeCurrentAccount}
      />

      <LabeledInput
        id="passphrase"
        type="password"
        label="Passphrase"
        placeholder="Enter your passphrase"
        value={passphrase}
        disabled={disabled || isEmpty(accounts)}
        onChange={this.handleChangePassphrase}
      />

      <AuthButton
        buttonText="Log In"
        className={styles.register}
        type="submit"
        disabled={disabled || !this.isValid()}
      />
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

  handleChangeCurrentAccount = (value) => {
    this.props.setCurrentAccount(value);
  };

  handleLogin = (event) => {
    const { passphrase, currentAccount, onLogin, accounts } = this.props;

    event.preventDefault();
    const selectedProfile = accounts[currentAccount];
    onLogin({ account: selectedProfile, passphrase });
  };

  getProfiles = () => {
    const { accounts, currentAccount } = this.props;

    if (!accounts) {
      return [{ label: 'No Wallets Found', value: currentAccount }];
    }

    return map(accounts, ({ accountLabel }) => ({
      label: accountLabel,
      value: accountLabel
    }));
  };

  isValid = () => {
    return this.props.passphrase !== '';
  };
}