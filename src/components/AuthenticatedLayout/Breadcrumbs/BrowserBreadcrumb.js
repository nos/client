import React from 'react';

import matchShape from '../../../shapes/matchShape';
import parseQuery from '../../../util/parseQuery';

export default function BrowserBreadcrumb({ match }) {
  const { hostname } = parseQuery(decodeURIComponent(match.params.query));
  return <span>{hostname}</span>;
}

BrowserBreadcrumb.propTypes = {
  match: matchShape.isRequired
};
