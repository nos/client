import { connect } from 'react-redux';

import { alert } from 'actions/dialogsActions';

export default function withAlert(propName = 'alert') {
  const mapDispatchToProps = (dispatch) => ({
    [propName]: (...args) => dispatch(alert(...args))
  });

  return connect(null, mapDispatchToProps);
}
