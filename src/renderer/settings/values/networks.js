import { settings } from '@cityofzion/neon-js';
import { keys } from 'lodash';

export const DEFAULT_NET = 'nOSNet';

export const NOS_TESTNET = 'nOSNet';
export const NOS_LOCAL = 'nOSLocal';

export const PREDEFINED_NETWORKS = keys(settings.networks).concat([NOS_TESTNET, NOS_LOCAL]);
