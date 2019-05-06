import React from 'react';
import { bool, string, func, shape } from 'prop-types';
import { noop, isEmpty } from 'lodash';
import { progressValues } from 'spunky';
import { wallet } from '@cityofzion/neon-js';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';

import LedgerConnect from 'shared/images/auth/ledgerConnect.svg';
import LedgerConnected from 'shared/images/auth/ledgerConnected.svg';
import LedgerCompleted from 'shared/images/auth/ledgerCompleted.svg';

import styles from './LedgerView.scss';

const POLL_FREQUENCY = 4500;

const { LOADED, FAILED, LOADING } = progressValues;

const deviceInfoShape = shape({
  manufacturer: string.isRequired,
  product: string.isRequired
});

export default class LedgerView extends React.PureComponent {
  static propTypes = {
    setStep: func.isRequired,
    onCancel: func.isRequired,
    onBack: func.isRequired,
    account: accountShape.isRequired,
    poll: func.isRequired,
    getPublicKey: func.isRequired,
    deviceInfoProgress: string,
    publickeyProgress: string,
    loading: bool.isRequired,
    deviceInfo: deviceInfoShape,
    deviceInfoError: string,
    publicKey: string,
    publicKeyError: string
  };

  static defaultProps = {
    deviceInfoProgress: null,
    publickeyProgress: null,
    deviceInfo: null,
    deviceInfoError: null,
    publicKey: null,
    publicKeyError: null
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
    const { onCancel, onBack, loading } = this.props;

    console.log('loading ', loading);
    console.log('valid ', this.isValid());

    const sidePanelText =
      'Connect your ledger and launch the NEO app. This will enable you to select an address for wallet.';

    return (
      <AuthPanel
        sidePanel
        step="2"
        onCancel={onCancel}
        className={styles.register}
        sidePanelText={sidePanelText}
      >
        <div className={styles.ledgerView}>{this.renderComponent()}</div>

        {/** TODO onBack or Cancel remove deviceInfo and publicKey data  */}
        <NavigationButtons
          onBack={onBack}
          onNext={this.onNext}
          disabled={loading || !this.isValid()}
          nextBtnText="Next: Verify"
        />
      </AuthPanel>
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
          <LabeledSelect
            className={styles.input}
            labelClass={styles.label}
            id="walletAddress"
            label={(
              <div className={styles.labelWrap}>
                <div>Pick a wallet address</div>
                <div className={styles.labelRight}>Fetch additional addresses</div>
              </div>
)}
            disabled={isEmpty(this.props.publicKey)}
            value={this.props.publicKey}
            items={this.getPublicKeyItems()}
            onChange={this.handleChangePublicKeys}
          />
        </React.Fragment>
      );
    }
  };

  handleLogin = (event) => {
    const { publicKey, onLogin } = this.props;

    event.preventDefault();
    onLogin({ publicKey });
  };

  handleChangePublicKeys = (currentPublicKey) => {
    // TODO create setCurrentPublicKey
    // this.props.setCurrentPublicKey(currentPublicKey);
  };

  getPublicKeyItems = () => {
    // const balances = map(this.props.publicKey, (publicKeys) => ({
    // label: symbol,
    // value: scriptHash,
    // icon: image
    // }));

    return [
      { label: this.unencodedHexToAddress(this.props.publicKey), value: this.props.publicKey }
    ];
  };

  unencodedHexToAddress = (publicKey) => {
    const encodedKey = wallet.getPublicKeyEncoded(publicKey);

    return new wallet.Account(encodedKey).address;
  };

  onNext = () => {
    this.props.setStep(3);
  };

  isValid = () => {
    return !isEmpty(this.props.publicKey);
  };
}
