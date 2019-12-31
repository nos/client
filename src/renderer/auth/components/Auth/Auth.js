import React from 'react';
import classNames from 'classnames';
import { string, func, bool } from 'prop-types';

import Modal from 'shared/components/Modal';
import accountsShape from 'auth/shapes/accountsShape';

import { Login } from 'login';
import { Register } from 'register';

import styles from './Auth.scss';

export const LOGIN = 'Login';
export const REGISTER = 'Register';

export default class Auth extends React.PureComponent {
  confirm = React.createRef();

  static propTypes = {
    className: string,
    loading: bool.isRequired,
    onConfirm: func.isRequired,
    onCancel: func.isRequired,
    login: func.isRequired,
    authenticated: bool.isRequired,
    accounts: accountsShape,
    component: string.isRequired,
    setComponent: func.isRequired
  };

  static defaultProps = {
    className: null,
    accounts: null
  };

  render() {
    const { className, authenticated, onConfirm, onCancel } = this.props;

    if (authenticated) {
      onConfirm();
    }

    // TODO use renderHeader & renderFooter instead of AuthPanel + add SidePanel option
    return (
      <Modal className={classNames(styles.auth, className)} handleClose={onCancel}>
        {this.renderComponent()}
      </Modal>
    );
  }

  renderComponent = () => {
    const { component, login, loading, onCancel, accounts } = this.props;

    switch (component) {
      case LOGIN:
        return (
          <Login
            accounts={accounts}
            login={login}
            loading={loading}
            onCancel={onCancel}
            redirect={this.handleSelectComponent}
          />
        );
      case REGISTER:
        return (
          <Register
            login={login}
            loading={loading}
            onCancel={onCancel}
            redirect={this.handleSelectComponent}
          />
        );
      default:
        throw new Error('Invalid Component.');
    }
  };

  handleSelectComponent = () => {
    const { component, setComponent } = this.props;

    const newSelectedComponent = component === LOGIN ? REGISTER : LOGIN;
    setComponent(newSelectedComponent);
  };
}
