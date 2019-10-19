import React from 'react';
import classNames from 'classnames';
import { string, func, bool } from 'prop-types';
import { noop } from 'lodash';

import Modal from 'shared/components/Modal';
import accountShape from 'auth/shapes/accountShape';

import Ledger from '../Ledger';
import Mnemonic from '../Mnemonic';
import ImportWallet from '../Import';

import styles from './NewWallet.scss';

export default class NewWallet extends React.PureComponent {
  static propTypes = {
    className: string,
    title: string,
    onConfirm: func,
    onCancel: func,
    account: accountShape.isRequired,
    isImport: bool
  };

  static defaultProps = {
    className: null,
    title: null,
    onConfirm: noop,
    onCancel: noop,
    isImport: false
  };

  render() {
    const { account, className, onConfirm, onCancel, isImport } = this.props;

    return (
      <Modal
        className={classNames(styles.confirm, className)}
        renderHeader={this.renderTitle}
        renderFooter={this.renderFooter}
        handleClose={onCancel}
      >
        <div className={styles.content}>
          <div className={styles.body}>
            {this.renderComponent({ account, onConfirm, onCancel, isImport })}
          </div>
        </div>
      </Modal>
    );
  }

  renderComponent = ({ account, onConfirm, onCancel, isImport }) => {
    if (isImport)
      return <ImportWallet account={account} onConfirm={onConfirm} onCancel={onCancel} />;
    return account.isHardware ? (
      <Ledger account={account} onConfirm={onConfirm} onCancel={onCancel} />
    ) : (
      <Mnemonic account={account} onConfirm={onConfirm} onCancel={onCancel} />
    );
  };

  renderTitle = () => {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    return <div className={styles.title}>{title}</div>;
  };
}
