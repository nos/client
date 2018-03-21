import React from 'react';
import { func } from 'prop-types';

import Tabs from '../Tabs';
import styles from './Login.scss';

const TAB_WIF = 'wif';
const TAB_PASSPHRASE = 'passphrase';

const TABS = {
  [TAB_WIF]: 'WIF',
  [TAB_PASSPHRASE]: 'Passphrase'
};

export default class Login extends React.Component {
  static propTypes = {
    onLogin: func.isRequired
  };

  state = {
    tab: TAB_WIF,
    wif: '',
    passphrase: '',
    encryptedWIF: ''
  };

  render() {
    return (
      <div className={styles.login}>
        <Tabs
          tabs={TABS}
          selectedTab={this.state.tab}
          renderTab={this.renderTab}
          onSelect={this.handleSelectTab}
        />
        <button type="button" onClick={this.handleLogin}>Login</button>
      </div>
    );
  }

  renderTab = (id) => {
    switch (id) {
      case TAB_WIF:
        return this.renderWif();
      case TAB_PASSPHRASE:
        return this.renderPassphrase();
      default:
        throw new Error('Invalid tab.');
    }
  }

  renderWif = () => {
    return (
      <label htmlFor="wif">
        WIF:
        <input
          id="wif"
          type="password"
          value={this.state.wif}
          onChange={this.handleChange('wif')}
        />
      </label>
    );
  }

  renderPassphrase = () => {
    return (
      <div>
        <label htmlFor="encryptedWIF">
          Encrypted WIF:
          <input
            id="encryptedWIF"
            type="password"
            value={this.state.encryptedWIF}
            onChange={this.handleChange('encryptedWIF')}
          />
        </label>
        <label htmlFor="passphrase">
          Passphrase:
          <input
            id="passphrase"
            type="password"
            value={this.state.passphrase}
            onChange={this.handleChange('passphrase')}
          />
        </label>
      </div>
    );
  }

  handleChange = (key) => {
    return (event) => {
      this.setState({ [key]: event.target.value });
    };
  }

  handleSelectTab = (id) => {
    this.setState({ tab: id });
  }

  handleLogin = () => {
    const { wif, passphrase, encryptedWIF } = this.state;

    switch (this.state.tab) {
      case TAB_WIF:
        return this.props.onLogin({ wif });
      case TAB_PASSPHRASE:
        return this.props.onLogin({ passphrase, encryptedWIF });
      default:
        throw new Error('Invalid login method.');
    }
  }
}
