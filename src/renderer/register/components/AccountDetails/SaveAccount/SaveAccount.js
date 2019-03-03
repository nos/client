import React from 'react';
import { bool, func } from 'prop-types';

import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import accountShape from '../../../shapes/accountShape';
import styles from './SaveAccount.scss';

export default class SaveAccount extends React.PureComponent {
  static propTypes = {
    account: accountShape.isRequired,
    loading: bool.isRequired,
    login: func.isRequired,
    storeProfile: func.isRequired
  };

  render() {
    const { loading } = this.props;

    return (
      <div className={styles.saveAccount}>
        <div className={styles.saveButtons}>
          <PrimaryButton
            className={styles.button}
            onClick={this.handleSaveAndContinue}
            disabled={loading}
          >
            Save & Continue
          </PrimaryButton>
        </div>
      </div>
    );
  }

  handleSaveAndContinue = async () => {
    const { account, login, storeProfile } = this.props;
    const { walletName, address, passphrase, encryptedKey } = account;

    storeProfile({ walletName, address, encryptedKey });
    login({ passphrase, encryptedWIF: encryptedKey });
  };
}
