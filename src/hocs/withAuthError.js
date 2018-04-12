import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { progressValues } from 'spunky';

import withAuthChange from './withAuthChange';

const { FAILED } = progressValues;

const mapDispatchToProps = (dispatch) => bindActionCreators({ alert }, dispatch);

export default compose(
  connect(null, mapDispatchToProps),
  withAuthChange(FAILED, ({ alert }) => alert('Authentication failed.'))
);
