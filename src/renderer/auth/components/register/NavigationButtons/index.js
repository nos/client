import React from 'react';
import { string, number } from 'prop-types';

import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import Button from 'shared/components/Forms/Button';

import styles from './NavigationButtons.scss';

const NavigationButtons = ({ onPrevious, onNext, buttonText, disabled }) => (
  <div className={styles.navigationButtons}>
    <Button className={styles.previousBtn} onClick={onPrevious} disabled={disabled}>
      Back
    </Button>
    <PrimaryButton className={styles.nextBtn} onClick={onNext} disabled={disabled}>
      <b>Next: </b> {buttonText}
    </PrimaryButton>
  </div>
);

NavigationButtons.propTypes = {
  count: number.isRequired,
  word: string.isRequired
};

NavigationButtons.defaultProps = {};

export default NavigationButtons;
