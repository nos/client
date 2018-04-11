import React from 'react';
import { func, string } from 'prop-types';
import Button from '../Forms/Button';
import styles from './Settings.scss';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedNetwork: props.currentNetwork };
  }

  // TODO: Refactor this to `getDerivedStateFromProps` when possible. Currently some other
  // dependency is still usin `componentWillReceiveProps` (which is deprecated) and
  // preventing use of it now.
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
              {/* TODO: Map through available networks, including custom networks */}
              <select
                name="network"
                id="network"
                value={this.state.selectedNetwork}
                ref={this.selectNetworkRef}
                onChange={this.handleChangeSelectedNetwork}
              >
                <option value="MainNet">MainNet</option>
                <option value="TestNet">TestNet</option>
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
    this.props.setCurrentNetwork({ currentNetwork: this.state.selectedNetwork });
  };

  handleChangeSelectedNetwork = () => {
    this.setState({ selectedNetwork: this.selectNetworkRef.current.value });
  };

  selectNetworkRef = React.createRef();
}

Settings.propTypes = {
  currentNetwork: string.isRequired,
  setCurrentNetwork: func.isRequired
};
