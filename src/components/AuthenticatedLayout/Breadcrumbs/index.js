import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import Breadcrumbs from './Breadcrumbs';
import BrowserBreadcrumb from './BrowserBreadcrumb';

const routes = [
  { path: '/browser/:query+', breadcrumb: BrowserBreadcrumb }
];

export default withBreadcrumbs(routes, { excludePaths: ['/'] })(Breadcrumbs);
