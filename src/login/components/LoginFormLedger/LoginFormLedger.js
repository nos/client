import React from 'react';
import { bool, string, func, shape } from 'prop-types';
import { noop } from 'lodash';

import Button from 'shared/components/Forms/Button';

import styles from './LoginFormLedger.scss';

const POLL_FREQUENCY = 1000;

const deviceInfoShape = shape({
  manufacturer: string.isRequired,
  product: string.isRequired
});

export default class LoginFormLedger extends React.Component {
  static propTypes = {
    disabled: bool,
    poll: func.isRequired,
    publicKey: string,
    deviceInfo: deviceInfoShape,
    deviceError: string,
    onLogin: func
  };

  static defaultProps = {
    disabled: false,
    publicKey: null,
    deviceInfo: null,
    deviceError: null,
    onLogin: noop
  };

  componentDidMount() {
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
        <div>
          {this.renderDeviceStatus()}
          {this.renderDeviceInfo()}
          {this.renderDeviceError()}
        </div>

        {this.renderActions()}
      </form>
    );
  }

  renderActions = () => {
    const disabled = this.props.disabled || !this.props.deviceInfo;
    const onClick = disabled ? null : this.handleLogin;

    return (
      <div className={styles.actions}>
        <Button type="button" disabled={disabled} onClick={onClick}>Login</Button>
      </div>
    );
  }

  renderDeviceInfo = () => {
    const { deviceInfo } = this.props;

    if (deviceInfo) {
      return <p>Found USB {deviceInfo.manufacturer} {deviceInfo.product}</p>;
    } else {
      return <p>Searching for USB devices. Please plug in your Ledger to login.</p>;
    }
  }

  renderDeviceStatus = () => {
    const { publicKey } = this.props;

    if (!publicKey) {
      return null;
    }

    return <p>Connected to Ledger.</p>;
  }

  renderDeviceError = () => {
    const { deviceError } = this.props;

    if (!deviceError) {
      return null;
    }

    return <p>{deviceError}</p>;
  }

  handleLogin = (event) => {
    const { publicKey, onLogin } = this.props;

    event.preventDefault();
    onLogin({ publicKey });
  }
}
