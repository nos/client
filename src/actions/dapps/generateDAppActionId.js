export const PREFIX = 'sessions';

export default function generateDAppActionId(...args) {
  return [PREFIX, ...args].join('.');
}
