import React from 'react';
import { bool, string, func, shape } from 'prop-types';
import { noop } from 'lodash';
import { progressValues } from 'spunky';

import Button from 'shared/components/Forms/Button';

import styles from './LoginFormLedger.scss';

const POLL_FREQUENCY = 1000;

const { INITIAL, LOADED, LOADING } = progressValues;

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
    progress: string,
    disabled: bool
  };

  static defaultProps = {
    publicKey: null,
    deviceInfo: null,
    deviceError: null,
    onLogin: noop,
    progress: INITIAL,
    disabled: false
  };

  state = {
    status: INITIAL
  };

  componentDidMount() {
    this.pollInterval = setInterval(this.props.poll, POLL_FREQUENCY);
  }

  componentDidUpdate() {
    const { progress } = this.props;
    if (progress !== LOADING) {
      this.setStatus(progress);
    }
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
    const disabled = this.props.disabled || this.state.status !== LOADED;
    const onClick = disabled ? null : this.handleLogin;

    return (
      <div className={styles.actions}>
        <Button type="button" disabled={disabled} onClick={onClick}>Login</Button>
      </div>
    );
  }

  renderStatus = () => {
    const { deviceError, deviceInfo } = this.props;

    if (this.state.status === LOADED) {
      return <p>Connected to {deviceInfo.manufacturer} {deviceInfo.product}.</p>;
    }

    if (deviceError === 'No USB device found.') {
      return <p>Searching for USB devices. Please plug in your Ledger to login.</p>;
    } else {
      return <p>{deviceError}</p>;
    }
  }

  handleLogin = (event) => {
    const { publicKey, onLogin } = this.props;

    event.preventDefault();
    onLogin({ publicKey });
  }

  setStatus = (progress) => {
    if (progress !== this.state.status) {
      this.setState({
        status: progress
      });
    }
  }
}
