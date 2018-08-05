import { connect } from 'react-redux';

import { showSuccessToast } from 'shared/actions/toastsActions';

export default function withSuccessToast(propName = 'showToast') {
  const mapDispatchToProps = (dispatch) => ({
    [propName]: (message) => dispatch(showSuccessToast({ message }))
  });

  return connect(null, mapDispatchToProps);
}
