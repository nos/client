import React from 'react';
import { func, string } from 'prop-types';

import styles from './Settings.scss';
import Input from '../Forms/Input';

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
            value={this.props.network.currentNetwork.neoscan}
            onChange={this.handleChangeSelectedNetwork}
          >
            <option value="MainNet">MainNet</option>
            <option value="TestNet">TestNet</option>
            <option value="CozNet">CozNet</option>
            <option value="nOSLocal">nOS Local</option>
            {/* {this.props.network.networks.map(network => {
              return <option key={network.name} value={network.neoscan}>{network.name}</option>
            })} */}

            {allNetworks.map(network => {
              return <option key={network.name} value={network.neoscan}>{network.name}</option>
            })}
            <option value="NewNetwork">Add custom network</option>
          </select>
        </label>

        <h1>{this.props.network.name}</h1>
        <h2>{this.props.network.neoscan}</h2>

        {this.newNetworkForm()}

      </div>
    );
  }

  newNetworkForm = () => {
    return (
      <div>
        <input type="text" name="name" />
        <button onClick={this.save}>
          <h1>Save</h1>
        </button>
      </div>
    );
  }


  handleChangeSelectedNetwork = (event) => {
    if(event.target.value == "NewNetwork") {
      this.props.confirm((
        <div>
          <Input
            id="networkName"
            type="text"
            label="Network name"
            placeholder="Network name"
            // value={this.props.networkName}
            onChange={this.handleChangeNetworkName}
          />
          <Input
            id="networkURL"
            type="password"
            label="Network URL"
            placeholder="Network URL"
            // value={this.props.networkUrl}
            onChange={this.handleChangeNetworkUrl}
          />
        </div>
      ), {
        title: 'New network',
        onConfirm: this.handleConfirmAddNetwork,
        onCancel: this.handleCancel
      });
    } else {
      console.log(event.target.value);
      const network = this.props.network.networks.find( element => {
        return element.neoscan === event.target.value;
      });
      this.props.setCurrentNetwork(network);

      // this.props.setNetworks([network, network]);
      console.log(network);
      this.props.set_current_network(network);
    }
  };

  handleChangeNetworkName = (event) => {
    this.props.setNetworkName(event.target.value);
  }

  handleChangeNetworkUrl = (event) => {
    this.props.setNetworkUrl(event.target.value);
  }

  handleConfirmAddNetwork = (event) => {
    this.props.addNetwork({name: this.props.networkName, neoscan: this.props.networkUrl});
    // this.props.networkName;
    // this.props.networkUrl
  }
}
