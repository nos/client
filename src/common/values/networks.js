import { settings } from '@cityofzion/neon-js';
import { keys } from 'lodash';

export const NOS_TESTNET = 'nOSNet';
export const NOS_LOCAL = 'nOSLocal';
export const ARK_RELAY = 'ARKRelay';

export const PREDEFINED_NETWORKS = keys(settings.networks).concat([NOS_TESTNET, NOS_LOCAL]);

export const MAIN_NET = 'MainNet';
export const TEST_NET = 'TestNet';

export const DEFAULT_NET = MAIN_NET;

export const ARK_NETWORKS = {
  [MAIN_NET]: 'https://api.ark.io/api/v2',
  [TEST_NET]: 'https://dexplorer.ark.io:8443/api/v2'
};
