import React from 'react';
import { func, string, object, arrayOf } from 'prop-types';
import { noop } from 'redux-saga/utils';

import styles from './Settings.scss';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Saved from '../Saved/Saved';

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
            <option value="MainNet">MainNet</option>
            <option value="TestNet">TestNet</option>
            <option value="CozNet">CozNet</option>
            <option value="nOSLocal">nOS Local</option>

            {
              this.props.allNetworks.map((network) => {
                return (
                  <option
                    key={network.neoscan}
                    value={network.neoscan}
                  >
                    {network.name}
                  </option>
                );
              })
            }
          </select>
        </label>
        <div className={styles.networkDetails}>
          Custom Neoscan URL: {this.props.currentNetwork}
        </div>
        {this.renderButtons()}
        {this.state.saved && <Saved /> }
      </div>
    );
  }

  renderButtons = () => {
    return (
      <div>
        <Button onClick={this.handleAddNewNetwork}>
          Add custom network configuration
        </Button>
        <div className={styles.divider} />
        <Button onClick={this.handleClearNetwork}>
          Clear custom network configurations
        </Button>
      </div>
    );
  }

  handleClearNetwork = () => {
    this.props.clearNetworks();
    switch (this.props.currentNetwork) {
      case 'MainNet':
      case 'TestNet':
      case 'CozNet':
      case 'nOSLocal':
        break;
      default:
        // User is on their custom network, switch to TestNet on clearing of
        // all user generated custom networks
        this.props.setCurrentNetwork('TestNet');
    }
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
      return element.neoscan === this.props.networkUrl;
    });

    if (network) {
      this.props.alert('Error: A network configuration with that name already exist.');
      return;
    }

    const newNetwork = { name: this.props.networkName, neoscan: this.props.networkUrl };
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
    // Hardcoded default networks
    switch (event.target.value) {
      case 'MainNet':
      case 'TestNet':
      case 'CozNet':
      case 'nOSLocal':
        return this.saveNetwork(event.target.value);
      default:
        break;
    }

    // Custom networks
    const network = this.props.allNetworks.find((element) => {
      return element.neoscan === event.target.value;
    });
    return this.saveNetwork(network.neoscan);
  };

  saveNetwork = (network) => {
    this.setState({ saved: true });
    this.props.setCurrentNetwork(network);
    setTimeout(() => {
      this.setState({ saved: false });
    }, 1250);
  }
}
