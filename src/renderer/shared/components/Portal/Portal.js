import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { string, node, func } from 'prop-types';
import { noop } from 'lodash';

import styles from './Portal.scss';

export default class Portal extends React.PureComponent {
  static propTypes = {
    className: string,
    children: node,
    onClickOutside: func
  };

  static defaultProps = {
    className: null,
    children: null,
    onClickOutside: noop
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

  handleClickOutside = () => {
    this.props.onClickOutside();
  };
}
