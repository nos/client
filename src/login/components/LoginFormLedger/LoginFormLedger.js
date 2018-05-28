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

  state = {
    deviceStatus: null,
    deviceInfo: null,
    deviceError: null,
    connected: false,
    open: false
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
    this.getDeviceInfo();

    return (
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <div>
          {this.state.deviceInfo}
          {this.state.deviceStatus}
          {this.state.deviceError}
        </div>

        {this.renderActions()}
      </form>
    );
  }

  renderActions = () => {
    const disabled = (this.state.connected && this.state.open) ? this.props.disabled : true;
    const onClick = disabled ? null : this.handleLogin;

    this.state.deviceError = (!disabled) ?
      null :
      this.state.deviceError;

    return (
      <div className={styles.actions}>
        <Button type="button" disabled={disabled} onClick={onClick}>Login</Button>
      </div>
    );
  }

  handleLogin = (event) => {
    const { publicKey, onLogin } = this.props;

    event.preventDefault();
    onLogin({ publicKey });
  }

  getDeviceInfo = () => {
    const { deviceInfo, deviceError } = this.props;

    this.state.connected = (deviceError !== 'No USB device found.');

    if (this.state.connected) {
      this.getDeviceStatus();
      this.state.deviceInfo = (deviceInfo) ?
        <p>Found USB {deviceInfo.manufacturer} {deviceInfo.product}</p> :
        <p>Found USB Ledger device</p>;
    } else {
      this.state.deviceStatus = null;
      this.state.deviceInfo =
        <p>Searching for USB devices. Please plug in your Ledger to login.</p>;
      this.getDeviceError();
    }
  }

  getDeviceStatus = () => {
    const { publicKey, deviceInfo } = this.props;
    this.state.open = !!(publicKey);

    if (!this.state.open) {
      this.state.deviceStatus = null;
      this.getDeviceError();
    } else {
      this.state.deviceStatus = (deviceInfo) ?
        <p>Connected to {deviceInfo.manufacturer} {deviceInfo.product}</p> :
        <p>Connected to Ledger.</p>;
    }
  }

  getDeviceError = () => {
    const { deviceError } = this.props;

    this.state.connected = (deviceError !== 'No USB device found.');
    this.state.deviceError = (!deviceError) ? '' : <p>{deviceError}</p>;
  }
}
