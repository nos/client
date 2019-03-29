import React from 'react';
import { arrayOf, object, func, string } from 'prop-types';

import Loading from 'shared/components/Loading';
import TopBackground from 'shared/images/appstore/bg-shape-1.svg';

import CategoryTitle from '../CategoryTitle';
import AppButton from '../AppButton';

import styles from './AppStore.scss';

const AppStore = ({ __progress__, apps, categories, showErrorToast }) => {
  if (__progress__ === 'LOADING') {
    return (
      <div className={styles.appstore}>
        <Loading />
      </div>
    );
  }

  if (__progress__ === 'FAILED') {
    return showErrorToast('Loading is taking longer than expected. Please try again later.');
  }

  return (
    <div className={styles.appstore}>
      <div className={styles.top}><TopBackground /></div>
      {categories.map((cat) => (
        <React.Fragment key={cat}>
          <CategoryTitle key={cat}>{cat}</CategoryTitle>
          <div className={styles.grid}>
            {apps
              .filter((app) => app.category === cat)
              .map((app) => <AppButton key={app.title} app={app} />)
            }
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

AppStore.propTypes = {
  __progress__: string.isRequired,
  apps: arrayOf(object),
  categories: arrayOf(string),
  showErrorToast: func.isRequired
};

AppStore.defaultProps = {
  apps: {},
  categories: []
};

export default AppStore;
