import React from 'react';
import classNames from 'classnames';
import { string, func, node, objectOf } from 'prop-types';
import { map } from 'lodash';

import styles from './Tabs.scss';

export default class Tabs extends React.Component {
  static propTypes = {
    className: string,
    tabsClass: string,
    tabClass: string,
    tabs: objectOf(node).isRequired,
    selectedTab: string.isRequired,
    renderTab: func.isRequired,
    onSelect: func.isRequired,
    onScroll: func.isRequired
  };

  static defaultProps = {
    className: null,
    tabsClass: null,
    tabClass: null
  };

  render() {
    const { className, tabsClass, tabs, onScroll } = this.props;

    return (
      <div className={classNames(styles.tabs, className)} onScroll={onScroll}>
        <ul className={classNames(styles.header, tabsClass)}>{map(tabs, this.renderHeader)}</ul>
        {this.renderSelectedTab()}
      </div>
    );
  }

  renderHeader = (label, id) => {
    const { tabClass, selectedTab } = this.props;

    return (
      <li key={`tab-${id}`} className={classNames(styles.tab, tabClass)}>
        <span
          className={classNames(styles.label, { [styles.selected]: id === selectedTab })}
          onClick={this.handleClick(id)}
          onKeyPress={this.handleKeyPress(id)}
          tabIndex="0"
          role="button"
        >
          {label}
        </span>
      </li>
    );
  };

  renderSelectedTab = () => {
    return this.props.renderTab(this.props.selectedTab);
  };

  handleClick = (id) => {
    return () => {
      this.selectTab(id);
    };
  };

  handleKeyPress = (id) => {
    return (event) => {
      if (event.keyCode === 13) {
        this.selectTab(id);
      }
    };
  };

  selectTab = (id) => {
    this.props.onSelect(id);
  };
}
