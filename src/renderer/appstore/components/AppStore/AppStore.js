import React from 'react';
import { arrayOf, object, string } from 'prop-types';

import TopBackground from 'shared/images/appstore/bg-shape-1.svg';
import { ACCOUNT } from 'browser/values/browserValues';
import PrivateTabLink from 'root/components/AuthenticatedLayout/PrivateTabLink';

import CategoryTitle from '../CategoryTitle';
import AppCard from '../AppCard';

import styles from './AppStore.scss';

const AppStore = ({ apps, categories }) => (
  <div className={styles.appstore}>
    <div className={styles.top}>
      <TopBackground />
    </div>
    {categories.map((cat) => (
      <React.Fragment key={cat}>
        <CategoryTitle key={cat}>{cat}</CategoryTitle>
        <div className={styles.grid}>
          {apps
            .filter((app) => app.category === cat)
            .map((app) => {
              // TODO loop through all possible internal pages
              if (app.url === ACCOUNT) {
                return (
                  <PrivateTabLink id={app.title} target={app.url}>
                    <AppCard key={app.title} internal app={app} />
                  </PrivateTabLink>
                );
              } else {
                return <AppCard key={app.title} app={app} />;
              }
            })}
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
  apps: [],
  categories: []
};

export default AppStore;
