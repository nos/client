import React from 'react';
import { func } from 'prop-types';
import { noop } from 'lodash';

import Alert from '../../Alert';
import alertShape from '../../../shapes/alertShape';

export default class AlertPresenter extends React.Component {
  static propTypes = {
    alert: alertShape,
    onClose: func
  };

  static defaultProps = {
    alert: null,
    onClose: noop
  };

  render() {
    const { alert } = this.props;

    if (!alert) {
      return null;
    }

    return <Alert {...alert} onConfirm={this.handleClose} />;
  }

  handleClose = () => {
    this.props.onClose();
  }
}
