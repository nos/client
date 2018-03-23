import React from 'react';
import { string, func } from 'prop-types';
import { noop } from 'lodash';

import Panel from '../Panel';
import Tabs from '../Tabs';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from './Login.scss';

const TAB_WIF = 'wif';
const TAB_PASSPHRASE = 'passphrase';

const TABS = {
  [TAB_PASSPHRASE]: 'Passphrase',
  [TAB_WIF]: 'WIF'
};

export default class Login extends React.Component {
  static propTypes = {
    wif: string,
    encryptedWIF: string,
    passphrase: string,
    setWIF: func,
    setEncryptedWIF: func,
    setPassphrase: func,
    onLogin: func.isRequired
  };

  static defaultProps = {
    wif: '',
    encryptedWIF: '',
    passphrase: '',
    setWIF: noop,
    setEncryptedWIF: noop,
    setPassphrase: noop
  };

  state = {
    tab: TAB_PASSPHRASE
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
          value={this.props.wif}
          onChange={(event) => this.props.setWIF(event.target.value)}
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
            value={this.props.encryptedWIF}
            onChange={(event) => this.props.setEncryptedWIF(event.target.value)}
          />
        </label>
        <label htmlFor="passphrase">
          <Input
            id="passphrase"
            type="password"
            label="Passphrase"
            placeholder="Enter passphrase"
            value={this.props.passphrase}
            onChange={(event) => this.props.setPassphrase(event.target.value)}
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

  handleSelectTab = (id) => {
    this.setState({ tab: id });
  }

  handleLogin = () => {
    const { wif, passphrase, encryptedWIF } = this.props;

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
