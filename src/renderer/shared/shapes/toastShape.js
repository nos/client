import { bool, number, string, oneOf, oneOfType, shape } from 'prop-types';

import { TYPE_SUCCESS, TYPE_ERROR, TYPE_INFO } from 'shared/actions/toastsActions';

export default shape({
  id: string.isRequired,
  type: oneOf([TYPE_SUCCESS, TYPE_ERROR, TYPE_INFO]).isRequired,
  message: string.isRequired,
  autoDismiss: oneOfType([number, bool]).isRequired
});
