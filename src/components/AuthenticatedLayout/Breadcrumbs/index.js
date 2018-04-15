import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import Breadcrumbs from './Breadcrumbs';
import BrowserBreadcrumb from './BrowserBreadcrumb';

export default withBreadcrumbs([
  { path: '/browser/:query+', breadcrumb: BrowserBreadcrumb }
])(Breadcrumbs);
