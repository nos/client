import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';

import styles from './Select.scss';

export default class Select extends React.PureComponent {
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

      <select
        {...passDownProps}
        ref={forwardedRef}
        className={classNames(styles.select, className)}
      />
    );
  }
}
