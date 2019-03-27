import React from 'react';
import { bool, func } from 'prop-types';

import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import accountShape from 'auth/shapes/accountShape';

import styles from './SaveAccount.scss';

export default class SaveAccount extends React.PureComponent {
  static propTypes = {
    account: accountShape.isRequired,
    loading: bool.isRequired,
    login: func.isRequired,
    storeProfile: func.isRequired,
    setLastLogin: func.isRequired
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
            Confirm & Continue
          </PrimaryButton>
        </div>
      </div>
    );
  }

  handleSaveAndContinue = async () => {
    const { account, login, storeProfile, setLastLogin } = this.props;
    const { passphrase, accountLabel } = account;
    delete account.mnemonic;
    delete account.passphrase;

    // TODO move to index file using 'withLogin'
    setLastLogin(account);
    storeProfile({ label: accountLabel, value: account });
    login({ account, passphrase });
  };
}
