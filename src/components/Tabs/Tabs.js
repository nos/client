import React from 'react';
import classNames from 'classnames';
import { string, func, objectOf } from 'prop-types';
import { map } from 'lodash';

import styles from './Tabs.scss';

export default class Tabs extends React.Component {
  static propTypes = {
    className: string,
    tabs: objectOf(string).isRequired,
    selectedTab: string.isRequired,
    renderTab: func.isRequired,
    onSelect: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    return (
      <div className={classNames(styles.tabs, this.props.className)}>
        <ul className={styles.header}>
          {map(this.props.tabs, this.renderHeader)}
        </ul>

        {this.renderSelectedTab()}
      </div>
    );
  }

  renderHeader = (label, id) => {
    return (
      <li key={`tab-${id}`} className={styles.tab}>
        <span
          className={classNames(styles.label, { [styles.selected]: id === this.props.selectedTab })}
          onClick={this.handleClick(id)}
          onKeyPress={this.handleKeyPress(id)}
          tabIndex="0"
          role="button"
        >
          {label}
        </span>
      </li>
    );
  }

  renderSelectedTab = () => {
    return this.props.renderTab(this.props.selectedTab);
  }

  handleClick = (id) => {
    return () => {
      this.selectTab(id);
    };
  }

  handleKeyPress = (id) => {
    return (event) => {
      if (event.keyCode === 13) {
        this.selectTab(id);
      }
    };
  }

  selectTab = (id) => {
    this.props.onSelect(id);
  }
}
