import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import styles from './Input.scss';

export default class Input extends React.PureComponent {
  static propTypes = {
    className: string
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, ...passDownProps } = this.props;

    return (
      <input
        {...passDownProps}
        className={classNames(styles.input, className)}
      />
    );
  }
}
