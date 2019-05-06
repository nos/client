import React from 'react';
import { bool, string, func } from 'prop-types';
import { noop, map } from 'lodash';

import accountsShape from 'auth/shapes/accountsShape';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './LoginForm.scss';

export default class LoginForm extends React.PureComponent {
  static propTypes = {
    disabled: bool,
    passphrase: string,
    onLogin: func,
    setPassphrase: func,
    accounts: accountsShape,
    currentAccount: string,
    setCurrentAccount: func,
    setSelectedSecretWord: func.isRequired
    // history: shape({
    //   location: object.isRequired,
    //   push: func.isRequired
    // }).isRequired
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

  componentDidMount() {
    const { setSelectedSecretWord, accounts, currentAccount } = this.props;
    setSelectedSecretWord(accounts[currentAccount].secretWord);
  }

  render() {
    const { disabled, currentAccount, passphrase, accounts } = this.props;

    return this.renderRegisterForm({
      disabled,
      currentAccount,
      accounts,
      passphrase
    });
  }

  renderRegisterForm = ({ disabled, currentAccount, passphrase }) => (
    <form className={styles.loginForm} onSubmit={this.handleLogin}>
      <LabeledSelect
        className={styles.input}
        labelClass={styles.label}
        id="profiel"
        label="Account"
        disabled={disabled}
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
        disabled={disabled}
        onChange={this.handleChangePassphrase}
      />

      <PrimaryButton className={styles.button} type="submit" disabled={disabled || !this.isValid()}>
        Log In
      </PrimaryButton>
    </form>
  );

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleChangeCurrentAccount = (value) => {
    const { accounts, setSelectedSecretWord, setCurrentAccount } = this.props;
    setSelectedSecretWord(accounts[value].secretWord);
    setCurrentAccount(value);
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
