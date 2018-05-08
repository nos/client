import React from 'react';
import { NavLink } from 'react-router-dom';
import { object, arrayOf } from 'prop-types';

import styles from './Breadcrumbs.scss';

export default class Breadcrumbs extends React.Component {
  static propTypes = {
    breadcrumbs: arrayOf(object).isRequired
  };

  render() {
    return (
      <ul className={styles.breadcrumbs}>
        {this.props.breadcrumbs.map(this.renderBreadcrumb)}
      </ul>
    );
  }

  renderBreadcrumb = (breadcrumb) => {
    return (
      <li key={breadcrumb.key} className={styles.breadcrumb}>
        <NavLink to={breadcrumb.props.match.url}>
          {breadcrumb}
        </NavLink>
      </li>
    );
  }
}
