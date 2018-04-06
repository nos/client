import React from 'react';
import { string, func } from 'prop-types';
import { noop } from 'lodash';

import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import styles from './LoginFormWIF.scss';

export default class LoginFormWIF extends React.Component {
  static propTypes = {
    wif: string,
    setWIF: func,
    onLogin: func
  };

  static defaultProps = {
    wif: '',
    setWIF: noop,
    onLogin: noop
  };

  render() {
    return (
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <label htmlFor="wif">
          <Input
            id="wif"
            type="password"
            label="WIF"
            placeholder="Enter WIF"
            value={this.props.wif}
            onChange={this.handleChange}
          />
        </label>

        <div className={styles.actions}>
          <Button type="submit">Login</Button>
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
}
