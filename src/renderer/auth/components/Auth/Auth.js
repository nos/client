import React from 'react';
import classNames from 'classnames';
import { string, func, bool, any } from 'prop-types';
import { isEmpty } from 'lodash';

import Modal from 'shared/components/Modal';

import styles from './Auth.scss';

import Login from '../Login';
import Register from '../Register';

const LOGIN = 'Login';
const REGISTER = 'Register';

export default class Auth extends React.PureComponent {
  static propTypes = {
    className: string,
    loading: bool.isRequired,
    onConfirm: func.isRequired,
    onCancel: func.isRequired,
    login: func.isRequired,
    authenticated: bool.isRequired,
    accounts: any.isRequired
  };

  static defaultProps = {
    className: null
  };

  confirm = React.createRef();

  state = {
    component: LOGIN
  };

  componentDidMount() {
    const { accounts } = this.props;
    this.setState({ component: isEmpty(accounts) ? REGISTER : LOGIN });
    // this.confirm.current.focus();
  }

  render() {
    const { className, authenticated, onConfirm } = this.props;

    if (authenticated) {
      onConfirm();
    }

    return (
      <Modal className={classNames(styles.auth, className)}>
        {this.renderComponent()}
      </Modal>
    );
  }

  renderComponent = () => {
    const { login, loading, onCancel } = this.props;

    return (
      <Register
        login={login}
        loading={loading}
        onCancel={onCancel}
        redirect={this.handleSelectComponent}
      />
    );

    switch (this.state.component) {
      case LOGIN:
        return (
          <Login
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
    const { component } = this.state;
    const newSelectedComponent = component === LOGIN ? REGISTER : LOGIN;
    this.setState({ component: newSelectedComponent });
  };
}
