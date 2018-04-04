import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withActions, withData } from 'spunky';
import AddressBar from './AddressBar';

import nameServiceActions from '../../actions/nameServiceActions';

const mapNameServiceActionsToProps = (actions) => ({
  doQuery: (params) => actions.call(params)
});

const mapNameServiceDataToProps = (data) => ({
  target: data && data.target
});

export default compose(
  withActions(nameServiceActions, mapNameServiceActionsToProps),
  withData(nameServiceActions, mapNameServiceDataToProps),
  withRouter
)(AddressBar);
