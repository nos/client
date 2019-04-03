import React from 'react';
import { func, bool } from 'prop-types';
import { noop } from 'lodash';

import styles from './AppCard.scss';
import appShape from '../../shape/appShape';

const AppCard = ({ app, openApp, internal }) => {
  const { title, blurb, url, img_url: imgUrl } = app;
  const clickHandler = internal ? noop : openApp(url);

  return (
    <div className={styles.appcard} role="button" tabIndex={0} onClick={clickHandler}>
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

AppCard.propTypes = {
  app: appShape.isRequired,
  openApp: func.isRequired,
  internal: bool.isRequired
};

export default AppCard;
