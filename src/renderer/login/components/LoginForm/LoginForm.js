import React from 'react';
import { bool, string, func } from 'prop-types';
import { noop, map, isEmpty } from 'lodash';

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
    const selectedAccount = accounts[currentAccount];
    if (selectedAccount) {
      setSelectedSecretWord(selectedAccount.secretWord);
    }
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

  renderRegisterForm = ({ disabled, currentAccount, passphrase, accounts }) => (
    <form className={styles.loginForm} onSubmit={this.handleLogin}>
      <LabeledSelect
        className={styles.input}
        labelClass={styles.label}
        id="profiel"
        label="Account"
        disabled={disabled || isEmpty(accounts)}
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
    const { accounts } = this.props;

    if (isEmpty(accounts)) {
      return [{ label: 'No accounts Found', value: '' }];
    }

    return map(accounts, ({ accountLabel }) => ({
      label: accountLabel,
      value: accountLabel
    }));
  };

  isValid = () => {
    const { passphrase, currentAccount } = this.props;
    return passphrase !== '' && currentAccount !== '';
  };
}
