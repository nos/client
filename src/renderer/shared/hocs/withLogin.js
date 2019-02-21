import { connect } from 'react-redux';

import { login } from 'root/actions/dialogsActions';

export default function withLogin(propName = 'login') {
  const mapDispatchToProps = (dispatch) => ({
    [propName]: (...args) => dispatch(login(...args))
  });

  return connect(
    null,
    mapDispatchToProps
  );
}
