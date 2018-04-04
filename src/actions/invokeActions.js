import Neon, {api} from '@cityofzion/neon-js';
import {createActions} from 'spunky';

export const ID = 'testinvoke';

export const testInvoke = async (net, {scriptHash, operation, args}) => {

  console.log(net);
  console.log(scriptHash);
  console.log(operation);
  console.log(args);

  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, {net});

  // Create script
  const script = Neon.create.script(scriptHash); // TODO scriptHash --> invoke

  const response = await Neon.rpc.Query.invokeScript(script).execute(endpoint);
  console.log(response.result);

  return {
    response: 'test'
  };
};


export default createActions(ID, ({net, scriptHash, operation, args}) => async () => {
  return testInvoke(net, {scriptHash, operation, args});
});
