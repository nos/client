/* eslint-disable react/no-unescaped-entities */
/* eslint-disable consistent-return */

import React from 'react';
import classNames from 'classnames';
import { string, node, bool, func } from 'prop-types';

import { EXTERNAL } from 'browser/values/browserValues';
import SidePanel from 'shared/components/SidePanel';
import TabLink from 'root/components/AuthenticatedLayout/TabLink';
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
  const handleOnLink = () => {
    onCancel();
  };

  return (
    <div className={classNames(styles.authPanel, className)}>
      {sidePanel && <SidePanel step={step} title={sidePanelTitle} text={sidePanelText} />}

      <div className={styles.content}>
        <CloseIcon className={styles.closeIcon} onClick={onCancel} />
        {children}
        {step === '1' && (
          <div onClick={handleOnLink} role="button" tabIndex={0}>
            <TabLink
              className={styles.returningUser}
              id="blog"
              styling={false}
              type={EXTERNAL}
              target="https://docs.nos.io/docs/nos-client/import-neo-wallet.html"
            >
              Can't find your old account? Click here to learn how to import it!
            </TabLink>
          </div>
        )}
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
  redirect: func,
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
  step: '1',
  redirect: null
};
