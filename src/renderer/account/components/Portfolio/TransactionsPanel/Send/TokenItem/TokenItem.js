import React from 'react';
import classNames from 'classnames';
import { string, shape } from 'prop-types';

import TokenIcon from 'shared/components/TokenIcon';
import anyPropsChanged from 'shared/util/anyPropsChanged';

import styles from './TokenItem.scss';

const tokenItemShape = shape({
  label: string.isRequired,
  value: string.isRequired,
  icon: string
});

export default class TokenItem extends React.Component {
  static propTypes = {
    className: string,
    item: tokenItemShape.isRequired
  };

  static defaultProps = {
    className: null
  };

  shouldComponentUpdate(nextProps) {
    return anyPropsChanged(this.props, nextProps, ['item', 'selected']);
  }

  render() {
    const { className, item } = this.props;

    return (
      <div className={classNames(styles.tokenItem, className)}>
        <TokenIcon
          className={styles.icon}
          image={item.icon}
          symbol={item.label}
          scriptHash={item.value}
        />
        <span className={styles.label}>{item.label}</span>
      </div>
    );
  }
}
