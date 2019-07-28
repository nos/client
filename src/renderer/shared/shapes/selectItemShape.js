import { string, number, shape, oneOfType } from 'prop-types';

export default shape({
  label: string.isRequired,
  value: oneOfType([number, string]).isRequired
});
