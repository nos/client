import { createActions } from 'spunky';

export const ID = 'query';

export default createActions(ID, ({ query }) => async () => query);
