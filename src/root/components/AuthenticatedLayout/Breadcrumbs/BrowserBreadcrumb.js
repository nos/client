import React from 'react';

import matchShape from '../../../../browser/shapes/matchShape';
import parseURL from '../../../../browser/util/parseURL';

export default function BrowserBreadcrumb({ match }) {
  const { hostname } = parseURL(decodeURIComponent(match.params.query));
  return <span>{hostname}</span>;
}

BrowserBreadcrumb.propTypes = {
  match: matchShape.isRequired
};
