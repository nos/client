/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';
import { func } from 'prop-types';
import Icon from '../Icon';

import styles from './AddressBar.scss';

const RETURN_KEY = 13;

class AddressBar extends React.Component {
  render() {
    return (
      <div className={styles.addressBar}>
        <input
          type="text"
          placeholder="Search or enter address"
          onKeyUp={this.handleKeyUp}
          ref={this.searchInput}
          autoFocus
        />
        <button>
          <Icon name="unfavorite" />
        </button>
        <button>
          <Icon name="settings" />
        </button>
      </div>
    );
  }

  handleKeyUp = (event) => {
    const { doQuery } = this.props;
    if (event.which === RETURN_KEY && doQuery) {
      doQuery(this.searchInput.current.value);
    }
  };

  searchInput = React.createRef();
}

AddressBar.propTypes = {
  doQuery: func.isRequired
};

export default AddressBar;
