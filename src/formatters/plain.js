import _ from 'lodash';

const makeValue = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      if (value === null) return null;
      return '[complex value]';
    case 'boolean':
    case 'number':
      return value;
    default:
      throw new Error(`Unknown order state: '${value}'!`);
  }
};

const plain = (tree) => {
  const property = 'Property \'';
  const getMergeInfo = (prop, workpiece) => {
    const billet = workpiece.map((obj) => {
      switch (obj.type) {
        case 'added':
          return `${prop}${obj.name}' was added with value: ${makeValue(obj.value)}`;
        case 'removed':
          return `${prop}${obj.name}' was removed`;
        case 'changed':
          return `${prop}${obj.name}' was updated. From ${makeValue(obj.value1)} to ${makeValue(obj.value2)}`;
        case 'nested': {
          const keyStrArr = [].concat([obj.name]);
          return `${getMergeInfo(`${prop}${keyStrArr}.`, obj.children)}`;
        }
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown order state: '${obj.type}'!`);
      }
    });
    const result = _.compact(billet);
    return `${result.join('\n')}`;
  };
  return getMergeInfo(property, tree);
};

export default plain;
