import React from 'react';
import { func, string } from 'prop-types';

import styles from './Settings.scss';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { noop } from 'redux-saga/utils';

export default class Settings extends React.Component {
  static propTypes = {
    currentNetwork: string.isRequired,
    setCurrentNetwork: func.isRequired
  };


  render() {
    console.log(this.props);
    const allNetworks = this.props.allNetworks || [];
    console.log(allNetworks);
    return (
      <div className={styles.settings}>
        <h1>Settings</h1>
        <h2>Network Configuration</h2>
        <label htmlFor="network">
          Current Network
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
              allNetworks.map(network => {
                return <option key={network.name} value={network.neoscan}>{network.name}</option>
              })
            }
          </select>
        </label>
        <div className={styles.buttonContainer}>
          <label className={styles.label}>{'Custom Neoscan Url: '}</label>
          <label className={styles.label}>{this.props.currentNetwork}</label>
        </div>
        {this.renderButtons()}
      </div>
    );
  }

  renderButtons = () => {
    return (
      <div>
        <Button onClick={this.handleAddNewNetwork}>
          {'Add custom network configuration'}
        </Button>
        <div className={styles.divider}></div>
        <Button onClick={this.handleClearNetwork}>
          {'Clear custom network configurations'}
        </Button>
      </div>
    );
  }


  handleChangeSelectedNetwork = (event) => {
    switch(event.target.value) {
      case 'MainNet':
      case 'TestNet':
      case 'CozNet':
      case 'nOSLocal':
      return this.props.setCurrentNetwork({name: network, neoscan: event.target.value});
    }
    const network = this.props.allNetworks.find( element => {
      return element.neoscan === event.target.value;
    });
    this.props.setCurrentNetwork(network);
  };

  handleChangeNetworkName = (event) => {
    this.props.setNetworkName(event.target.value);
  }

  handleChangeNetworkUrl = (event) => {
    this.props.setNetworkUrl(event.target.value);
  }

  handleConfirmAddNetwork = (event) => {
    const newNetwork = {name: this.props.networkName, neoscan: this.props.networkUrl};
    this.props.addNetwork(newNetwork);
    this.props.setCurrentNetwork(newNetwork);
  }

  handleClearNetwork = (event) => {
    this.props.clearNetworks();
    this.props.setCurrentNetwork({name: 'TestNet', neoscan: 'TestNet'});
    this.props.alert(`All custom network configurations cleared`);
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
}
