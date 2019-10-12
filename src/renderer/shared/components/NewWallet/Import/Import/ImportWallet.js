import React from 'react';
import { string, func, bool } from 'prop-types';
import classNames from 'classnames';

import Button from 'shared/components/Forms/Button';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import Pill from 'shared/components/Pill';
import accountShape from 'auth/shapes/accountShape';

import ExistingImport from '../ExistingImport';
import NewImport from '../NewImport';

import styles from './ImportWallet.scss';

export default class ImportWallet extends React.PureComponent {
  static propTypes = {
    className: string,
    account: accountShape.isRequired,
    accounts: accountShape,
    onCancel: func.isRequired,
    onConfirm: func.isRequired,
    newImport: bool.isRequired,
    setNewImport: func.isRequired
  };

  static defaultProps = {
    className: null,
    accounts: []
  };

  render() {
    const { className, account, accounts, newImport } = this.props;
    const { secretWord } = account;

    return (
      <div className={classNames(className, styles.mnemonic)}>
        <Pill>{secretWord}</Pill>
        {this.renderForm()}
        {this.renderImportView({ accounts, newImport })}
        {this.renderActions()}
      </div>
    );
  }

  renderForm = () => {
    const { newImport, accounts, account, onConfirm } = this.props;

    return newImport ? (
      <NewImport account={account} onConfirm={onConfirm} />
    ) : (
      <ExistingImport account={account} accounts={accounts} onConfirm={onConfirm} />
    );
  };

  renderImportView = ({ accounts, newImport }) => (
    <React.Fragment>
      {accounts && (
        <div className={styles.toggle} role="button" tabIndex={0} onClick={this.handleToggle}>
          {newImport ? 'Import Previous Wallets' : 'Import New Wallet'}
        </div>
      )}
    </React.Fragment>
  );

  renderActions = () => (
    <div className={styles.actions}>
      <Button className={styles.action} onClick={this.props.onCancel}>
        Cancel
      </Button>
      <PrimaryButton className={styles.action} type="submit" form="walletForm">
        Import Wallet
      </PrimaryButton>
    </div>
  );

  handleToggle = () => {
    this.props.setNewImport(!this.props.newImport);
  };
}
