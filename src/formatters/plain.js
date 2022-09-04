import _ from 'lodash';

const plain = (tree) => {
  if (tree === null) {
    return `📣 Error, it is working with .json, .yml (.yaml) formats only!
    Also, both of files must to have same format.`;
  }
  const property = 'Property \'';
  const getMergeInfo = (prop, workpiece) => {
    const billet = workpiece.map((obj) => {
      switch (obj.type) {
        case 'added':
          if (typeof obj.value === 'string') return `${prop}${obj.name}' was added with value: '${obj.value}'`;
          if (typeof obj.value !== 'string'
          && !_.isObject(obj.value)) return `${prop}${obj.name}' was added with value: ${obj.value}`;
          return `${prop}${obj.name}' was added with value: [complex value]`;
        case 'removed':
          return `${prop}${obj.name}' was removed`;
        case 'changed':
          if (_.isObject(obj.value1)
          && typeof obj.value2 === 'string') return `${prop}${obj.name}' was updated. From [complex value] to '${obj.value2}'`;
          if (_.isObject(obj.value2)
          && typeof obj.value1 === 'string') return `${prop}${obj.name}' was updated. From '${obj.value1}' to [complex value]`;
          if (_.isObject(obj.value1)) return `${prop}${obj.name}' was updated. From [complex value] to ${obj.value2}`;
          if (_.isObject(obj.value2)) return `${prop}${obj.name}' was updated. From ${obj.value1} to [complex value]`;
          if (typeof obj.value1 === 'string'
          && typeof obj.value2 === 'string') return `${prop}${obj.name}' was updated. From '${obj.value1}' to '${obj.value2}'`;
          if (typeof obj.value1 !== 'string'
          && typeof obj.value2 === 'string') return `${prop}${obj.name}' was updated. From ${obj.value1} to '${obj.value2}'`;
          if (typeof obj.value1 === 'string'
          && typeof obj.value2 !== 'string') return `${prop}${obj.name}' was updated. From '${obj.value1}' to ${obj.value2}`;
          return `${prop}${obj.name}' was updated. From ${obj.value1} to ${obj.value2}`;
        case 'nested': {
          const keyStrArr = [];
          keyStrArr.push(obj.name);
          return `${getMergeInfo(`${prop}${keyStrArr}.`, obj.children)}`;
        }
        case 'equal':
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
