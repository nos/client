export const PREFIX = 'sessions';

export default function generateDAppActionId(sessionId, actionId) {
  return `${PREFIX}.${sessionId}.${actionId}`;
}
