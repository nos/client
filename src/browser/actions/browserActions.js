export const QUERY = 'QUERY';

export const query = (sessionId, queryString) => ({ type: QUERY, sessionId, query: queryString });
