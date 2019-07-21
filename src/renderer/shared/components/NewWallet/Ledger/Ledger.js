import React from 'react';
import { string, func, shape, arrayOf } from 'prop-types';
import { isEmpty } from 'lodash';
import { progressValues } from 'spunky';

import { publicKeyToAddress } from 'shared/wallet/common';
import registerShape from 'register/shapes/registerShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'shared/components/NavigationButtons';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import LabeledInput from 'shared/components/Forms/LabeledInput';

import LedgerConnect from 'shared/images/auth/ledgerConnect.svg';
import LedgerConnected from 'shared/images/auth/ledgerConnected.svg';
import LedgerCompleted from 'shared/images/auth/ledgerCompleted.svg';

import styles from './Ledger.scss';

const POLL_FREQUENCY = 4500;

const { LOADED, FAILED, LOADING } = progressValues;

const deviceInfoShape = shape({
  manufacturer: string.isRequired,
  product: string.isRequired
});

export default class LedgerView extends React.PureComponent {
  static propTypes = {
    onCancel: func.isRequired,
    previousStep: func.isRequired,
    account: registerShape.isRequired,
    poll: func.isRequired,
    getPublicKey: func.isRequired,
    deviceInfoProgress: string,
    publickeyProgress: string,
    deviceInfo: deviceInfoShape,
    deviceInfoError: string,
    publicKey: string,
    publicKeyError: string,
    publicKeys: arrayOf(string),
    storeFormData: func.isRequired,
    setSelectedPublicKey: func.isRequired
  };

  static defaultProps = {
    deviceInfoProgress: null,
    publickeyProgress: null,
    deviceInfo: null,
    deviceInfoError: null,
    publicKey: null,
    publicKeyError: null,
    publicKeys: null
  };

  componentDidMount() {
    this.props.poll();
    this.pollInterval = setInterval(this.props.poll, POLL_FREQUENCY);
  }

  componentWillReceiveProps({ deviceInfoProgress, publickeyProgress, getPublicKey }) {
    // Poll once for performance reasons. Let user fetch manually if required
    if (deviceInfoProgress === LOADED && publickeyProgress !== LOADED) {
      getPublicKey();
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }

  render() {
    return <div className={styles.ledgerView}>{this.renderComponent()}</div>;
  }

  renderComponent = () => {
    const {
      deviceInfoError,
      publicKeyError,
      deviceInfo,
      deviceInfoProgress,
      publickeyProgress,
      publicKey
    } = this.props;

    // Device not connected or unlocked
    if (deviceInfoProgress === FAILED) {
      return (
        <React.Fragment>
          <LedgerConnect />
          <div className={styles.text}>{deviceInfoError}</div>
        </React.Fragment>
      );
    }

    // Connected and unlocked - but App Closed
    if (
      deviceInfoProgress === LOADED &&
      (publickeyProgress === FAILED || publickeyProgress === LOADING)
    ) {
      return (
        <React.Fragment>
          <LedgerConnected />

          <div className={styles.text}>
            <div className={styles.done}>
              {deviceInfo.manufacturer} {deviceInfo.product} Connected ✓
            </div>
            <div>{publicKeyError}</div>
          </div>
        </React.Fragment>
      );
    }

    // Connected, unlocked and app open
    if (deviceInfoProgress === LOADED && publickeyProgress === LOADED) {
      return (
        <React.Fragment>
          <LedgerCompleted />

          <div className={styles.text}>
            <div className={styles.done}>
              {deviceInfo.manufacturer} {deviceInfo.product} Connected ✓
            </div>
          </div>
          <LabeledInput
            labelClass={styles.labeledInput}
            id="passphrase"
            type="password"
            label="Enter Passphrase"
            placeholder="Passphrase"
            onChange={this.handleChangePassphrase}
          />
          <LabeledSelect
            className={styles.input}
            labelClass={styles.label}
            id="walletAddress"
            label={this.label()}
            disabled={isEmpty(this.props.publicKeys)}
            value={this.props.selectedPublicKey}
            items={this.getPublicKeyItems()}
            onChange={this.handleChangePublicKeys}
          />
        </React.Fragment>
      );
    }

    return null;
  };

  handleChangePublicKeys = (currentPublicKey) => {
    this.props.handleChangePublicKey(currentPublicKey);
  };

  handleChangePassphrase = (event) => {
    this.props.handleChangePassphrase(event.target.value);
  };

  label = () => (
    <div className={styles.labelWrap}>
      <div>Pick a wallet address</div>
      <div
        className={styles.labelFetch}
        role="button"
        tabIndex={0}
        onClick={this.handleFetchAddresses}
        disabled
      >
        Fetch additional addresses
      </div>
    </div>
  );

  confirm = () => {
    const { publicKey, account, passphrase, coinType, setPassphrase, addAccount } = this.props;

    // TODO move publicKey out of account
    addAccount({ account: { ...account, publicKey }, passphrase, coinType });
    setPassphrase('');
  };

  getPublicKeyItems = () => {
    return this.props.publicKeys.map(({ index, publicKey }) => ({
      label: publicKeyToAddress(publicKey),
      value: index
    }));
  };

  isValid = () => {
    return !isEmpty(this.props.publicKey);
  };
}
