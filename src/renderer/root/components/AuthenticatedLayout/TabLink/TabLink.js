import React from 'react';
import classNames from 'classnames';
import { bool, string, func, node, oneOf } from 'prop-types';
import { noop } from 'lodash';

import { INTERNAL, EXTERNAL } from 'browser/values/browserValues';

import styles from './TabLink.scss';

export default class TabLink extends React.PureComponent {
  static propTypes = {
    className: string,
    type: oneOf([INTERNAL, EXTERNAL]),
    target: string,
    active: bool,
    disabled: bool,
    children: node,
    openTab: func
  };

  static defaultProps = {
    className: null,
    type: INTERNAL,
    target: null,
    active: false,
    disabled: false,
    children: null,
    openTab: noop
  };

  render() {
    const className = classNames(this.props.className, styles.tabLink, {
      [styles.active]: this.props.active,
      [styles.disabled]: this.props.disabled
    });

    return (
      <span className={className} role="button" tabIndex="0" onClick={this.handleClick}>
        {this.props.children}
      </span>
    );
  }

  handleClick = () => {
    const { disabled, type, target } = this.props;

    if (target && !disabled) {
      this.props.openTab({ type, target });
    }
  };
}
