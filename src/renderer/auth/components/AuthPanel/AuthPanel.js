/* eslint-disable consistent-return */

import React from 'react';
import classNames from 'classnames';
import { string, node, bool, func, string } from 'prop-types';

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
      {sidePanel && <SidePanel step={step} title={sidePanelTitle} text={sidePanelText} />}

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
  sidePanel: bool,
  step: string,
  sidePanelTitle: string,
  sidePanelText: string,
  onCancel: func.isRequired,
  redirect: func.isRequired, // TODO find better name
  footer: bool,
  footerText: string
};

AuthPanel.defaultProps = {
  className: null,
  children: null,
  sidePanel: false,
  footer: false,
  footerText: '',
  sidePanelTitle: 'New Wallet',
  sidePanelText: '',
  step: '1'
};
