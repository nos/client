import React from 'react';
import { func, string } from 'prop-types';
import Button from '../Forms/Button';
import styles from './Settings.scss';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedNetwork: props.currentNetwork };
  }

  selectNetworkRef = React.createRef();

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentNetwork !== this.state.selectedNetwork) {
      this.setState({ selectedNetwork: nextProps.currentNetwork });
    }
  }

  render() {
    return (
      <div className={styles.settings}>
        <h1>Settings</h1>
        <h2>Network Configuration</h2>
        <form onSubmit={this.handleSubmitCurrentNetwork}>
          <label htmlFor="network">
            Current Network
            <p>
              <select
                name="network"
                id="network"
                value={this.state.selectedNetwork}
                ref={this.selectNetworkRef}
                onChange={this.handleChangeSelectedNetwork}
              >
                <option value="MainNet">MainNet</option>
                <option value="TestNet">TestNet</option>
                <option value="CozNet">CozNet</option>
                <option value="nOSLocal">nOS Local</option>
              </select>
            </p>
            <Button type="submit">Save</Button>
          </label>
        </form>
      </div>
    );
  }

  handleSubmitCurrentNetwork = (event) => {
    event.preventDefault();
    this.props.setCurrentNetwork(this.state.selectedNetwork);
  };

  handleChangeSelectedNetwork = () => {
    this.setState({ selectedNetwork: this.selectNetworkRef.current.value });
  };
}

Settings.propTypes = {
  currentNetwork: string.isRequired,
  setCurrentNetwork: func.isRequired
};
