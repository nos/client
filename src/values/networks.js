import { settings } from '@cityofzion/neon-js';
import { keys } from 'lodash';

export const NOS_LOCAL = 'nOSLocal';

export const PREDEFINED_NETWORKS = keys(settings.networks).concat([NOS_LOCAL]);
