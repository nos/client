import { string, func, node, shape } from 'prop-types';

export default shape({
  title: string,
  image: string,
  children: node,
  confirmLabel: string,
  onConfirm: func
});
