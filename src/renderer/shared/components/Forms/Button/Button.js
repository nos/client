import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';
import { omit } from 'lodash';

import styles from './Button.scss';

export default class Button extends React.PureComponent {
  static propTypes = {
    className: string,
    type: string,
    forwardedRef: func
  };

  static defaultProps = {
    className: null,
    type: 'button',
    forwardedRef: null
  };

  render() {
    return ( // eslint-disable-next-line react/button-has-type
      <button
        {...omit(this.props, 'forwardedRef')}
        ref={this.props.forwardedRef}
        className={classNames(styles.button, this.props.className)}
      />
    );
  }
}
