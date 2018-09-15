import { withData } from 'spunky';

import blockActions from 'shared/actions/blockActions';

import GetLastBlock from './GetLastBlock';

const mapBlockDataToProps = (block) => ({ block });

export default function makeGetLastBlock() {
  return withData(blockActions, mapBlockDataToProps)(GetLastBlock);
}
