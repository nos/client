const nodeRequire = require;

process.once('loaded', () => {
  // maintain a reference to node's require function since webpack defines its own
  global.nodeRequire = nodeRequire;
});
