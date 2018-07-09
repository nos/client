import React from 'react';
import classNames from 'classnames';
import { string, func, node } from 'prop-types';

import Portal from '../Portal';
import styles from './Modal.scss';

export default class Modal extends React.Component {
  static propTypes = {
    className: string,
    children: node,
    renderHeader: func,
    renderFooter: func
  };

  static defaultProps = {
    className: null,
    children: null,
    renderHeader: null,
    renderFooter: null
  };

  render() {
    return (
      <Portal>
        <div className={styles.backdrop} />
        <div className={classNames(styles.modal, this.props.className)}>
          {this.renderHeader()}
          {this.props.children}
          {this.renderFooter()}
        </div>
      </Portal>
    );
  }

  renderHeader = () => {
    if (!this.props.renderHeader) {
      return null;
    }

    return this.props.renderHeader();
  }

  renderFooter = () => {
    if (!this.props.renderFooter) {
      return null;
    }

    return this.props.renderFooter();
  }
}
