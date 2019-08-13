import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import selectItemShape from '../../../../shapes/selectItemShape';
import anyPropsChanged from '../../../../util/anyPropsChanged';

import styles from './DefaultItem.scss';

export default class DefaultItem extends React.Component {
  static propTypes = {
    className: string,
    item: selectItemShape.isRequired
  };

  static defaultProps = {
    className: null
  };

  shouldComponentUpdate(nextProps) {
    return anyPropsChanged(this.props, nextProps, ['item', 'selected']);
  }

  render() {
    const { className, item } = this.props;

    return <div className={classNames(styles.defaultItem, className)}>{item.label}</div>;
  }
}
