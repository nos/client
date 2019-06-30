import React from 'react';
import { func, bool } from 'prop-types';

import registerShape from 'auth/shapes/registerShape';

// import LedgerView from './LedgerView';
import MnemonicView from './MnemonicView';
import LedgerView from './LedgerView';

const AccountView = ({ onCancel, account, previousStep, nextStep, loading }) => {
  return account.isHardware ? (
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
  account: registerShape.isRequired,
  previousStep: func.isRequired,
  nextStep: func.isRequired,
  loading: bool.isRequired
};

AccountView.defaultProps = {};

export default AccountView;
