import React from 'react';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import Input from 'shared/components/Forms/Input';
import Button from 'shared/components/Forms/Button';

import styles from './LoginFormWIF.scss';

export default class LoginFormWIF extends React.Component {
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
          <Button type="submit" disabled={disabled || !this.isValid()}>Login</Button>
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
