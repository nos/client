import { shape, string } from 'prop-types';

export default shape({
  target: string.isRequired,
  title: string.isRequired
});
