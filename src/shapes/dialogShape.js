import { string, func, oneOf, oneOfType, any, shape } from 'prop-types';

import { TYPE_ALERT, TYPE_CONFIRM } from '../values/dialogs';

const alertShape = shape({
  title: string,
  image: string,
  children: any.isRequired,
  confirmLabel: string,
  onConfirm: func
});

const confirmShape = shape({
  title: string,
  image: string,
  children: any.isRequired,
  confirmLabel: string,
  cancelLabel: string,
  onConfirm: func,
  onCancel: func
});

export default shape({
  type: oneOf([TYPE_ALERT, TYPE_CONFIRM]).isRequired,
  props: oneOfType([alertShape, confirmShape]).isRequired
});
