import { connect } from 'react-redux';

import { showErrorToast } from 'shared/actions/toastsActions';

export default function withErrorToast(propName = 'showToast') {
  const mapDispatchToProps = (dispatch) => ({
    [propName]: (message) => dispatch(showErrorToast({ message }))
  });

  return connect(null, mapDispatchToProps);
}
