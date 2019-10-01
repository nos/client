/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import classNames from 'classnames';
import { bool, string, func } from 'prop-types';
import { noop, omit } from 'lodash';

import refShape from 'shared/shapes/refShape';

import styles from './Input.scss';

export default class Input extends React.PureComponent {
  static propTypes = {
    forwardedRef: refShape,
    className: string,
    children: func,
    disabled: bool,
    renderBefore: func,
    renderAfter: func,
    onFocus: func,
    onBlur: func
  };

  static defaultProps = {
    className: null,
    children: (props) => <input {...props} />,
    disabled: false,
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
      [styles.focus]: this.state.focus,
      [styles.disabled]: this.props.disabled
    });

    const passDownProps = omit(
      this.props,
      'className',
      'children',
      'forwardedRef',
      'renderBefore',
      'renderAfter',
      'onFocus',
      'onBlur'
    );

    return (
      <div className={className} role="textbox" tabIndex={-1} onClick={this.handleClick}>
        {this.renderBefore()}
        {this.props.children({
          ...passDownProps,
          ref: this.ref,
          className: styles.input,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        })}
        {this.renderAfter()}
      </div>
    );
  }

  renderBefore = () => {
    const { renderBefore } = this.props;
    return renderBefore && renderBefore();
  };

  renderAfter = () => {
    const { renderAfter } = this.props;
    return renderAfter && renderAfter();
  };

  handleClick = () => {
    if (this.ref.current && this.ref.current.focus) {
      this.ref.current.focus();
    }
  };

  handleFocus = (event) => {
    this.setState({ focus: true });
    this.props.onFocus(event);
  };

  handleBlur = (event) => {
    this.setState({ focus: false });
    this.props.onBlur(event);
  };
}
