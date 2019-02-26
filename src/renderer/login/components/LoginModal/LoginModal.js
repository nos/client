import React from 'react';
import classNames from 'classnames';
import { string, func, bool } from 'prop-types';

import Modal from 'shared/components/Modal';

import styles from './Confirm.scss';

import Login from '../Login';

export default class LoginModal extends React.PureComponent {
  static propTypes = {
    className: string,
    onConfirm: func.isRequired,
    authenticated: bool.isRequired
  };

  static defaultProps = {
    className: null
  };

  confirm = React.createRef();

  componentDidMount() {
    // this.confirm.current.focus();
  }

  render() {
    const { className, authenticated, onConfirm } = this.props;

    if (authenticated) {
      onConfirm();
    }

    return (
      <Modal className={classNames(styles.confirm, className)}>
        <Login />
      </Modal>
    );
  }

  registerRef = (name) => {
    return (el) => {
      this[name] = el;
    };
  };
}
