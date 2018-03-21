import React from 'react';
import { func } from 'prop-types';

import Panel from '../Panel';
import Tabs from '../Tabs';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
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
      default:
        throw new Error('Invalid tab.');
    }
  }

  renderWif = () => {
    return (
      <label htmlFor="wif">
        <Input
          id="wif"
          type="password"
          label="WIF"
          placeholder="Enter WIF"
          value={this.state.wif}
          onChange={this.handleChange('wif')}
        />
        {this.renderActions()}
      </label>
    );
  }

  renderPassphrase = () => {
    return (
      <div>
        <label htmlFor="encryptedWIF">
          <Input
            id="encryptedWIF"
            type="password"
            label="Encrypted WIF"
            placeholder="Enter encrypted WIF"
            value={this.state.encryptedWIF}
            onChange={this.handleChange('encryptedWIF')}
          />
        </label>
        <label htmlFor="passphrase">
          <Input
            id="passphrase"
            type="password"
            label="Passphrase"
            placeholder="Enter passphrase"
            value={this.state.passphrase}
            onChange={this.handleChange('passphrase')}
          />
        </label>
        {this.renderActions()}
      </div>
    );
  }

  renderActions = () => {
    return (
      <div className={styles.actions}>
        <Button type="button" onClick={this.handleLogin}>Login</Button>
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
