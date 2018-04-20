/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';
import { func, string, shape } from 'prop-types';

import ButtonBar from '../ButtonBar';
import styles from './AddressBar.scss';

const RETURN_KEY = 13;

const historyShape = shape({
  push: func.isRequired
});

export default class AddressBar extends React.Component {
  static propTypes = {
    doQuery: func.isRequired,
    query: string,
    history: historyShape.isRequired
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
    const { query, doQuery } = this.props;

    if (event.which === RETURN_KEY) {
      const { value } = event.target;

      if (value !== query) {
        doQuery(value);
      }
      this.props.history.push('/browser');
    }
  };
}
