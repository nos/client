import React from 'react';
import { func } from 'prop-types';

import toastShape from 'shared/shapes/toastShape';
import SuccessIcon from 'shared/images/toasts/success.svg';
import ErrorIcon from 'shared/images/toasts/error.svg';
import InfoIcon from 'shared/images/toasts/info.svg';
import { TYPE_SUCCESS, TYPE_ERROR, TYPE_INFO } from 'shared/actions/toastsActions';

import styles from './Toast.scss';

export default class Toast extends React.PureComponent {
  static propTypes = {
    toast: toastShape.isRequired,
    onClose: func.isRequired
  };

  componentDidMount() {
    const {
      onClose,
      toast: { autoDismiss }
    } = this.props;

    if (autoDismiss) {
      this.timeout = setTimeout(onClose, Number(autoDismiss) * 1000);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { toast, onClose } = this.props;

    return (
      <div key={toast.id} className={styles.toast}>
        {this.renderIcon()}
        <span className={styles.message}>{toast.message}</span>
        <span className={styles.close} role="button" tabIndex={0} onClick={onClose}>
          Close
        </span>
      </div>
    );
  }

  renderIcon = () => {
    const Icon = this.getIcon();
    return Icon && <Icon className={styles.icon} />;
  };

  getIcon = () => {
    switch (this.props.toast.type) {
      case TYPE_SUCCESS:
        return SuccessIcon;
      case TYPE_ERROR:
        return ErrorIcon;
      case TYPE_INFO:
        return InfoIcon;
      default:
        return null;
    }
  };
}
