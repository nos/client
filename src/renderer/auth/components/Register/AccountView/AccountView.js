import React from 'react';
import { func, bool } from 'prop-types';

import accountShape from 'auth/shapes/accountShape';

// import LedgerView from './LedgerView';
import MnemonicView from './MnemonicView';
import LedgerView from './LedgerView';

const AccountView = ({ onCancel, account, previousStep, nextStep, loading }) => {
  return account.isLedger ? (
    <LedgerView
      account={account}
      nextStep={nextStep}
      previousStep={previousStep}
      onCancel={onCancel}
      loading={loading}
    />
  ) : (
    <MnemonicView
      account={account}
      nextStep={nextStep}
      previousStep={previousStep}
      onCancel={onCancel}
      loading={loading}
    />
  );
};

AccountView.propTypes = {
  onCancel: func.isRequired,
  account: accountShape.isRequired,
  previousStep: func.isRequired,
  nextStep: func.isRequired,
  loading: bool.isRequired
};

AccountView.defaultProps = {};

export default AccountView;
