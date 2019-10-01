import React from 'react';
import { func, arrayOf } from 'prop-types';
import { noop, map, partial } from 'lodash';

import toastShape from 'shared/shapes/toastShape';

import Toast from './Toast';
import styles from './Toasts.scss';

export default class Toasts extends React.PureComponent {
  static propTypes = {
    toasts: arrayOf(toastShape),
    hide: func
  };

  static defaultProps = {
    toasts: [],
    hide: noop
  };

  render() {
    return <div className={styles.toasts}>{map(this.props.toasts, this.renderToast)}</div>;
  }

  renderToast = (toast) => {
    return <Toast key={toast.id} toast={toast} onClose={partial(this.props.hide, toast.id)} />;
  };
}
