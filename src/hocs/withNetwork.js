import { connect } from 'react-redux';
import currentNetworkActions, { set_current_network, add_new_network } from '../actions/settings/currentNetworkActions';

export function withNetworkActions() {
  const mapDispatchToProps = (dispatch) => ({
    set_current_network: (...args) => dispatch(set_current_network(...args)),
    add_new_network: (...args) => dispatch(set_current_network(...args))
  });

  return connect(null, mapDispatchToProps);
}
