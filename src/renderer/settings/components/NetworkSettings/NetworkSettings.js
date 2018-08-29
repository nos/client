import React from 'react';
import { func, string, object, arrayOf } from 'prop-types';
import { settings } from '@cityofzion/neon-js';
import { map } from 'lodash';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import Button from 'shared/components/Forms/Button';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import NetworkIcon from 'shared/images/settings/network.svg';

import SectionTitle from '../SectionTitle';
import SectionContent from '../SectionContent';
import { PREDEFINED_NETWORKS, DEFAULT_NET } from '../../values/networks';
import styles from './NetworkSettings.scss';

export default class NetworkSettings extends React.PureComponent {
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
    showErrorToast: func.isRequired,
    confirm: func.isRequired
  };

  render() {
    const neoscanAddress = this.getCurrentNetworkUrl();

    return (
      <div className={styles.networkSettings}>
        <SectionTitle renderIcon={NetworkIcon}>
          Network Settings
        </SectionTitle>

        <SectionContent>
          <LabeledSelect
            className={styles.input}
            labelClass={styles.label}
            id="network"
            label="Current Network"
            name="setCurrentNetwork"
            value={this.props.currentNetwork}
            onChange={this.handleChange}
          >
            {map(settings.networks, this.renderNetworkOption)}
          </LabeledSelect>

          <LabeledInput
            className={styles.input}
            labelClass={styles.label}
            id="neoscan"
            label="Neoscan URL"
            value={neoscanAddress}
            readOnly
          />

          <div className={styles.actions}>
            <PrimaryButton className={styles.action} onClick={this.handleAddNewNetwork}>
              Add Custom Network
            </PrimaryButton>
            <br />
            <Button className={styles.action} onClick={this.handleClearNetworks}>
              Clear Custom Networks
            </Button>
          </div>
        </SectionContent>
      </div>
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
      this.props.setCurrentNetwork(DEFAULT_NET);
    }

    this.props.clearNetworks();
  };

  handleAddNewNetwork = () => {
    this.props.confirm((
      <div>
        <LabeledInput
          id="networkName"
          type="text"
          label="Network name"
          placeholder="Network name"
          name="setNetworkName"
          onChange={this.handleChange}
        />
        <LabeledInput
          id="networkURL"
          type="text"
          label="Network URL"
          placeholder="Network URL"
          name="setNetworkUrl"
          onChange={this.handleChange}
        />
      </div>
    ), {
      title: 'New network configuration',
      onConfirm: this.handleConfirmAddNetwork,
      onCancel: () => this.clearModal()
    });
  };

  handleConfirmAddNetwork = () => {
    const network = this.props.allNetworks.find((element) => {
      return element.name === this.props.networkName;
    });

    if (!this.props.networkName || !this.props.networkUrl) {
      this.props.showErrorToast('Please enter all fields.');
      this.clearModal();
      return;
    }

    if (network) {
      this.props.showErrorToast('A network configuration with that name already exist.');
      this.clearModal();
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.props[name](value);
  };

  clearModal = () => {
    this.props.setNetworkName('');
    this.props.setNetworkUrl('');
  };

  getCurrentNetworkUrl = () => {
    const currentNetworkConfig = settings.networks[this.props.currentNetwork];
    return currentNetworkConfig && currentNetworkConfig.extra.neoscan;
  };
}
