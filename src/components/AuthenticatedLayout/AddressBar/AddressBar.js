/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';
import { func, string, shape } from 'prop-types';
import { NavLink } from 'react-router-dom';

import Icon from '../../Icon';
import styles from './AddressBar.scss';

const RETURN_KEY = 13;

class AddressBar extends React.Component {
  componentDidUpdate(prevProps, _prevState) {
    if (this.props.target !== prevProps.target) {
      this.props.history.push('/dapp');
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
          autoFocus
        />
        <button>
          <Icon name="notifications" />
        </button>
        <button>
          <NavLink to="/settings">
            <Icon name="settings" />
          </NavLink>
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

AddressBar.defaultProps = {
  target: 'https://google.com'
};

AddressBar.propTypes = {
  doQuery: func.isRequired,
  target: string,
  history: shape({
    push: func
  }).isRequired
};

export default AddressBar;
