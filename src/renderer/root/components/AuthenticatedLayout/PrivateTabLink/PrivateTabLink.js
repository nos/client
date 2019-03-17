import React from 'react';
import classNames from 'classnames';
import { bool, string, func, node, oneOf } from 'prop-types';
import { noop } from 'lodash';

import { INTERNAL, EXTERNAL } from 'browser/values/browserValues';

import styles from './PrivateTabLink.scss';

export default class PrivateTabLink extends React.PureComponent {
  static propTypes = {
    className: string,
    type: oneOf([INTERNAL, EXTERNAL]),
    target: string,
    active: bool,
    disabled: bool,
    authenticated: bool,
    children: node,
    openTab: func,
    auth: func.isRequired
  };

  static defaultProps = {
    className: null,
    type: INTERNAL,
    target: null,
    active: false,
    disabled: false,
    authenticated: false,
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
    const { disabled, type, target, authenticated } = this.props;

    if (authenticated && target && !disabled) {
      this.props.openTab({ type, target });
    } else {
      this.props.auth(<div />, {
        onConfirm: this.handleConfirm,
        onCancel: undefined
      });

      // return <Component {...props} />;
    }
  };

  handleConfirm = () => {
    const { type, target } = this.props;
    this.props.openTab({ type, target });
  };

  onCancel = () => {
    // TODO
  };
}
