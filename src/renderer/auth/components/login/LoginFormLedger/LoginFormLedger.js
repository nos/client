import React from 'react';
import { bool, string, func, shape } from 'prop-types';
import { noop } from 'lodash';
import { progressValues } from 'spunky';

import styles from './LoginFormLedger.scss';
import AuthButton from '../../AuthButton';
// import LoginButton from '../LoginButton';

const POLL_FREQUENCY = 1000;

const { LOADED, FAILED } = progressValues;

const deviceInfoShape = shape({
  manufacturer: string.isRequired,
  product: string.isRequired
});

export default class LoginFormLedger extends React.PureComponent {
  static propTypes = {
    poll: func.isRequired,
    publicKey: string,
    deviceInfo: deviceInfoShape,
    deviceError: string,
    onLogin: func,
    progress: string,
    disabled: bool
  };

  static defaultProps = {
    publicKey: null,
    deviceInfo: null,
    deviceError: null,
    onLogin: noop,
    progress: null,
    disabled: false
  };

  componentDidMount() {
    console.log('LoginFormLedger ', this.props);
    console.log('LoginFormLedger ', this.props);

    this.props.poll();
    this.pollInterval = setInterval(this.props.poll, POLL_FREQUENCY);
  }

  componentWillUnmount() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }

  render() {
    return (
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <div>{this.renderStatus()}</div>

        <AuthButton
          buttonText="Unlock Wallet"
          className={styles.register}
          type="submit"
          disabled={this.props.disabled}
        />

        {this.renderActions()}
      </form>
    );
  }

  renderActions = () => {
    const disabled = this.props.disabled || this.props.progress !== LOADED;

    return <span disabled={disabled} />;
  };

  renderStatus = () => {
    const { deviceError, deviceInfo, progress } = this.props;

    if (progress === LOADED) {
      return (
        <p>
          Connected to {deviceInfo.manufacturer} {deviceInfo.product}.
        </p>
      );
    }

    if (progress === FAILED) {
      return <p>{deviceError}</p>;
    }

    return <p>Searching for USB devices. Please plug in your Ledger to login.</p>;
  };

  handleLogin = (event) => {
    const { publicKey, onLogin } = this.props;

    console.log('LoginFormLedger.js handleLogin ', this.props);
    return;

    event.preventDefault();
    onLogin({ publicKey });
  };
}
