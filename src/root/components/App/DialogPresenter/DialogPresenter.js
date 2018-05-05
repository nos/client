import React from 'react';
import { func } from 'prop-types';
import { noop } from 'lodash';

import Alert from 'shared/components/Alert';
import Confirm from 'shared/components/Confirm';

import dialogShape from '../../../shapes/dialogShape';
import { TYPE_ALERT, TYPE_CONFIRM } from '../../../values/dialogs';

export default class AlertPresenter extends React.Component {
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
      default:
        throw new Error(`Invalid dialog type: "${type}"`);
    }
  }

  renderAlert = (props) => {
    return (
      <Alert
        {...props}
        onConfirm={this.handleClose(props.onConfirm)}
      />
    );
  }

  renderConfirm = (props) => {
    return (
      <Confirm
        {...props}
        onConfirm={this.handleClose(props.onConfirm)}
        onCancel={this.handleClose(props.onCancel)}
      />
    );
  }

  handleClose = (callback) => {
    return () => {
      if (callback) {
        callback();
      }

      this.props.onClose();
    };
  }
}
