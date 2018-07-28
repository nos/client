import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { omit } from 'lodash';

import styles from './Input.scss';

export default class Input extends React.Component {
  static propTypes = {
    className: string,
    id: string.isRequired,
    label: string,
    labelClass: string
  };

  static defaultProps = {
    className: null,
    label: null,
    labelClass: null
  };

  render() {
    const { id, className } = this.props;

    return (
      <label htmlFor={id} className={classNames(styles.input, className)}>
        {this.renderLabel()}
        <input id={id} {...omit(this.props, 'className', 'label', 'labelClass')} />
      </label>
    );
  }

  renderLabel = () => {
    const { label, labelClass } = this.props;

    if (!label) {
      return null;
    }

    return (
      <span className={classNames(styles.label, labelClass)}>
        {label}
      </span>
    );
  }
}
