import React from 'react';
import { string, func } from 'prop-types';
import { noop, omit } from 'lodash';

import refShape from 'shared/shapes/refShape';

import Input from '../Input';

export default class LiveUpdateInput extends React.Component {
  static propTypes = {
    forwardedRef: refShape,
    defaultValue: string,
    onChange: func
  };

  static defaultProps = {
    forwardedRef: null,
    defaultValue: '',
    onChange: noop
  };

  state = {
    value: this.props.defaultValue
  };

  input = this.props.forwardedRef || React.createRef();

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({ value: nextProps.defaultValue });
    }
  }

  render() {
    const passDownProps = omit(this.props, 'forwardedRef', 'defaultValue', 'onChange');

    return (
      <Input
        {...passDownProps}
        ref={this.input}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
      />
    );
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.blur();
    } else if (event.key === 'Escape') {
      this.reset();
    }
  };

  handleBlur = () => {
    const { value } = this.state;

    if (value !== this.props.defaultValue) {
      this.setState({ value: this.props.defaultValue }, () => {
        this.props.onChange(value);
      });
    }
  };

  reset = () => {
    this.setState({ value: this.props.defaultValue }, this.blur);
  };

  blur = () => {
    this.input.current.blur();
  };
}
