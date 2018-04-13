import React from 'react';
import { func, string } from 'prop-types';

import styles from './Settings.scss';

export default class Settings extends React.Component {
  static propTypes = {
    currentNetwork: string.isRequired,
    setCurrentNetwork: func.isRequired
  };

  render() {
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
          </select>
        </label>
      </div>
    );
  }

  handleChangeSelectedNetwork = (event) => {
    this.props.setCurrentNetwork(event.target.value);
  };
}
