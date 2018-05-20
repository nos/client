import { QUERY } from '../actions/browserActions';
import parseURL from '../util/parseURL';

const initialState = {
  target: 'nos://nos.neo'
};

function parse(query) {
  try {
    const { href } = parseURL(query);
    return href;
  } catch (err) {
    return query;
  }
}

export default function browserReducer(state = initialState, action) {
  switch (action.type) {
    case QUERY:
      return { ...state, target: parse(action.query) };
    default:
      return state;
  }
}
