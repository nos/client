import { string, number, shape } from 'prop-types';

export default shape({
  scriptHash: string.isRequired,
  operation: string.isRequired,
  args: Array.isRequired
});
