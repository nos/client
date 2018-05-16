import { string, any, arrayOf, shape } from 'prop-types';

export default shape({
  id: string.isRequired,
  channel: string.isRequired,
  args: arrayOf(any).isRequired
});
