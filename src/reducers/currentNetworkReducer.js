import { ADD_NEW_NETWORK, SET_CURRENT_NETWORK } from '../actions/settings/currentNetworkActions';

const initialState = {
  currentNetwork: {name: 'MainNet', neoscan: 'MainNet'},
  networks:[
    {name: 'MainNet', neoscan: 'MainNet'},
    {name: 'default name', neoscan: 'default neoscan'},
    {name: 'default name2', neoscan: 'default neoscan2'},
    {name: 'default name3', neoscan: 'default neoscan3'},
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
