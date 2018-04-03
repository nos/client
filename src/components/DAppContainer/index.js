import { compose } from 'recompose';
import { withData } from 'spunky';
import DAppContainer from './DAppContainer';

import nameServiceActions from '../../actions/nameServiceActions';

const mapNameServiceDataToProps = (data) => ({
  src: (data && data.target) || 'dapp.html'
});

export default compose(withData(nameServiceActions, mapNameServiceDataToProps))(DAppContainer);
