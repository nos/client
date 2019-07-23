import React from 'react';
import { string, func, shape, arrayOf } from 'prop-types';
import { isEmpty, filter, map } from 'lodash';
import { progressValues } from 'spunky';

import { publicKeyToAddress } from 'shared/wallet/common';
import registerShape from 'register/shapes/registerShape';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import Button from 'shared/components/Forms/Button';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import COINS, { NEO } from 'shared/values/coins';
import walletsShape from 'auth/shapes/walletsShape';

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
export default class Ledger extends React.PureComponent {
  static propTypes = {
    onCancel: func.isRequired,
    account: registerShape.isRequired,
    poll: func.isRequired,
    getPublicKeys: func.isRequired,
    deviceInfoProgress: string,
    publickeyProgress: string,
    deviceInfo: deviceInfoShape,
    deviceInfoError: string,
    publicKeyError: string,
    publicKeys: arrayOf(string),
    setSelectedPublicKey: func.isRequired,
    selectedPublicKey: string.isRequired,
    setPassphrase: func.isRequired,
    passphrase: string.isRequired,
    setCoinType: func.isRequired,
    addAccount: func.isRequired,
    wallets: walletsShape.isRequired,
    showErrorToast: func.isRequired
  };

  static defaultProps = {
    deviceInfoProgress: null,
    deviceInfoError: null,
    deviceInfo: null,
    publickeyProgress: null,
    publicKeyError: null,
    publicKeys: null
  };

  componentDidMount() {
    this.props.poll();
    this.pollInterval = setInterval(this.props.poll, POLL_FREQUENCY);
  }

  componentWillReceiveProps(nextProps) {
    const {
      publicKeys,
      selectedPublicKey,
      setSelectedPublicKey,
      deviceInfoProgress,
      publickeyProgress,
      getPublicKeys
    } = nextProps;

    // Poll once for performance reasons. Let user fetch manually if required
    if (deviceInfoProgress === LOADED && publickeyProgress !== LOADED) {
      getPublicKeys();
    }

    if (publickeyProgress === LOADED && selectedPublicKey === null) {
      setSelectedPublicKey(publicKeys[0].index);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }

  render() {
    return (
      <div className={styles.ledgerView}>
        {this.renderComponent()}
        {this.renderActions()}
      </div>
    );
  }

  renderComponent = () => {
    const {
      deviceInfoError,
      publicKeyError,
      deviceInfo,
      deviceInfoProgress,
      publickeyProgress
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
        </React.Fragment>
      );
    }

    return null;
  };

  renderActions = () => {
    const { onCancel, publicKeys, selectedPublicKey, publickeyProgress } = this.props;

    return (
      <React.Fragment>
        <LabeledInput
          labelClass={styles.labeledInput}
          id="passphrase"
          type="password"
          label="Enter Passphrase"
          placeholder="Passphrase"
          onChange={this.handleChangePassphrase}
          disabled={publickeyProgress === LOADING}
        />
        {/* <LabeledSelect
          className={styles.input}
          labelClass={styles.label}
          id="network"
          label="Current Network"
          value={coinType}
          items={this.getCoinTypes()}
          onChange={this.handleChangeCoinType}
        /> */}
        <LabeledSelect
          className={styles.input}
          labelClass={styles.label}
          id="walletAddress"
          label={this.label()}
          disabled={isEmpty(publicKeys)}
          value={selectedPublicKey}
          items={this.getPublicKeyItems()}
          onChange={this.handleChangePublicKeys}
        />
        <div className={styles.actions}>
          <Button className={styles.action} onClick={onCancel}>
            Cancel
          </Button>
          <PrimaryButton
            className={styles.action}
            disabled={!this.isValid()}
            onClick={this.confirm}
          >
            Add Wallet
          </PrimaryButton>
        </div>
      </React.Fragment>
    );
  };

  handleChangePublicKeys = (value) => {
    this.props.setSelectedPublicKey(value);
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleFetchAddresses = () => {
    const { getPublicKeys, publicKeys } = this.props;
    getPublicKeys(publicKeys);
  };

  handleChangeCoinType = (coinId) => {
    this.props.setCoinType(coinId);
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
    const {
      selectedPublicKey,
      account,
      passphrase,
      publicKeys,
      setPassphrase,
      addAccount,
      wallets,
      showErrorToast
    } = this.props;

    const { publicKey } = publicKeys[selectedPublicKey];

    const exists = filter(wallets, (wallet) => wallet.publicKey === publicKey);
    if (!isEmpty(exists)) {
      return showErrorToast(
        `Wallet with address ${publicKeyToAddress(publicKey)} already imported.`
      );
    }

    // TODO move publicKey out of account
    // TODO check if wallet isn't already added
    // or filter already used publicKeys out of
    // the dropbox while remaining the amount of addresses shown in the dropdown
    // TODO coinType is undefined (how to choose this???)
    addAccount({ account: { ...account, publicKey }, passphrase, coinType: NEO });
    setPassphrase('');
  };

  getPublicKeyItems = () => {
    const { publicKeys, publickeyProgress } = this.props;

    if (publickeyProgress === LOADING) {
      return [
        {
          label: 'Fetching public keys...',
          value: null
        }
      ];
    }

    if (isEmpty(publicKeys)) {
      return [
        {
          label: 'Awaiting device...',
          value: null
        }
      ];
    }

    return this.props.publicKeys.map(({ index, publicKey }) => ({
      label: publicKeyToAddress(publicKey),
      value: index
    }));
  };

  getCoinTypes = () => {
    return map(COINS, ({ name, coinType }) => ({ label: name, value: coinType }));
  };

  isValid = () => {
    const { selectedPublicKey, passphrase } = this.props;
    return selectedPublicKey !== null && passphrase !== '';
  };
}
