import { compose } from 'recompose';
import { withData, withError } from 'spunky';

import blockActions from 'shared/actions/blockActions';

import StatusIcon from './StatusIcon';

const mapBlockDataToProps = (block) => ({ block });
const mapBlockErrorToProps = (error) => ({ error });

export default compose(
  withData(blockActions, mapBlockDataToProps),
  withError(blockActions, mapBlockErrorToProps)
)(StatusIcon);
