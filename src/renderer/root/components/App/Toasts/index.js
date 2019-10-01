import { connect } from 'react-redux';

import { hideToast } from 'shared/actions/toastsActions';

import Toasts from './Toasts';

const mapStateToProps = (state) => ({
  toasts: state.toasts
});

const mapDispatchToProps = (dispatch) => ({
  hide: (id) => dispatch(hideToast(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toasts);
