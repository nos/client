import { settings } from '@cityofzion/neon-js';
import { keys } from 'lodash';

export const NOS_TESTNET = 'nOSNet';
export const NOS_LOCAL = 'nOSLocal';
export const ARK_RELAY = 'ARKRelay';

export const PREDEFINED_NETWORKS = keys(settings.networks).concat([NOS_TESTNET, NOS_LOCAL]);

export const DEFAULT_NET = 'MainNet';
