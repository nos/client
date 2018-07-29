import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import styles from './Button.scss';

export default class Button extends React.PureComponent {
  render() {
    return ( // eslint-disable-next-line react/button-has-type
      <button
        {...this.props}
        ref={this.registerRef}
        className={classNames(styles.button, this.props.className)}
      />
    );
  }

  registerRef = (el) => {
    this.button = el;
  }

  focus = () => {
    this.button.focus();
  }

  blur = () => {
    this.button.blur();
  }
}

Button.propTypes = {
  className: string,
  type: string
};

Button.defaultProps = {
  className: null,
  type: 'button'
};
