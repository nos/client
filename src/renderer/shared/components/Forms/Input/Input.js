import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';

import styles from './Input.scss';

export default class Input extends React.PureComponent {
  static propTypes = {
    className: string,
    forwardedRef: func
  };

  static defaultProps = {
    className: null,
    forwardedRef: null
  };

  render() {
    const { className, forwardedRef, ...passDownProps } = this.props;

    return (
      <input
        {...passDownProps}
        ref={forwardedRef}
        className={classNames(styles.input, className)}
      />
    );
  }
}
