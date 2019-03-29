import React from 'react';
import { arrayOf, object, string } from 'prop-types';

import TopBackground from 'shared/images/appstore/bg-shape-1.svg';

import CategoryTitle from '../CategoryTitle';
import AppButton from '../AppButton';

import styles from './AppStore.scss';

const AppStore = ({ apps, categories }) => (
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

AppStore.propTypes = {
  apps: arrayOf(object),
  categories: arrayOf(string)
};

AppStore.defaultProps = {
  apps: {},
  categories: []
};

export default AppStore;
