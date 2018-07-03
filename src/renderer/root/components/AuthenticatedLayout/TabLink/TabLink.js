import React from 'react';
import classNames from 'classnames';
import { string, func, node } from 'prop-types';
import { noop } from 'lodash';

import styles from './TabLink.scss';

export default class TabLink extends React.Component {
  static propTypes = {
    className: string,
    target: string.isRequired,
    title: string,
    children: node,
    openTab: func
  };

  static defaultProps = {
    className: null,
    title: 'New Tab',
    openTab: noop,
    children: null
  };

  render() {
    return (
      <span
        className={classNames(this.props.className, styles.tabLink)}
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
      >
        {this.props.children}
      </span>
    );
  }

  handleClick = () => {
    const { target, title } = this.props;
    this.props.openTab({ target, title });
  }
}
