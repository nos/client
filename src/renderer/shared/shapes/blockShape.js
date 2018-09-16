import { string, number, shape, arrayOf, oneOf } from 'prop-types';

const TYPES = [
  'AgencyTransaction',
  'ClaimTransaction',
  'ContractTransaction',
  'EnrollmentTransaction',
  'InvocationTransaction',
  'IssueTransaction',
  'MinerTransaction',
  'PublishTransaction',
  'RegisterTransaction',
  'VotingTransaction'
];

const scriptShape = shape({
  invocation: string.isRequired,
  verification: string.isRequired
});

const attributeShape = shape({
  usage: string.isRequired,
  data: string.isRequired
});

const claimShape = shape({
  txid: string.isRequired,
  vout: number.isRequired
});

const vinShape = shape({
  txid: string.isRequired,
  vout: number.isRequired
});

const voutShape = shape({
  n: number.isRequired,
  address: string.isRequired,
  asset: string.isRequired,
  value: string.isRequired
});

const contractShape = shape({}); // TODO

const transactionShape = shape({
  txid: string.isRequired,
  type: oneOf(TYPES).isRequired,
  size: number.isRequired,
  version: number.isRequired,
  attributes: arrayOf(attributeShape).isRequired,
  vin: arrayOf(vinShape).isRequired,
  vout: arrayOf(voutShape).isRequired,
  sys_fee: string.isRequired,
  net_fee: string.isRequired,
  scripts: arrayOf(scriptShape).isRequired,

  // ContractTransaction
  nonce: number,

  // InvocationTransaction
  script: string,
  gas: string,

  // ClaimTransaction
  claims: arrayOf(claimShape),

  // PublishTransaction
  contract: contractShape
});

export default shape({
  hash: string.isRequired,
  size: number.isRequired,
  version: number.isRequired,
  previousblockhash: string,
  merkleroot: string.isRequired,
  time: number.isRequired,
  index: number.isRequired,
  nonce: string,
  nextconsensus: string.isRequired,
  script: scriptShape.isRequired,
  tx: arrayOf(transactionShape).isRequired,
  confirmations: number.isRequired
});
