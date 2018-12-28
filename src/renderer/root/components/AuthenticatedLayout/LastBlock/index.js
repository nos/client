import { compose } from 'recompose';
import { withData, withError } from 'spunky';

import blockActions from 'shared/actions/blockActions';
import withNetworkData from 'shared/hocs/withNetworkData';

import LastBlock from './LastBlock';

const mapBlockDataToProps = (block) => ({ block });
const mapBlockErrorToProps = (error) => ({ error });

export default compose(
  withNetworkData('currentNetwork'),
  withData(blockActions, mapBlockDataToProps),
  withError(blockActions, mapBlockErrorToProps)
)(LastBlock);
