import React from 'react';
import classNames from 'classnames';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import Icon from 'shared/components/Icon';

import styles from './Tab.scss';

export default class Tab extends React.Component {
  static propTypes = {
    className: string,
    active: bool,
    title: string.isRequired,
    loading: bool,
    onClick: func,
    onClose: func
  };

  static defaultProps = {
    className: null,
    active: false,
    loading: false,
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
        {this.renderLoading()}
        <span className={styles.title}>{title}</span>
        <button className={styles.close} onClick={this.handleClose}>
          <span className={styles.closeContent}>
            <Icon name="close" />
          </span>
        </button>
      </div>
    );
  }

  renderLoading = () => {
    if (!this.props.loading) {
      return null;
    }

    return <Icon className={styles.loading} name="spin" />;
  }

  handleClose = (event) => {
    event.stopPropagation();
    this.props.onClose();
  }
}
