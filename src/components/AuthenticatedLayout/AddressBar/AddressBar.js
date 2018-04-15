/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';
import { func, string } from 'prop-types';

import ButtonBar from '../ButtonBar';
import styles from './AddressBar.scss';

const RETURN_KEY = 13;

export default class AddressBar extends React.Component {
  static propTypes = {
    doQuery: func.isRequired,
    query: string
  };

  static defaultProps = {
    query: null
  };

  searchInput = React.createRef();

  componentDidUpdate(prevProps, _prevState) {
    if (this.props.query !== prevProps.query) {
      this.searchInput.current.value = this.props.query;
    }
  }

  render() {
    return (
      <div className={styles.addressBar}>
        <input
          type="text"
          placeholder="Search or enter address"
          onKeyUp={this.handleKeyUp}
          ref={this.searchInput}
          defaultValue={this.props.query}
        />
        <ButtonBar />
      </div>
    );
  }

  handleKeyUp = (event) => {
    const { doQuery } = this.props;

    if (event.which === RETURN_KEY) {
      doQuery(event.target.value);
    }
  };
}
