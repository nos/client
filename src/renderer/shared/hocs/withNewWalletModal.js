import { connect } from 'react-redux';

import { newWallet } from 'root/actions/dialogsActions';

export default function withAuth(propName = 'newWallet') {
  const mapDispatchToProps = (dispatch) => ({
    [propName]: (...args) => dispatch(newWallet(...args))
  });

  return connect(
    null,
    mapDispatchToProps
  );
}
