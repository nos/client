import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import Button from '../Button';
import styles from './PrimaryButton.scss';

export default class PrimaryButton extends React.PureComponent {
  render() {
    return (
      <Button
        {...this.props}
        ref={this.registerRef}
        className={classNames(styles.primaryButton, this.props.className)}
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

PrimaryButton.propTypes = {
  className: string
};

PrimaryButton.defaultProps = {
  className: null
};
