/* eslint-disable consistent-return */

import React from 'react';
import { string, func, shape } from 'prop-types';

import LoginFormPassphrase from './LoginFormPassphrase';
import LoginFormWIF from './LoginFormWIF';
import Panel from '../Panel';
import Tabs from '../Tabs';
import Button from '../Forms/Button';
import styles from './Login.scss';

const TAB_WIF = 'wif';
const TAB_PASSPHRASE = 'passphrase';
const TAB_LEDGER = 'ledger';

const TABS = {
  [TAB_PASSPHRASE]: 'Passphrase',
  [TAB_WIF]: 'WIF',
  [TAB_LEDGER]: 'Ledger'
};

const POLL_FREQUENCY = 1000;

const deviceInfoShape = shape({
  manufacturer: string.isRequired,
  product: string.isRequired
});

export default class Login extends React.Component {
  static propTypes = {
    login: func.isRequired,
    poll: func.isRequired,
    publicKey: string,
    deviceInfo: deviceInfoShape,
    deviceError: string
  };

  static defaultProps = {
    publicKey: null,
    deviceInfo: null,
    deviceError: null
  };

  state = {
    tab: TAB_PASSPHRASE
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
      <Panel className={styles.login} renderHeader={this.renderHeader}>
        <Tabs
          tabs={TABS}
          selectedTab={this.state.tab}
          renderTab={this.renderTab}
          onSelect={this.handleSelectTab}
        />
      </Panel>
    );
  }

  renderHeader = () => {
    return 'Login';
  }

  renderTab = (id) => {
    switch (id) {
      case TAB_WIF:
        return this.renderWif();
      case TAB_PASSPHRASE:
        return this.renderPassphrase();
      case TAB_LEDGER:
        return this.renderLedger();
      default:
        throw new Error('Invalid tab.');
    }
  }

  renderWif = () => {
    return <LoginFormWIF onLogin={this.props.login} />;
  }

  renderPassphrase = () => {
    return <LoginFormPassphrase onLogin={this.props.login} />;
  }

  renderLedger = () => {
    return (
      <div>
        {this.renderDeviceStatus()}
        {this.renderDeviceInfo()}
        {this.renderDeviceError()}
        {this.renderActions(!this.props.deviceInfo)}
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

    if (publicKey) {
      return <p>Connected to Ledger.</p>;
    }
  }

  renderDeviceError = () => {
    const { deviceError } = this.props;

    if (deviceError) {
      return <p>{deviceError}</p>;
    }
  }

  renderActions = (disabled = false) => {
    const onClick = disabled ? null : this.handleLogin;

    return (
      <div className={styles.actions}>
        <Button type="button" disabled={disabled} onClick={onClick}>Login</Button>
      </div>
    );
  }

  handleSelectTab = (id) => {
    this.setState({ tab: id });
  }

  handleLogin = () => {
    const { publicKey } = this.props;

    switch (this.state.tab) {
      case TAB_LEDGER:
        return this.props.login({ publicKey });
      default:
        throw new Error('Invalid login method.');
    }
  }
}
