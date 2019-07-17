import React from 'react';
import { func } from 'prop-types';

import { CopyToClipboard } from '@nosplatform/react-copy-to-clipboard';

import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';
import Button from 'shared/components/Forms/Button';
import CopyIcon from 'shared/images/icons/copy.svg';
import registerShape from 'auth/shapes/registerShape';

import MnemonicWord from './MnemonicWord';
import styles from './MnemonicView.scss';

export default class MnemonicView extends React.PureComponent {
  static propTypes = {
    account: registerShape.isRequired,
    onCancel: func.isRequired,
    previousStep: func.isRequired,
    nextStep: func.isRequired,
    showInfoToast: func.isRequired
  };


  render() {
    const { onCancel, account, nextStep, previousStep } = this.props;

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
          onBack={previousStep}
          onNext={nextStep}
          nextBtnText="Next: Verify"
        />
      </AuthPanel>
    );
  }

  handleOnCopy = () => {
    this.props.showInfoToast('Copied recovery seed to clipboard.');
  };
}
