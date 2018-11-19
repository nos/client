import React from 'react';
import classNames from 'classnames';
import { string, func, node } from 'prop-types';
import { noop } from 'lodash';

import Portal from '../Portal';
import styles from './Modal.scss';

export default class Modal extends React.PureComponent {
  static propTypes = {
    className: string,
    children: node,
    renderHeader: func,
    renderFooter: func
  };

  static defaultProps = {
    className: null,
    children: null,
    renderHeader: noop,
    renderFooter: noop
  };

  render() {
    return (
      <Portal className={styles.portal}>
        <div className={styles.backdrop} />
        <div className={classNames(styles.modal, this.props.className)}>
          {this.props.renderHeader()}
          {this.props.children}
          {this.props.renderFooter()}
        </div>
      </Portal>
    );
  }
}
