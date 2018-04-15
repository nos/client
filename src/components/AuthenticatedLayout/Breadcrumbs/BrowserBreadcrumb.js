import React from 'react';

import matchShape from '../../../shapes/matchShape';
import formatQuery from '../../../util/formatQuery';

export default function BrowserBreadcrumb({ match }) {
  const { hostname } = formatQuery(decodeURIComponent(match.params.query));
  return <span>{hostname}</span>;
}

BrowserBreadcrumb.propTypes = {
  match: matchShape.isRequired
};
