import React from 'react';
import { func, bool } from 'prop-types';

import { CopyToClipboard } from '@nosplatform/react-copy-to-clipboard';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';
import Button from 'shared/components/Forms/Button';
import CopyIcon from 'shared/images/icons/copy.svg';

import MnemonicWord from './MnemonicWord';
import styles from './MnemonicView.scss';

export default class MnemonicView extends React.PureComponent {
  static propTypes = {
    account: accountShape,
    setStep: func.isRequired,
    onCancel: func.isRequired,
    onBack: func.isRequired,
    showInfoToast: func.isRequired,
    loading: bool.isRequired
  };

  static defaultProps = {
    account: null
  };

  render() {
    const { onCancel, account, onBack, loading } = this.props;

    return (
      <AuthPanel
        sidePanel
        step="2"
        onCancel={onCancel}
        className={styles.mnemonicView}
        sidePanelText="✍ Write down your recovery seed and store it in a safe place. Your recovery seed grants access to all your crypto-currency private keys, so keep it secure!"
      >
        <div className={styles.mnemonic}>
          {account.mnemonic
            .trim()
            .split(' ')
            .map((word, count) => (
              <MnemonicWord key={`${word + count + 1}`} count={count + 1} word={word} />
            ))}
        </div>
        <CopyToClipboard text={account.mnemonic} onCopy={this.handleOnCopy}>
          <Button className={styles.button}>
            <CopyIcon /> Copy to Clipboard
          </Button>
        </CopyToClipboard>
        <NavigationButtons
          onBack={onBack}
          onNext={this.onNext}
          disabled={loading}
          nextBtnText="Next: Verify"
        />
      </AuthPanel>
    );
  }

  handleOnCopy = () => {
    this.props.showInfoToast('Copied recovery seed to clipboard.');
  };

  onNext = () => {
    this.props.setStep(3);
  };
}
