import { string, objectOf, shape } from 'prop-types';

export default shape({
  params: objectOf(string).isRequired
});
