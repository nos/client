import { withState } from 'recompose';

import AccountDetails from './AccountDetails';

export default withState('label', 'setLabel', ({ account }) => account.address)(AccountDetails);
