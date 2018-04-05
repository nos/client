import React from 'react';
import classNames from 'classnames';
import { string, func, node } from 'prop-types';
import { noop } from 'lodash';

import Modal from '../Modal';
import Button from '../Forms/Button';
import image from '../../images/modal-request-icon.png';
import styles from './Confirm.scss';

export default function SampleConfirm(props) {
  return (
    <Modal className={styles.confirm}>
      <div className={styles.media}>
        <img src={props.image} width="200" alt="Icon" />
      </div>
      <div className={styles.content}>
        <h4>{props.title}</h4>
        <div>
          {props.children}
        </div>
        <div className={styles.actions}>
          <Button className={styles.action} onClick={props.onConfirm} >
            {props.confirmLabel}
          </Button>
          <Button className={classNames(styles.action, styles.cancel)} onClick={props.onCancel}>
            {props.cancelLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

SampleConfirm.propTypes = {
  children: node,
  title: string.isRequired,
  image: string,
  confirmLabel: string,
  cancelLabel: string,
  onConfirm: func,
  onCancel: func
};

SampleConfirm.defaultProps = {
  children: null,
  image,
  confirmLabel: 'OK',
  cancelLabel: 'Cancel',
  onConfirm: noop,
  onCancel: noop
};
