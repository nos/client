import { connect } from 'react-redux';

import { auth } from 'root/actions/dialogsActions';

export default function withAuth(propName = 'auth') {
  const mapDispatchToProps = (dispatch) => ({
    [propName]: (...args) => dispatch(auth(...args))
  });

  return connect(
    null,
    mapDispatchToProps
  );
}
