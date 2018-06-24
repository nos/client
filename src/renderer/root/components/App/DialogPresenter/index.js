import { connect } from 'react-redux';

import { close } from 'actions/dialogsActions';

import DialogPresenter from './DialogPresenter';

const mapStateToProps = (state) => ({
  dialog: state.dialogs[0]
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(close())
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogPresenter);
