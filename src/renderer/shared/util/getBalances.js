import { get, find, map, mapValues, chunk, filter, extend } from 'lodash';
import { u, sc, rpc, wallet } from '@cityofzion/neon-js';

import getRPCEndpoint from 'util/getRPCEndpoint';

import getTokens from './getTokens';
import { GAS, NEO, ASSETS } from '../values/assets';

const CHUNK_SIZE = 18;

function parseHexNum(hex) {
  return hex ? parseInt(u.reverseHex(hex), 16) : 0;
}

function getRawTokenBalances(url, tokens, address) {
  const addrScriptHash = u.reverseHex(wallet.getScriptHashFromAddress(address));
  const sb = new sc.ScriptBuilder();

  tokens.forEach(({ scriptHash }) => {
    sb.emitAppCall(scriptHash, 'balanceOf', [addrScriptHash]);
  });

  return rpc.Query.invokeScript(sb.str, false)
    .execute(url)
    .then((res) => {
      const tokenList = {};

      if (res && res.result && res.result.stack && res.result.stack.length >= 1) {
        for (let i = 0; i < res.result.stack.length; i += 1) {
          const { scriptHash, decimals } = tokens[i];
          const value = parseHexNum(res.result.stack[i].value);
          tokenList[scriptHash] = new u.Fixed8(value).div(10 ** decimals).toString();
        }
      }
      return tokenList;
    });
}

async function getTokenBalances(endpoint, address) {
  const tokens = await getTokens();
  const chunks = chunk(map(tokens, 'scriptHash'), CHUNK_SIZE);

  const balances = extend({}, ...await Promise.all(chunks.map((scriptHashes) => {
    const filteredTokens = filter(tokens, (token) => scriptHashes.includes(token.scriptHash));
    return getRawTokenBalances(endpoint, filteredTokens, address);
  })));

  return mapValues(balances, (balance, scriptHash) => ({
    ...find(tokens, { scriptHash }),
    balance
  }));
}

async function getAssetBalances(endpoint, address) {
  const client = new rpc.RPCClient(endpoint);
  const { balances } = await client.getAccountState(address);

  const neoBalance = get(find(balances, { asset: `0x${NEO}` }), 'value', '0');
  const gasBalance = get(find(balances, { asset: `0x${GAS}` }), 'value', '0');

  return {
    [NEO]: { ...ASSETS[NEO], scriptHash: NEO, balance: neoBalance },
    [GAS]: { ...ASSETS[GAS], scriptHash: GAS, balance: gasBalance }
  };
}

export default async function getBalances({ net, address }) {
  const endpoint = await getRPCEndpoint(net);

  if (!wallet.isAddress(address)) {
    throw new Error(`Invalid address: "${address}"`);
  }

  const assets = await getAssetBalances(endpoint, address);
  const tokens = await getTokenBalances(endpoint, address);

  return { ...assets, ...tokens };
}
