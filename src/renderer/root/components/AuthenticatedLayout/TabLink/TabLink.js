import React from 'react';
import classNames from 'classnames';
import { bool, string, func, node, oneOf } from 'prop-types';
import { noop } from 'lodash';

import { INTERNAL, EXTERNAL } from 'browser/values/browserValues';

import styles from './TabLink.scss';

export default class TabLink extends React.Component {
  static propTypes = {
    className: string,
    type: oneOf([INTERNAL, EXTERNAL]),
    target: string.isRequired,
    disabled: bool,
    children: node,
    openTab: func
  };

  static defaultProps = {
    className: null,
    type: INTERNAL,
    disabled: false,
    children: null,
    openTab: noop
  };

  render() {
    return (
      <span
        className={classNames(this.props.className, styles.tabLink)}
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
      >
        {this.props.children}
      </span>
    );
  }

  handleClick = () => {
    const { disabled, type, target } = this.props;

    if (!disabled) {
      this.props.openTab({ type, target });
    }
  }
}
