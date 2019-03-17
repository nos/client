import { compose, mapProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withProgress, progressValues } from 'spunky';
import { omit } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withAuth from 'shared/hocs/withAuth';

import authActions from 'auth/actions/authActions';

import { openTab } from 'browser/actions/browserActions';

import PrivateTabLink from './PrivateTabLink';

const { LOADED } = progressValues;

const mapStateToProps = (state, props) => {
  const { tabs, activeSessionId } = state.browser;
  const active = props.target === tabs[activeSessionId].target;
  return { active };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ openTab }, dispatch);

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProgress(authActions),
  withAuth(),
  mapProps((props) => ({ ...omit(props, 'progress'), authenticated: props.progress === LOADED }))
)(PrivateTabLink);
