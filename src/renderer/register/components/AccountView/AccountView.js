import React from 'react';
import { func, bool } from 'prop-types';

import registerShape from 'register/shapes/registerShape';

import ImportView from './ImportView';
import LedgerView from './LedgerView';
import MnemonicView from './MnemonicView';

const AccountView = ({ onCancel, account, previousStep, nextStep, loading }) => {
  const { isHardware, isImport } = account;

  const nextProps = { account, nextStep, previousStep, onCancel, loading };

  if (isHardware) return <LedgerView {...nextProps} />;

  if (isImport) return <ImportView {...nextProps} />;

  return <MnemonicView {...nextProps} />;
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
