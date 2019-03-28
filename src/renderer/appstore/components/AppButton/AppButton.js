import React from 'react';

import styles from './AppButton.scss';

const AppButton = ({ app, openAccountApp, openExternalApp }) => {
  const { title, blurb, url, img_url: imgUrl } = app;

  const action = url === 'Account' ? openAccountApp : openExternalApp(url);

  return (
    <div
      className={styles.appbutton}
      role="button"
      tabIndex={-1}
      onClick={action}
    >
      <div className={styles.imgContainer}>
        <img alt={`${title} logo`} src={imgUrl} />
      </div>
      <div className={styles.appInfo}>
        <h2>{title}</h2>
        <p>{blurb}</p>
      </div>
    </div>
  );
};

export default AppButton;
