import React from 'react';
import { func } from 'prop-types';

import styles from './AppButton.scss';
import appShape from '../../shape/appShape';

const AppButton = ({ app, openApp }) => {
  const { title, blurb, url, img_url: imgUrl } = app;

  return (
    <div
      className={styles.appbutton}
      role="button"
      tabIndex={0}
      onClick={openApp(url)}
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

AppButton.propTypes = {
  app: appShape.isRequired,
  openApp: func.isRequired
};

export default AppButton;
