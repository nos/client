import React from 'react';
import { func, string } from 'prop-types';

import styles from './Settings.scss';
import Saved from '../Saved/Saved';

export default class Settings extends React.Component {
  static propTypes = {
    currentNetwork: string.isRequired,
    setCurrentNetwork: func.isRequired
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
          </select>
        </label>
        {this.state.saved && <Saved /> }
      </div>
    );
  }

  handleChangeSelectedNetwork = (event) => {
    this.setState({ saved: true });
    this.props.setCurrentNetwork(event.target.value);
    setTimeout(() => {
      this.setState({ saved: false });
    }, 1250);
  };
}
