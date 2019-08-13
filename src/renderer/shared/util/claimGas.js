import BigNumber from 'bignumber.js';
import { api, wallet } from '@cityofzion/neon-js';
import { map, reduce } from 'lodash';

import getRPCEndpoint from 'util/getRPCEndpoint';

import poll from './poll';

const POLL_ATTEMPTS = 30;
const POLL_FREQUENCY = 10000;

async function fetchBalance({ net, address }) {
  const response = await api.getBalanceFrom({ net, address }, api.neoscan);
  const { NEO } = response.balance.assets;
  return NEO ? NEO.balance : new BigNumber(0);
}

async function fetchClaims({ net, address }) {
  const response = await api.getClaimsFrom({ net, address }, api.neoscan);
  const { claims } = response.claims;
  return map(claims, 'claim');
}

function calculateClaimableAmount(claims) {
  return reduce(claims, (sum, claim) => claim.plus(sum), 0).toString();
}

async function getClaimableAmount({ net, address }) {
  const claims = await fetchClaims({ net, address });
  return calculateClaimableAmount(claims);
}

async function updateClaimableAmount({
  net,
  balance,
  address,
  publicKey,
  privateKey,
  signingFunction
}) {
  const url = await getRPCEndpoint(net);

  const {
    response: { result }
  } = await api.sendAsset(
    {
      net,
      url,
      address,
      publicKey,
      privateKey,
      signingFunction,
      intents: api.makeIntent({ NEO: balance }, address)
    },
    api.neoscan
  );

  if (!result) {
    throw new Error('Transaction rejected by blockchain');
  }

  return result.response;
}

async function pollForUpdatedClaimableAmount({ net, address, claimableAmount }) {
  return poll(
    async () => {
      const updatedClaimableAmount = await getClaimableAmount({ net, address });

      if (new BigNumber(updatedClaimableAmount).eq(claimableAmount)) {
        throw new Error('Waiting for updated claims took too long');
      }

      return updatedClaimableAmount;
    },
    { attempts: POLL_ATTEMPTS, frequency: POLL_FREQUENCY }
  );
}

async function getUpdatedClaimableAmount({
  net,
  balance,
  address,
  publicKey,
  privateKey,
  signingFunction
}) {
  const claimableAmount = await getClaimableAmount({ net, address });

  if (balance.eq(0)) {
    return claimableAmount;
  } else {
    await updateClaimableAmount({ net, balance, address, publicKey, privateKey, signingFunction });
    return pollForUpdatedClaimableAmount({ net, address, claimableAmount });
  }
}

export default async function claimGas({ net, address, wif, publicKey, signingFunction }) {
  const privateKey = wif && new wallet.Account(wif).privateKey;

  const balance = await fetchBalance({ net, address });

  // update available claims
  await getUpdatedClaimableAmount({
    net,
    balance,
    address,
    publicKey,
    privateKey,
    signingFunction
  });

  // fetch claims
  const { claims } = await api.getClaimsFrom({ net, address }, api.neoscan);

  // limit number of claims for ledger devices due to memory constraints
  const claimableClaims = publicKey ? claims.slice(0, 25) : claims;

  // send claim request
  const {
    response: { result, txid }
  } = await api.claimGas(
    {
      net,
      address,
      publicKey,
      privateKey,
      signingFunction,
      claims: claimableClaims
    },
    api.neoscan
  );

  if (!result) {
    throw new Error('Transaction rejected by blockchain');
  }

  return txid;
}
