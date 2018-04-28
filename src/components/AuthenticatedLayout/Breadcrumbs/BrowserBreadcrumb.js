import React from 'react';

import matchShape from '../../../shapes/matchShape';
import parseURL from '../../../util/parseURL';

export default function BrowserBreadcrumb({ match }) {
  const { hostname } = parseURL(decodeURIComponent(match.params.query));
  return <span>{hostname}</span>;
}

BrowserBreadcrumb.propTypes = {
  match: matchShape.isRequired
};
