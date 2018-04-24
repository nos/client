import { ADD_NEW_NETWORK, SET_CURRENT_NETWORK } from '../actions/settings/currentNetworkActions';

const initialState = {
  currentNetwork: {name: 'MainNet', neoscan: 'MainNet'},
  networks:[
    {name: 'MainNet', neoscan: 'MainNet'},
    {name: 'TestNet', neoscan: 'TestNet'},
    {name: 'CozNet', neoscan: 'CozNet'},
    {name: 'nOS Local', neoscan: 'nOSLocal'},
  ]
};

function enqueue(queue, network) {
  return [...queue, network];
}

export default function currentNetworkReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_NETWORK:
      return {...state, ...{currentNetwork: action.network}};
    case ADD_NEW_NETWORK:
      return {...state, ...{networks: enqueue(state.networks, action.network)}};
    default:
      return state;
  }
}
