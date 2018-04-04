import { withCall, withData } from 'spunky';
import { compose } from 'recompose';

import GetStorage from './GetStorage';
import storageActions from '../../../actions/storageActions';
import withNullLoader from '../../../hocs/dapps/withNullLoader';

const mapStorageDataToProps = (response) => ({ response });

export default compose(
  withCall(storageActions, ({params}) => ({ net: 'TestNet', ...params })),
  withNullLoader(storageActions),
  withData(storageActions, mapStorageDataToProps)
)(GetStorage);
