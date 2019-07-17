import React from 'react';
import { string, func, bool } from 'prop-types';

import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import Button from 'shared/components/Forms/Button';

import styles from './NavigationButtons.scss';

const NavigationButtons = ({ onBack, onNext, nextBtnText, disabled }) => (
  <div className={styles.navigationButtons}>
    <Button className={styles.previousBtn} onClick={onBack}>
      Back
    </Button>
    <PrimaryButton className={styles.nextBtn} onClick={onNext} disabled={disabled}>
      {nextBtnText}
    </PrimaryButton>
  </div>
);

NavigationButtons.propTypes = {
  onBack: func.isRequired,
  onNext: func.isRequired,
  nextBtnText: string.isRequired,
  disabled: bool
};

NavigationButtons.defaultProps = {
  disabled: false
};

export default NavigationButtons;
