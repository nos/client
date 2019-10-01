import { noop } from 'lodash';
import React from 'react';
import { string, func, bool } from 'prop-types';

import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import Button from 'shared/components/Forms/Button';

import styles from './NavigationButtons.scss';

const NavigationButtons = ({ onBack, onNext, nextBtnText, disabled, isSubmit }) => {
  const PrimaryButtonProps = {
    className: styles.nextBtn,
    onClick: onNext,
    disabled
  };

  if (isSubmit) PrimaryButtonProps.type = 'submit';

  return (
    <div className={styles.navigationButtons}>
      <Button className={styles.previousBtn} onClick={onBack}>
        Back
      </Button>
      <PrimaryButton {...PrimaryButtonProps}>{nextBtnText}</PrimaryButton>
    </div>
  );
};

NavigationButtons.propTypes = {
  onBack: func.isRequired,
  nextBtnText: string.isRequired,
  onNext: func,
  disabled: bool,
  isSubmit: bool
};

NavigationButtons.defaultProps = {
  disabled: false,
  isSubmit: false,
  onNext: noop
};

export default NavigationButtons;
