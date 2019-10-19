import React from 'react';
import classNames from 'classnames';
import { string, func, node } from 'prop-types';
import { noop } from 'lodash';

import Portal from '../Portal';
import OutSideClick from './OnClickOutside';
import styles from './Modal.scss';

export default class Modal extends React.PureComponent {
  static propTypes = {
    className: string,
    children: node,
    renderHeader: func,
    renderFooter: func,
    handleClose: func
  };

  static defaultProps = {
    className: null,
    children: null,
    renderHeader: noop,
    renderFooter: noop,
    handleClose: noop
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }

  render() {
    return (
      <Portal className={styles.portal}>
        <div className={styles.backdrop} />
        <OutSideClick onClickOutside={this.props.handleClose}>
          <div className={classNames(styles.modal, this.props.className)}>
            {this.props.renderHeader()}
            {this.props.children}
            {this.props.renderFooter()}
          </div>
        </OutSideClick>
      </Portal>
    );
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.props.handleClose();
    }
  };
}
