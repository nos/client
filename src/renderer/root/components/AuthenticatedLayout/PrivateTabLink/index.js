import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withProgress } from 'spunky';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withAuth from 'shared/hocs/withAuth';

import authActions from 'auth/actions/authActions';

import { openTab } from 'browser/actions/browserActions';
import withAuthState from 'auth/hocs/withAuthState';

import PrivateTabLink from './PrivateTabLink';

const mapStateToProps = (state, props) => {
  const { tabs, activeSessionId } = state.browser;
  const active = props.target === tabs[activeSessionId].target;
  return { active };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ openTab }, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withProgress(authActions),
  withAuth(),
  withAuthState()
)(PrivateTabLink);
