import React from 'react';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';

import styles from './LoginFormWIF.scss';
import LoginButton from '../LoginButton';

export default class LoginFormWIF extends React.PureComponent {
  static propTypes = {
    disabled: bool,
    wif: string,
    setWIF: func,
    onLogin: func
  };

  static defaultProps = {
    disabled: false,
    wif: '',
    setWIF: noop,
    onLogin: noop
  };

  render() {
    const { wif, disabled } = this.props;

    return (
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <LabeledInput
          id="wif"
          type="password"
          label="Private Key"
          placeholder="Enter private key"
          value={wif}
          disabled={disabled}
          onChange={this.handleChange}
        />

        <LoginButton disabled={disabled || !this.isValid()} />
      </form>
    );
  }

  handleChange = (event) => {
    this.props.setWIF(event.target.value);
  }

  handleLogin = (event) => {
    const { wif, onLogin } = this.props;

    event.preventDefault();
    onLogin({ wif });
  }

  isValid = () => {
    return this.props.wif !== '';
  }
}
