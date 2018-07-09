import { string, shape } from 'prop-types';

export default shape({
  type: string.isRequired,
  value: string.isRequired
});
