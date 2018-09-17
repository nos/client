import { string, shape } from 'prop-types';

export default shape({
  label: string.isRequired,
  value: string.isRequired
});
