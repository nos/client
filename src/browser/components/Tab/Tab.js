import React from 'react';
import classNames from 'classnames';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import styles from './Tab.scss';

export default class Tab extends React.Component {
  static propTypes = {
    className: string,
    active: bool,
    title: string.isRequired,
    onClick: func,
    onClose: func
  };

  static defaultProps = {
    className: null,
    active: false,
    onClick: noop,
    onClose: noop
  };

  render() {
    const { className, active, title, onClick } = this.props;

    return (
      <div
        className={classNames(className, styles.tab, { [styles.active]: active })}
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <span className={styles.title}>{title}</span>
        <button className={styles.close} onClick={this.handleClose}>x</button>
      </div>
    );
  }

  handleClose = (event) => {
    event.stopPropagation();
    this.props.onClose();
  }
}
