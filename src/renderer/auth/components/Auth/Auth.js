import React from 'react';
import classNames from 'classnames';
import { string, func, bool } from 'prop-types';
import { noop } from 'lodash';

import Modal from 'shared/components/Modal';

import styles from './Auth.scss';

import Login from '../Login';
import Register from '../Register';

const LOGIN = 'Login';
const REGISTER = 'Register';

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

  state = {
    component: LOGIN // Todo set to login
  };

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
        {this.renderComponent()}
        {this.renderFooter()}
      </Modal>
    );
  }

  renderComponent = () => {
    switch (this.state.component) {
      case LOGIN:
        return <Login />;
      case REGISTER:
        return <Register />;
      default:
        throw new Error('Invalid Component.');
    }
  };

  renderFooter = () => (
    <span className={styles.footer}>
      New to nOS? <a onClick={this.handleSelectComponent}>Create Wallet</a>
    </span>
  );

  handleSelectComponent = () => {
    const { component } = this.state;
    const newSelectedComponent = component === LOGIN ? REGISTER : LOGIN;
    this.setState({ component: newSelectedComponent });
  };

  registerRef = (name) => {
    return (el) => {
      this[name] = el;
    };
  };
}
