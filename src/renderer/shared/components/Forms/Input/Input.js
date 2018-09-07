/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';
import { noop, omit } from 'lodash';

import refShape from 'shared/shapes/refShape';

import styles from './Input.scss';

export default class Input extends React.PureComponent {
  static propTypes = {
    className: string,
    forwardedRef: refShape,
    renderBefore: func,
    renderAfter: func,
    onFocus: func,
    onBlur: func
  };

  static defaultProps = {
    className: null,
    forwardedRef: null,
    renderBefore: null,
    renderAfter: null,
    onFocus: noop,
    onBlur: noop
  };

  state = {
    focus: false
  };

  ref = this.props.forwardedRef || React.createRef();

  render() {
    const className = classNames(styles.container, this.props.className, {
      [styles.focus]: this.state.focus
    });

    const passDownProps = omit(this.props, 'className', 'forwardedRef', 'renderBefore',
      'renderAfter', 'onFocus', 'onBlur');

    return (
      <div className={className} role="textbox" tabIndex={-1} onClick={this.handleClick}>
        {this.renderBefore()}
        <input
          {...passDownProps}
          className={styles.input}
          ref={this.ref}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {this.renderAfter()}
      </div>
    );
  }

  renderBefore = () => {
    const { renderBefore } = this.props;
    return renderBefore && renderBefore();
  }

  renderAfter = () => {
    const { renderAfter } = this.props;
    return renderAfter && renderAfter();
  }

  handleClick = () => {
    this.ref.current.focus();
  }

  handleFocus = (event) => {
    this.setState({ focus: true });
    this.props.onFocus(event);
  }

  handleBlur = (event) => {
    this.setState({ focus: false });
    this.props.onBlur(event);
  }
}
