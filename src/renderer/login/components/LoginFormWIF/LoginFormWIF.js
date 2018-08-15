import React from 'react';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import Input from 'shared/components/Forms/Input';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './LoginFormWIF.scss';

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
        <Input
          id="wif"
          type="password"
          label="WIF"
          placeholder="Enter WIF"
          value={wif}
          disabled={disabled}
          onChange={this.handleChange}
        />

        <div className={styles.actions}>
          <PrimaryButton type="submit" disabled={disabled || !this.isValid()}>Login</PrimaryButton>
        </div>
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
