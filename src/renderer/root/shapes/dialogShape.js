import { string, func, oneOf, oneOfType, node, shape } from 'prop-types';

import { TYPE_ALERT, TYPE_CONFIRM, TYPE_AUTH, TYPE_NEW_WALLET } from '../values/dialogs';

const alertShape = shape({
  title: string,
  image: string,
  children: node.isRequired,
  confirmLabel: string,
  onConfirm: func
});

const confirmShape = shape({
  title: string,
  image: string,
  children: node.isRequired,
  confirmLabel: string,
  cancelLabel: string,
  onConfirm: func,
  onCancel: func
});

const authShape = shape({
  children: node,
  onConfirm: func,
  onCancel: func
});

const newWalletShape = shape({
  title: string,
  onConfirm: func,
  onCancel: func
});

export default shape({
  type: oneOf([TYPE_ALERT, TYPE_CONFIRM, TYPE_AUTH, TYPE_NEW_WALLET]).isRequired,
  props: oneOfType([alertShape, confirmShape, authShape, newWalletShape]).isRequired
});
