import React from 'react';
import { func, string, object, arrayOf } from 'prop-types';
import { settings } from '@cityofzion/neon-js';
import { noop, map } from 'lodash';

import Input from 'shared/components/Forms/Input';
import Button from 'shared/components/Forms/Button';
import Select from 'shared/components/Forms/Select';
import Panel from 'shared/components/Panel';

import Saved from '../Saved';
import { PREDEFINED_NETWORKS } from '../../values/networks';
import styles from './NetworkPanel.scss';

export default class NetworkPanel extends React.Component {
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

  componentWillUnmount() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
  }

  render() {
    const neoScanUrl = this.getCurrentNetworkUrl();

    return (
      <Panel
        className={styles.settingsPanel}
        renderHeader={() => {
          return 'Settings';
        }}
      >
        <div className={styles.content}>

          <div>
            <h2>Selected Network</h2>
            <div className={styles.formatUrl}>{neoScanUrl}</div>
            <div className={styles.selectNetworkWrapper}>
              <Select
                className={styles.selectNetwork}
                name="network"
                id="network"
                value={this.props.currentNetwork}
                onChange={this.handleChangeSelectedNetwork}
              >
                {map(settings.networks, this.renderNetworkOption)}
              </Select>
              {this.state.saved && <Saved className={styles.savedProp} />}
            </div>
          </div>

          <div className={styles.buttonWrapper}>
            <Button onClick={this.handleAddNewNetwork} className={styles.addButton}>
              Add custom network configuration
            </Button>
            <br />
            <Button onClick={this.handleClearNetworks} className={styles.clearButton}>
              Clear custom network configurations
            </Button>
          </div>

        </div>
      </Panel>
    );
  }

  renderNetworkOption = (network, key) => {
    return (
      <option key={key} value={network.name}>
        {network.name}
      </option>
    );
  };

  handleClearNetworks = () => {
    // If user is on a custom network, switch to TestNet
    if (!PREDEFINED_NETWORKS.includes(this.props.currentNetwork)) {
      this.props.setCurrentNetwork('TestNet');
    }

    this.props.clearNetworks();
    this.props.alert('All custom network configurations cleared.');
  };

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
  };

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
    this.props.setCurrentNetwork(this.props.networkName);
  };

  handleChangeNetworkName = (event) => {
    this.props.setNetworkName(event.target.value);
  };

  handleChangeNetworkUrl = (event) => {
    this.props.setNetworkUrl(event.target.value);
  };

  handleChangeSelectedNetwork = (event) => {
    return this.saveNetwork(event.target.value);
  };

  getCurrentNetworkUrl = () => {
    const currentNetworkConfig = settings.networks[this.props.currentNetwork];
    return currentNetworkConfig && currentNetworkConfig.extra.neoscan;
  };

  saveNetwork = (network) => {
    this.setState({ saved: true });
    this.props.setCurrentNetwork(network);
    this.saveTimeout = setTimeout(() => {
      this.setState({ saved: false });
    }, 1250);
  };
}
