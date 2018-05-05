import { connect } from 'react-redux';

import DialogPresenter from './DialogPresenter';
import { close } from '../../../shared/actions/dialogsActions';

const mapStateToProps = (state) => ({
  dialog: state.dialogs[0]
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(close())
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogPresenter);
