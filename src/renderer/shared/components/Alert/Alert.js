import React from 'react';
import classNames from 'classnames';
import { string, func, node } from 'prop-types';
import { noop } from 'lodash';

import Modal from '../Modal';
import Button from '../Forms/Button';
import defaultImage from '../../images/modal-request-icon.png';
import styles from './Alert.scss';

export default class Alert extends React.Component {
  static propTypes = {
    className: string,
    children: node,
    title: string,
    image: string,
    confirmLabel: string,
    onConfirm: func
  };

  static defaultProps = {
    className: null,
    children: null,
    title: null,
    image: defaultImage,
    confirmLabel: 'OK',
    onConfirm: noop
  };

  componentDidMount() {
    this.confirm.focus();
  }

  render() {
    const { className, image, confirmLabel, onConfirm, children } = this.props;

    return (
      <Modal className={classNames(styles.alert, className)}>
        <div className={styles.media}>
          <img src={image} width="200" alt="Icon" />
        </div>
        <div className={styles.content}>
          {this.renderTitle()}
          <div className={styles.body}>
            {children}
          </div>
          <div className={styles.actions}>
            <Button className={styles.action} ref={this.registerRef('confirm')} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  renderTitle = () => {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    return (
      <div className={styles.title}>
        {title}
      </div>
    );
  }

  registerRef = (name) => {
    return (el) => { this[name] = el; };
  }
}
