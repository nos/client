import React from 'react';
import { bool, string, func, shape, object } from 'prop-types';
import { noop } from 'lodash';
import { progressValues } from 'spunky';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';

import LedgerConnect from 'shared/images/auth/ledgerConnect.svg';
import LedgerConnected from 'shared/images/auth/ledgerConnected.svg';
import LedgerCompleted from 'shared/images/auth/ledgerCompleted.svg';

import styles from './LedgerView.scss';

const POLL_FREQUENCY = 3000;

const { LOADED, FAILED } = progressValues;

const deviceInfoShape = shape({
  manufacturer: string.isRequired,
  product: string.isRequired
});

export default class LedgerView extends React.PureComponent {
  static propTypes = {
    setStep: func.isRequired,
    onCancel: func.isRequired,
    onBack: func.isRequired,
    account: accountShape,
    poll: func.isRequired,
    getPublicKey: func.isRequired,
    onLogin: func,
    progress: string,
    disabled: bool,
    deviceInfo: deviceInfoShape,
    deviceInfoError: string,
    publicKey: string,
    publicKeyError: string
  };

  static defaultProps = {
    account: null,
    onLogin: noop,
    progress: null,
    disabled: false,
    deviceInfo: null,
    deviceInfoError: null,
    publicKey: null,
    publicKeyError: null
  };

  componentDidMount() {
    this.props.poll();
    this.pollInterval = setInterval(this.props.poll, POLL_FREQUENCY);
  }

  componentWillReceiveProps(nextProps) {
    const { deviceInfo, publicKey, getPublicKey } = nextProps;

    if (deviceInfo && !publicKey) {
      getPublicKey();
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }

  render() {
    const { onCancel, onBack } = this.props;

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

        <NavigationButtons onBack={onBack} onNext={this.onNext} nextBtnText="Next: Verify" />
      </AuthPanel>
    );
  }

  renderComponent = () => {
    const { deviceInfoError, deviceInfo, publicKey, publicKeyError } = this.props;

    console.log('props', this.props);

    if (deviceInfo && publicKey) {
      // TODO dropdown
      return (
        <React.Fragment>
          <LedgerCompleted />
          <p>
            {deviceInfo.manufacturer} {deviceInfo.product} Connected.
          </p>
        </React.Fragment>
      );
    }

    if (deviceInfo) {
      return (
        <React.Fragment>
          <LedgerConnected />
          <p>
            {deviceInfo.manufacturer} {deviceInfo.product} Connected.
          </p>
        </React.Fragment>
      );
    }

    if (deviceInfoError) {
      return (
        <React.Fragment>
          <LedgerConnect />
          <p>{deviceInfoError}</p>
        </React.Fragment>
      );
    }

    if (publicKeyError) {
      return (
        <React.Fragment>
          <LedgerConnect />
          <p>{publicKeyError}</p>
        </React.Fragment>
      );
    }

    // if (progress === FAILED) {
    //   return (
    //     <React.Fragment>
    //       <LedgerConnect />
    //       <div className={styles.text}>{deviceError}</div>
    //     </React.Fragment>
    //   );
    // }
  };

  handleLogin = (event) => {
    const { publicKey, onLogin } = this.props;

    event.preventDefault();
    onLogin({ publicKey });
  };

  onNext = () => {
    this.props.setStep(3);
  };
}
