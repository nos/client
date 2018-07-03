import React from 'react';
import classNames from 'classnames';
import { string, number, bool } from 'prop-types';

import DAppContainer from '../DAppContainer';
import styles from './Session.scss';

export default function Session(props) {
  const {
    className,
    sessionId,
    target,
    addressBarEntry,
    requestCount,
    errorCode,
    errorDescription
  } = props;

  return (
    <DAppContainer
      key={sessionId}
      className={classNames(styles.session, className)}
      sessionId={sessionId}
      target={target}
      addressBarEntry={addressBarEntry}
      requestCount={requestCount}
      errorCode={errorCode}
      errorDescription={errorDescription}
    />
  );
}

Session.propTypes = {
  className: string,
  sessionId: string.isRequired,
  target: string.isRequired,
  addressBarEntry: bool.isRequired,
  requestCount: number.isRequired,
  errorCode: number,
  errorDescription: string
};

Session.defaultProps = {
  className: null,
  errorCode: null,
  errorDescription: null
};
