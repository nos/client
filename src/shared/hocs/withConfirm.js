import { connect } from 'react-redux';

import { confirm } from '../actions/dialogsActions';

export default function withConfirm(propName = 'confirm') {
  const mapDispatchToProps = (dispatch) => ({
    [propName]: (...args) => dispatch(confirm(...args))
  });

  return connect(null, mapDispatchToProps);
}
