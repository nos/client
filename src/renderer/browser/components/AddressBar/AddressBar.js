import React from 'react';
import classNames from 'classnames';
import { func, string } from 'prop-types';
import { noop } from 'lodash';

import Icon from 'shared/components/Icon';

import styles from './AddressBar.scss';

const RETURN_KEY = 13;

export default class AddressBar extends React.Component {
  static propTypes = {
    className: string,
    query: string,
    onQuery: func,
    onBack: func,
    onForward: func,
    onReload: func
  };

  static defaultProps = {
    className: null,
    query: '',
    onQuery: noop,
    onBack: noop,
    onForward: noop,
    onReload: noop
  };

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.input.value = this.props.query;
      this.input.blur();
    }
  }

  render() {
    return (
      <div className={classNames(styles.addressBar, this.props.className)}>
        <div className={styles.buttonGroup}>
          <Icon name="back" className={styles.button} onClick={this.props.onBack} />
          <Icon name="forward" className={styles.button} onClick={this.props.onForward} />
          <Icon name="reload" className={styles.button} onClick={this.props.onReload} />
        </div>

        <input
          ref={this.registerRef}
          type="text"
          placeholder="Search or enter address"
          onKeyDown={this.handleKeyDown}
          defaultValue={this.props.query}
        />

        <div className={styles.buttonGroup}>
          <Icon name="notifications" className={styles.button} />
        </div>
      </div>
    );
  }

  handleKeyDown = (event) => {
    if (event.which === RETURN_KEY) {
      this.props.onQuery(event.target.value);
    }
  }

  registerRef = (el) => {
    this.input = el;
  }
}
