import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { omit } from 'lodash';

import refShape from 'shared/shapes/refShape';

import styles from './Button.scss';

export default class Button extends React.PureComponent {
  static propTypes = {
    className: string,
    type: string,
    forwardedRef: refShape
  };

  static defaultProps = {
    className: null,
    type: 'button',
    forwardedRef: null
  };

  render() {
    return (
      // eslint-disable-next-line react/button-has-type
      <button
        {...omit(this.props, 'forwardedRef')}
        ref={this.props.forwardedRef}
        className={classNames(styles.button, this.props.className)}
      />
    );
  }
}
