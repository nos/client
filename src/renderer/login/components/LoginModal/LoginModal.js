import React from 'react';
import classNames from 'classnames';
import { string, func, node } from 'prop-types';
import { noop } from 'lodash';

import Modal from 'shared/components/Modal';

import Button from 'shared/components/Forms/Button';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './Confirm.scss';

import Login from '../Login';

export default class LoginModal extends React.PureComponent {
  static propTypes = {
    className: string,
    children: node,
    title: string,
    origin: string,
    confirmLabel: string,
    cancelLabel: string,
    onConfirm: func,
    onCancel: func,
    renderFooter: func
  };

  static defaultProps = {
    className: null,
    children: null,
    title: null,
    origin: null,
    confirmLabel: 'OK',
    cancelLabel: 'Cancel',
    onConfirm: noop,
    onCancel: noop,
    renderFooter: noop
  };

  confirm = React.createRef();

  componentDidMount() {
    // this.confirm.current.focus();
  }

  render() {
    const { className, confirmLabel, cancelLabel, onConfirm, onCancel, children } = this.props;
    return (
      <Modal
        className={classNames(styles.confirm, className)}
        renderHeader={this.renderTitle}
        renderFooter={this.renderFooter}
      >
        <Login />
      </Modal>
    );
  }

  renderTitle = () => {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    return <div className={styles.title}>{title}</div>;
  };

  renderFooter = () => {
    return (
      <React.Fragment>
        {this.props.renderFooter()}
        {this.renderOrigin()}
      </React.Fragment>
    );
  };

  renderOrigin = () => {
    const { origin } = this.props;

    if (!origin) {
      return null;
    }

    return <div className={styles.origin}>Triggered by {origin}</div>;
  };

  registerRef = (name) => {
    return (el) => {
      this[name] = el;
    };
  };
}
