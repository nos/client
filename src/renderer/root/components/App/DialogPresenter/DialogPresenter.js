import React from 'react';
import { func } from 'prop-types';
import { noop } from 'lodash';

import NewWallet from 'shared/components/NewWallet';
import { Auth } from 'auth';

import Alert from 'shared/components/Alert';
import Confirm from 'shared/components/Confirm';

import { TYPE_ALERT, TYPE_CONFIRM, TYPE_AUTH, TYPE_NEW_WALLET } from 'root/values/dialogs';
import dialogShape from 'root/shapes/dialogShape';

export default class AlertPresenter extends React.PureComponent {
  static propTypes = {
    dialog: dialogShape,
    onClose: func
  };

  static defaultProps = {
    dialog: null,
    onClose: noop
  };

  render() {
    const { dialog } = this.props;

    if (!dialog) {
      return null;
    }

    return this.renderType(dialog.type, dialog.props);
  }

  renderType = (type, props) => {
    switch (type) {
      case TYPE_ALERT:
        return this.renderAlert(props);
      case TYPE_CONFIRM:
        return this.renderConfirm(props);
      case TYPE_AUTH:
        return this.renderAuth(props);
      case TYPE_NEW_WALLET:
        return this.renderNewWallet(props);
      default:
        throw new Error(`Invalid dialog type: "${type}"`);
    }
  };

  renderAlert = (props) => {
    return <Alert {...props} onConfirm={this.handleClose(props.onConfirm)} />;
  };

  renderConfirm = (props) => {
    return (
      <Confirm
        {...props}
        onConfirm={this.handleClose(props.onConfirm)}
        onCancel={this.handleClose(props.onCancel)}
      />
    );
  };

  renderAuth = (props) => {
    return (
      <Auth
        {...props}
        onConfirm={this.handleClose(props.onConfirm)}
        onCancel={this.handleClose(props.onCancel)}
      />
    );
  };

  renderNewWallet = (props) => {
    return (
      <NewWallet
        {...props}
        onConfirm={this.handleClose(props.onConfirm)}
        onCancel={this.handleClose(props.onCancel)}
      />
    );
  };

  handleClose = (callback) => {
    return () => {
      if (callback) {
        callback();
      }

      this.props.onClose();
    };
  };
}
