import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import styles from './Select.scss';

export default class Select extends React.PureComponent {
  static propTypes = {
    className: string
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className, ...passDownProps } = this.props;

    return (
      <select
        {...passDownProps}
        className={classNames(styles.select, className)}
      />
    );
  }
}
