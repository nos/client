import React from 'react';
import { func, bool } from 'prop-types';

import accountShape from 'auth/shapes/accountShape';

// import LedgerView from './LedgerView';
import MnemonicView from './MnemonicView';
import LedgerView from './LedgerView';

const AccountView = ({ onCancel, account, onBack, setStep, loading }) => {
  return account.isLedger ? (
    <LedgerView
      account={account}
      onBack={onBack}
      setStep={setStep}
      onCancel={onCancel}
      loading={loading}
    />
  ) : (
    <MnemonicView
      account={account}
      onBack={onBack}
      setStep={setStep}
      onCancel={onCancel}
      loading={loading}
    />
  );
};

AccountView.propTypes = {
  onCancel: func.isRequired,
  account: accountShape.isRequired,
  onBack: func.isRequired,
  setStep: func.isRequired,
  loading: bool.isRequired
};

AccountView.defaultProps = {};

export default AccountView;
