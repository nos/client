import { string, func, oneOf, node, shape } from 'prop-types';

import { TYPE_ALERT, TYPE_CONFIRM } from '../values/dialogs';

const alertShape = shape({
  title: string,
  image: string,
  children: node,
  confirmLabel: string,
  onConfirm: func
});

const confirmShape = shape({
  title: string,
  image: string,
  children: node,
  confirmLabel: string,
  cancelLabel: string,
  onConfirm: func,
  onCancel: func
});

export default shape({
  type: oneOf([TYPE_ALERT, TYPE_CONFIRM]).isRequired,
  props: oneOf([alertShape, confirmShape]).isRequired
});
