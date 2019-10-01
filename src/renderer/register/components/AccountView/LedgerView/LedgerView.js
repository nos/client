import React from 'react';
import { string, func, shape, arrayOf } from 'prop-types';
import { isEmpty } from 'lodash';
import { progressValues } from 'spunky';

import { publicKeyToAddress } from 'shared/wallet/common';
import registerShape from 'register/shapes/registerShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'shared/components/NavigationButtons';

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
    const { onCancel, previousStep } = this.props;

    const sidePanelText =
      'Connect your ledger and launch the NEO app. This will enable you to select an address for your wallet.';

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
          onBack={previousStep}
          onNext={this.handleNext}
          disabled={!this.isValid()}
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
            <div>Default Addresss</div>
            <div>{publicKey && publicKeyToAddress(publicKey)}</div>
          </div>
          {/* <LabeledSelect
            className={styles.input}
            labelClass={styles.label}
            id="walletAddress"
            label={(
              <div className={styles.labelWrap}>
                <div>Pick a wallet address</div>
                <div className={styles.labelFetch}
                role="button"
                tabIndex={0}
                onClick={this.handleFetchAddresses}
                disabled={true}>Fetch additional addresses</div>
              </div>
            )}
            disabled={isEmpty(this.props.publicKeys)}
            value={this.props.selectedPublicKey}
            items={this.getPublicKeyItems()}
            onChange={this.handleChangePublicKeys}
          /> */}
        </React.Fragment>
      );
    }

    return null;
  };

  handleNext = () => {
    const { account, storeFormData, publicKey } = this.props;

    storeFormData({ ...account, publicKey });
  };

  handleChangePublicKeys = (currentPublicKey) => {
    this.props.setSelectedPublicKey(currentPublicKey);
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
