import {DataFlowNode} from './compile/data/dataflow';
// import {compile} from './compile/compile';
export function debugTree(roots: DataFlowNode[]) {
  // tslint:disable-next-line
  var counter = 0;
  // tslint:disable-next-line
  var vlTree = {};

  function debug(node: DataFlowNode) {
    const nodeID = giveID(node);
    if (vlTree[nodeID] === undefined) {
      const trimmedNode = helper(node);
      // @ts-ignore
      vlTree[trimmedNode.id] = trimmedNode;
    }
    node.children.forEach(debug);
  }

  function giveID(node: DataFlowNode) {
    // @ts-ignore
    if (!node) {
      return undefined;
    }
    // @ts-ignore
    if (node.id === undefined) {
      // @ts-ignore
      node.id = counter++;
    }
    // @ts-ignore
    return node.id;
  }

  function helper(node: DataFlowNode) {
    const trimmedNode = {...node};
    // @ts-ignore
    trimmedNode._children = node._children.map(x => giveID(x));
    // @ts-ignore
    trimmedNode._parent = giveID(node.parent);
    // console.log(trimmedNode);
    // @ts-ignore
    trimmedNode.nodetype = node.constructor.name;
    // @ts-ignore
    delete trimmedNode.model;
    // @ts-ignore
    delete trimmedNode.childModel;

    return trimmedNode;
  }

  roots.forEach(debug);
  // const util = require('util');
  // console.dir(util.inspect(vlTree, {depth: null}));
  // console.log(vlTree);
  return vlTree;
}
