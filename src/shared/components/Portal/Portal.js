import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import styles from './Portal.scss';

export default class Portal extends React.Component {
  static propTypes = {
    className: string,
    children: node
  };

  static defaultProps = {
    className: null,
    children: null
  };

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.className = classNames(styles.portal, this.props.className);
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
