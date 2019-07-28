import React from 'react';
import { node } from 'prop-types';

import styles from './CategoryTitle.scss';

const CategoryTitle = ({ children }) => <h2 className={styles.categoryTitle}>{children}</h2>;

CategoryTitle.propTypes = {
  children: node.isRequired
};

export default CategoryTitle;
