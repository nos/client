/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';
import { func, string } from 'prop-types';
import { noop } from 'lodash';

import ButtonBar from '../ButtonBar';
import styles from './AddressBar.scss';

const RETURN_KEY = 13;

export default class AddressBar extends React.Component {
  static propTypes = {
    query: string,
    setQuery: func,
    doQuery: func.isRequired
  };

  static defaultProps = {
    query: null,
    setQuery: noop
  };

  render() {
    return (
      <div className={styles.addressBar}>
        <input
          type="text"
          placeholder="Search or enter address"
          onKeyUp={this.handleKeyUp}
          value={this.props.query}
          onChange={this.handleChange}
        />
        <ButtonBar />
      </div>
    );
  }

  handleChange = (event) => {
    this.props.setQuery(event.target.value);
  }

  handleKeyUp = (event) => {
    const { doQuery } = this.props;

    if (event.which === RETURN_KEY) {
      doQuery(event.target.value);
    }
  };
}
