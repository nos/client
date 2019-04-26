/* eslint-disable consistent-return */

import React from 'react';
import classNames from 'classnames';
import { string, node, bool } from 'prop-types';

import SidePanel from 'auth/components/Register/SidePanel';
import CloseIcon from 'shared/images/icons/close-modal.svg';

import styles from './AuthPanel.scss';

export default function AuthPanel({
  className,
  sidePanel,
  step,
  sidePanelTitle,
  sidePanelText,
  children,
  onCancel,
  redirect,
  footer,
  footerText
}) {
  return (
    <div className={classNames(styles.authPanel, className)}>
      {sidePanel && <SidePanel step={step} title="New Wallet" text={sidePanelText} />}

      <div className={styles.content}>
        <CloseIcon className={styles.closeIcon} onClick={onCancel} />
        {children}
        {footer && (
          <div className={styles.footer} onClick={redirect} role="button" tabIndex={0}>
            <div className={styles.text}>{footerText}</div>
          </div>
        )}
      </div>
    </div>
  );
}

AuthPanel.propTypes = {
  className: string,
  children: node,
  sidePanel: bool
};

AuthPanel.defaultProps = {
  className: null,
  children: null,
  sidePanel: false
};
