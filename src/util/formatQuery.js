import { trim } from 'lodash';

export default function formatQuery(query) {
  const trimmedQuery = trim(query);
  const formattedQuery = trimmedQuery.includes('://') ? trimmedQuery : `nos://${trimmedQuery}`;
  return new URL(formattedQuery);
}
