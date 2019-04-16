import React from 'react';
import { string, func } from 'prop-types';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';

// import LedgerView from './LedgerView';
import MnemonicView from './MnemonicView';

import styles from './AccountView.scss';

const AccountView = ({ onCancel, account, onBack, setStep }) => (account.isLedger ? null : (
  <MnemonicView account={account} onBack={onBack} setStep={setStep} onCancel={onCancel} />
));

AccountView.propTypes = {
  onCancel: func.isRequired,
  account: accountShape.isRequired,
  onBack: func.isRequired,
  setStep: func.isRequired
};

AccountView.defaultProps = {};

export default AccountView;
