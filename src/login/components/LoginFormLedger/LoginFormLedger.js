import React from 'react';
import { string, func, shape } from 'prop-types';
import { noop } from 'lodash';
import { progressValues } from 'spunky';

import Button from 'shared/components/Forms/Button';

import styles from './LoginFormLedger.scss';

const POLL_FREQUENCY = 1000;

const { FAILED } = progressValues;

const deviceInfoShape = shape({
  manufacturer: string.isRequired,
  product: string.isRequired
});

export default class LoginFormLedger extends React.Component {
  static propTypes = {
    poll: func.isRequired,
    publicKey: string,
    deviceInfo: deviceInfoShape,
    deviceError: string,
    onLogin: func,
    progress: string
  };

  static defaultProps = {
    publicKey: null,
    deviceInfo: null,
    deviceError: null,
    onLogin: noop,
    progress: 'INITIAL'
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
          {this.renderStatus()}
        </div>

        {this.renderActions()}
      </form>
    );
  }

  renderActions = () => {
    const { publicKey, deviceInfo, progress } = this.props;
    const disabled = !(publicKey && deviceInfo && (progress !== FAILED));
    const onClick = disabled ? null : this.handleLogin;

    return (
      <div className={styles.actions}>
        <Button type="button" disabled={disabled} onClick={onClick}>Login</Button>
      </div>
    );
  }

  renderStatus = () => {
    const { publicKey, deviceError, deviceInfo, progress } = this.props;

    if (deviceError !== 'No USB device found.') {
      if (publicKey && deviceInfo && (progress !== FAILED)) {
        return <p>Connected to {deviceInfo.manufacturer} {deviceInfo.product}.</p>;
      } else {
        return <p>{deviceError}</p>;
      }
    } else {
      return <p>Searching for USB devices. Please plug in your Ledger to login.</p>;
    }
  }

  handleLogin = (event) => {
    const { publicKey, onLogin } = this.props;

    event.preventDefault();
    onLogin({ publicKey });
  }
}
