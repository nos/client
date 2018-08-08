import React from 'react';
import { func } from 'prop-types';

import toastShape from 'shared/shapes/toastShape';
import SuccessIcon from 'shared/images/toasts/success.svg';
import { TYPE_SUCCESS, TYPE_ERROR, TYPE_INFO } from 'shared/actions/toastsActions';

import styles from './Toast.scss';

export default class Toast extends React.PureComponent {
  static propTypes = {
    toast: toastShape.isRequired,
    onClose: func.isRequired
  }

  componentDidMount() {
    const { autoDismiss } = this.props.toast;

    if (autoDismiss !== false) {
      this.timeout = setTimeout(this.props.onClose, Number(autoDismiss) * 1000);
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
        <span
          className={styles.close}
          role="button"
          tabIndex={0}
          onClick={onClose}
        >
          Close
        </span>
      </div>
    );
  }

  renderIcon = () => {
    switch (this.props.toast.type) {
      case TYPE_SUCCESS:
      case TYPE_ERROR:
      case TYPE_INFO:
        return <SuccessIcon className={styles.icon} />;
      default:
        return null;
    }
  }
}
