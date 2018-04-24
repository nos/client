import React from 'react';
import { func, string } from 'prop-types';

import styles from './Settings.scss';

export default class Settings extends React.Component {
  static propTypes = {
    currentNetwork: string.isRequired,
    setCurrentNetwork: func.isRequired
  };

  render() {
    console.log(this.props);
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
            {/* <option value="MainNet">MainNet</option>
            <option value="TestNet">TestNet</option>
            <option value="CozNet">CozNet</option>
            <option value="nOSLocal">nOS Local</option> */}
            {this.props.network.networks.map(network => {
              return <option key={network.name} value={network.neoscan}>{network.name}</option>
            })}
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
    console.log(event.target.value);
    this.props.setCurrentNetwork(event.target.value);
    const network = this.props.network.networks.find( element => {

    console.log(element);

    console.log(element.neoscan === event.target.value);
      return element.neoscan === event.target.value;
    });
    console.log(network);
    this.props.set_current_network(network);
  };
}
