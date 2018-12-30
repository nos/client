import { arrayOf, number, shape } from 'prop-types';

import transactionShape from './transactionShape';

export default shape({
  entries: arrayOf(transactionShape),
  page_number: number.isRequired,
  page_size: number.isRequired,
  total_entries: number.isRequired,
  total_pages: number.isRequired
});
