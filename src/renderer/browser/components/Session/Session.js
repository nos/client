import React from 'react';
import classNames from 'classnames';
import { string, func, number, bool } from 'prop-types';

import AddressBar from '../AddressBar';
import DAppContainer from '../DAppContainer';
import styles from './Session.scss';

export default function Session(props) {
  const {
    className,
    sessionId,
    target,
    onQuery,
    addressBarEntry,
    requestCount,
    errorCode,
    errorDescription
  } = props;

  return (
    <div key={sessionId} className={classNames(styles.session, className)}>
      <AddressBar
        className={styles.addressBar}
        query={target}
        onQuery={onQuery}
      />

      <DAppContainer
        className={styles.dapp}
        sessionId={sessionId}
        target={target}
        addressBarEntry={addressBarEntry}
        requestCount={requestCount}
        errorCode={errorCode}
        errorDescription={errorDescription}
      />
    </div>
  );
}

Session.propTypes = {
  className: string,
  sessionId: string.isRequired,
  target: string.isRequired,
  onQuery: func.isRequired,
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
