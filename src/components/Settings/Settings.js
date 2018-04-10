import React from 'react';
import { func, string } from 'prop-types';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from './Settings.scss';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.selectNetworkRef = React.createRef();
  }

  render() {
    const { currentNetwork, addCustomNetwork, removeCustomNetwork } = this.props;
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
                defaultValue={currentNetwork}
                ref={this.selectNetworkRef}
              >
                <option value="MainNet">MainNet</option>
                <option value="TestNet">TestNet</option>
                <option value="nOSLocal">nOS Local</option>
              </select>
            </p>
            <Button type="submit">Save</Button>
          </label>
        </form>
        <form onSubmit={addCustomNetwork}>
          <h3>Add Custom Network</h3>
          <Input type="text" label="Network Name" placeholder="e.g. PrivateNet" value="" />
          <Input
            type="text"
            label="RPC Server(s)"
            placeholder="e.g. http://localhost:10333,http://localhost:10334"
            value=""
          />
          <Button type="submit">Add</Button>
        </form>
        <form onSubmit={removeCustomNetwork}>
          <h3>Remove Custom Network</h3>
          <p>
            <select name="network" id="network">
              {/* TODO: Enumerate custom networks */}
              {/* <option value="foo">Fooberries</option> */}
            </select>
          </p>
          <Button type="submit">Remove</Button>
        </form>
      </div>
    );
  }

  handleSubmitCurrentNetwork = (event) => {
    event.preventDefault();
    this.props.setCurrentNetwork({ currentNetwork: this.selectNetworkRef.current.value });
  };
}

Settings.propTypes = {
  currentNetwork: string.isRequired,
  setCurrentNetwork: func.isRequired,
  addCustomNetwork: func.isRequired,
  removeCustomNetwork: func.isRequired
};
