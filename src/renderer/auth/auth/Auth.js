import React from 'react';
import classNames from 'classnames';
import { string, func, bool } from 'prop-types';

import Modal from 'shared/components/Modal';

import styles from './Auth.scss';

import Login from '../components/login';
import Register from '../components/register';

export default class Auth extends React.PureComponent {
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

    return <Modal className={classNames(styles.confirm, className)}>{/* <LoginPanel /> */}</Modal>;
  }

  registerRef = (name) => {
    return (el) => {
      this[name] = el;
    };
  };
}
