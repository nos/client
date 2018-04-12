import { connect } from 'react-redux';

import AlertPresenter from './AlertPresenter';
import { close } from '../../../actions/alertsActions';

const mapStateToProps = (state) => ({
  alert: state.alerts[0]
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(close())
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertPresenter);
