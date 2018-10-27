import { compose, branch, lifecycle } from 'recompose';
import { withData } from 'spunky';

import authActions from 'login/actions/authActions';

import { withInfoToast } from 'shared/hocs/withToast';

const mapAuthDataToProps = ({ signingFunction }) => ({
  requiresSignature: !!signingFunction
});

const withSignTransactionToast = compose(
  withInfoToast(),
  lifecycle({
    componentDidMount() {
      this.props.showInfoToast('Please sign the transaction on your Ledger.');
    }
  })
);

export default compose(
  withData(authActions, mapAuthDataToProps),
  branch((props) => !!props.requiresSignature, withSignTransactionToast)
);
