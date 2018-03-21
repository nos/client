import React from 'react';
import { string, func, objectOf } from 'prop-types';
import { map } from 'lodash';

import styles from './Tabs.scss';

export default class Tabs extends React.Component {
  static propTypes = {
    tabs: objectOf(string).isRequired,
    selectedTab: string.isRequired,
    renderTab: func.isRequired,
    onSelect: func.isRequired
  };

  render() {
    return (
      <div className={styles.tabs}>
        <div className={styles.header}>
          {map(this.props.tabs, this.renderHeader)}
        </div>

        {this.renderSelectedTab()}
      </div>
    );
  }

  renderHeader = (label, id) => {
    return (
      <div
        key={`tab-${id}`}
        className={styles.tab}
        onClick={this.handleClick(id)}
        onKeyPress={this.handleKeyPress(id)}
        tabIndex="0"
        role="button"
      >
        {label}
      </div>
    );
  }

  renderSelectedTab = () => {
    return (
      <div className={styles.header}>
        {this.props.renderTab(this.props.selectedTab)}
      </div>
    );
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
