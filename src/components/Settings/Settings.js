import React from 'react';
import { func, string, object, arrayOf } from 'prop-types';
import { settings } from '@cityofzion/neon-js';
import { noop, map } from 'lodash';

import styles from './Settings.scss';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Saved from '../Saved/Saved';
import { PREDEFINED_NETWORKS } from '../../values/networks';

export default class Settings extends React.Component {
  static propTypes = {
    currentNetwork: string.isRequired,
    setCurrentNetwork: func.isRequired,
    allNetworks: arrayOf(object).isRequired,
    setNetworkName: func.isRequired,
    setNetworkUrl: func.isRequired,
    networkName: string.isRequired,
    networkUrl: string.isRequired,
    addNetwork: func.isRequired,
    clearNetworks: func.isRequired,
    alert: func.isRequired,
    confirm: func.isRequired
  };

  state = { saved: false };

  render() {
    return (
      <div className={styles.settings}>
        <h1>Settings</h1>
        <h2>Network Configuration</h2>
        <label htmlFor="network">
          Current Network
          <br />
          <select
            name="network"
            id="network"
            value={this.props.currentNetwork}
            onChange={this.handleChangeSelectedNetwork}
          >
            {map(settings.networks, this.renderNetworkOption)}
          </select>
        </label>
        {this.renderButtons()}
        {this.state.saved && <Saved /> }
      </div>
    );
  }

  renderNetworkOption = (network, key) => {
    return (
      <option key={key} value={network.name}>
        {network.name}
      </option>
    );
  }

  renderButtons = () => {
    return (
      <div>
        <Button onClick={this.handleAddNewNetwork}>
          Add custom network configuration
        </Button>
        <div className={styles.divider} />
        <Button onClick={this.handleClearNetworks}>
          Clear custom network configurations
        </Button>
      </div>
    );
  }

  handleClearNetworks = () => {
    // If user is on a custom network, switch to TestNet
    if (!PREDEFINED_NETWORKS.includes(this.props.currentNetwork)) {
      this.saveNetwork('TestNet');
    }

    this.props.clearNetworks();
    this.props.alert('All custom network configurations cleared.');
  }

  handleAddNewNetwork = () => {
    this.props.confirm((
      <div>
        <Input
          id="networkName"
          type="text"
          label="Network name"
          placeholder="Network name"
          onChange={this.handleChangeNetworkName}
        />
        <Input
          id="networkURL"
          type="text"
          label="Network URL"
          placeholder="Network URL"
          onChange={this.handleChangeNetworkUrl}
        />
      </div>
    ), {
      title: 'New network configuration',
      onConfirm: this.handleConfirmAddNetwork,
      onCancel: noop
    });
  }

  handleConfirmAddNetwork = () => {
    const network = this.props.allNetworks.find((element) => {
      return element.name === this.props.networkName;
    });

    if (network) {
      this.props.alert('Error: A network configuration with that name already exist.');
      return;
    }

    const newNetwork = {
      name: this.props.networkName,
      extra: {
        neoscan: this.props.networkUrl
      }
    };

    this.props.addNetwork(newNetwork);
    this.props.setCurrentNetwork(this.props.networkUrl);
  }

  handleChangeNetworkName = (event) => {
    this.props.setNetworkName(event.target.value);
  }

  handleChangeNetworkUrl = (event) => {
    this.props.setNetworkUrl(event.target.value);
  }

  handleChangeSelectedNetwork = (event) => {
    return this.saveNetwork(event.target.value);
  };

  saveNetwork = (network) => {
    this.setState({ saved: true });
    this.props.setCurrentNetwork(network);
    setTimeout(() => {
      this.setState({ saved: false });
    }, 1250);
  }
}
