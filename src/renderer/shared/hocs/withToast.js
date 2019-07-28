import { connect } from 'react-redux';

import { showToast, TYPE_SUCCESS, TYPE_ERROR, TYPE_INFO } from 'shared/actions/toastsActions';

function withToast({ type, propName = 'showToast', ...options } = {}) {
  const mapDispatchToProps = (dispatch) => ({
    [propName]: (message) => dispatch(showToast({ message, type, ...options }))
  });

  return connect(
    null,
    mapDispatchToProps
  );
}

export function withSuccessToast({ propName = 'showSuccessToast', ...options } = {}) {
  return withToast({ ...options, propName, type: TYPE_SUCCESS });
}

export function withErrorToast({
  propName = 'showErrorToast',
  autoDismiss = false,
  ...options
} = {}) {
  return withToast({ ...options, propName, type: TYPE_ERROR, autoDismiss });
}

export function withInfoToast({ propName = 'showInfoToast', ...options } = {}) {
  return withToast({ ...options, propName, type: TYPE_INFO });
}

export default withToast;
