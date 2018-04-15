import { trim } from 'lodash';

export default function parseQuery(query) {
  const trimmedQuery = trim(query);
  const formattedQuery = trimmedQuery.includes('://') ? trimmedQuery : `nos://${trimmedQuery}`;
  return new URL(formattedQuery);
}
