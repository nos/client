import React from 'react';
import classNames from 'classnames';
import { string, func, node } from 'prop-types';
import { noop } from 'lodash';

import Modal from '../Modal';
import PrimaryButton from '../Forms/PrimaryButton';
import styles from './Alert.scss';

export default class Alert extends React.PureComponent {
  static propTypes = {
    className: string,
    children: node,
    title: string,
    confirmLabel: string,
    onConfirm: func
  };

  static defaultProps = {
    className: null,
    children: null,
    title: null,
    confirmLabel: 'OK',
    onConfirm: noop
  };

  componentDidMount() {
    this.confirm.focus();
  }

  render() {
    const { className, confirmLabel, onConfirm, children } = this.props;

    return (
      <Modal className={classNames(styles.alert, className)}>
        {this.renderTitle()}
        <div className={styles.body}>{children}</div>
        <div className={styles.actions}>
          <PrimaryButton
            className={styles.action}
            ref={this.registerRef('confirm')}
            onClick={onConfirm}
          >
            {confirmLabel}
          </PrimaryButton>
        </div>
      </Modal>
    );
  }

  renderTitle = () => {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    return <div className={styles.title}>{title}</div>;
  };

  registerRef = (name) => {
    return (el) => {
      this[name] = el;
    };
  };
}
