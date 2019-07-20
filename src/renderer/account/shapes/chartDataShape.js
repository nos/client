import { number, string, arrayOf, shape } from 'prop-types';

export default arrayOf(
  shape({
    label: string.isRequired,
    value: number.isRequired
  })
);
