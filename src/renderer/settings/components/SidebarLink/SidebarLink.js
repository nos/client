import React from 'react';
import { Link } from 'react-scroll';

import styles from './SidebarLink.scss';

export default function SidebarLink(props) {
  return (
    <Link
      className={styles.sidebarLink}
      activeClass={styles.active}
      spy
      smooth
      duration={250}
      {...props}
    />
  );
}
