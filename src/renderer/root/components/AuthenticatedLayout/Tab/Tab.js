import React from 'react';
import classNames from 'classnames';
import { bool, string, func, oneOf } from 'prop-types';
import { noop } from 'lodash';

import Icon from 'shared/components/Icon';
import FavIcon from 'shared/images/browser/favicon.svg';
import NosIcon from 'shared/images/browser/favicon-nos.svg';
import { INTERNAL, EXTERNAL } from 'browser/values/browserValues';

import styles from './Tab.scss';

export default class Tab extends React.PureComponent {
  static propTypes = {
    className: string,
    active: bool,
    title: string.isRequired,
    type: oneOf([INTERNAL, EXTERNAL]).isRequired,
    icon: string,
    loading: bool,
    onClick: func,
    onClose: func
  };

  static defaultProps = {
    className: null,
    active: false,
    icon: null,
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
        {this.renderIcon()}
        <span className={styles.title}>{title}</span>
        <button type="button" className={styles.close} onClick={this.handleClose}>
          <span className={styles.closeContent}>
            <Icon name="close" />
          </span>
        </button>
      </div>
    );
  }

  renderIcon = () => {
    const { loading, icon, title, type } = this.props;

    if (loading) {
      return <Icon className={styles.loading} name="spin" />;
    } else if (icon) {
      return <img className={styles.icon} src={icon} alt={title} />;
    } else if (type === INTERNAL) {
      return <NosIcon className={styles.icon} />;
    } else {
      return <FavIcon className={styles.icon} />;
    }
  }

  handleClose = (event) => {
    event.stopPropagation();
    this.props.onClose();
  }
}
