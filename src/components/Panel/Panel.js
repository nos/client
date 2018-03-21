/* eslint-disable consistent-return */

import React from 'react';
import classNames from 'classnames';
import { string, node, func } from 'prop-types';

import Content from './Content';
import Header from './Header';
import styles from './Panel.scss';

export default class Panel extends React.Component {
  static propTypes = {
    className: string,
    children: node,
    renderHeader: func
  };

  static defaultProps = {
    className: null,
    children: null,
    renderHeader: null
  };

  render = () => {
    return (
      <div className={classNames(styles.panel, this.props.className)}>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }

  renderHeader = () => {
    const { renderHeader } = this.props;

    if (renderHeader) {
      return <Header className={styles.header}>{renderHeader()}</Header>;
    }
  }

  renderContent = () => {
    return <Content className={styles.content}>{this.props.children}</Content>;
  }
}
