import _ from 'lodash';

const getNode = ([object, type, name, value, value1, value2, children]) => {
  const billetNode1 = object;
  billetNode1.type = type;
  billetNode1.name = name;
  billetNode1.value = value;
  billetNode1.value1 = value1;
  billetNode1.value2 = value2;
  billetNode1.children = children;
  const keysValues = Object.entries(billetNode1);
  const billetNode2 = keysValues.filter((item) => !item.includes(undefined));
  const keys = billetNode2.map((key) => key[0]);
  const values = billetNode2.map((meaning) => meaning[1]);
  const treeNode = _.zipObject(keys, values);
  return treeNode;
};

const getTree = (parcer) => {
  if (parcer === null) return null;
  const object1 = parcer[0];
  const object2 = parcer[1];
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const common = _.uniq([...keys1, ...keys2]).sort();
  const tree = common.flatMap((key) => {
    const node = {};
    const object1Key = Object.prototype.hasOwnProperty.call(object1, key);
    const object2Key = Object.prototype.hasOwnProperty.call(object2, key);
    if ((object1Key === object2Key) && (object1[key] === object2[key])) {
      return getNode([node, 'equal', key, object1[key], undefined, undefined, undefined]);
    }
    if ((object1Key && !object2Key)) {
      return getNode([node, 'removed', key, object1[key], undefined, undefined, undefined]);
    }
    if (!object1Key && object2Key) {
      return getNode([node, 'added', key, object2[key], undefined, undefined, undefined]);
    }
    if (object1Key === object2Key && _.isObject(object1[key]) && _.isObject(object2[key])) {
      return getNode([node, 'nested', key, undefined, undefined, undefined, getTree([object1[key], object2[key]])]);
    }
    if (object1Key === object2Key && object1[key] !== object2[key]) {
      return getNode([node, 'changed', key, undefined, object1[key], object2[key], undefined]);
    }
    return null;
  }).filter((item) => item !== null);
  return tree;
};

export default getTree;