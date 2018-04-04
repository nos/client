import { withCall, withNullLoader } from 'spunky';
import { compose } from 'recompose';

import GetStorage from './GetStorage';
import storageActions from '../../../actions/storageActions';

export default compose(
  withCall(storageActions, (params) => ({ net: 'TestNet', ...params })),
  withNullLoader(storageActions)
)(GetStorage);
