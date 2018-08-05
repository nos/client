import { connect } from 'react-redux';

import { showInfoToast } from 'shared/actions/toastsActions';

export default function withInfoToast(propName = 'showToast') {
  const mapDispatchToProps = (dispatch) => ({
    [propName]: (message) => dispatch(showInfoToast({ message }))
  });

  return connect(null, mapDispatchToProps);
}
