import React from 'react';
import { func } from 'prop-types';

import accountShape from 'auth/shapes/accountShape';

// import LedgerView from './LedgerView';
import MnemonicView from './MnemonicView';
import LedgerView from './LedgerView';

const AccountView = ({ onCancel, account, onBack, setStep }) => {
  return account.isLedger ? (
    <LedgerView
      account={account}
      onBack={onBack}
      setStep={setStep}
      onCancel={onCancel}
    />
  ) : (
    <MnemonicView
      account={account}
      onBack={onBack}
      setStep={setStep}
      onCancel={onCancel}
    />
  );
};

AccountView.propTypes = {
  onCancel: func.isRequired,
  account: accountShape.isRequired,
  onBack: func.isRequired,
  setStep: func.isRequired
};

AccountView.defaultProps = {};

export default AccountView;
