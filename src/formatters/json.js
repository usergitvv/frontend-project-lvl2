import _ from 'lodash';

const ripObjectForKeys = (sign, workpiece) => {
  const keysValues = Object.entries(workpiece);
  const keys = keysValues.flatMap((arr) => {
    if (typeof arr[1] === 'string') return `${sign}${arr[0]}`;
    if (_.isObject(arr[1])) return ripObjectForKeys(sign, arr[1]);
    return null;
  }).filter((key) => key !== null);
  return keys;
};

const ripObjectForValues = (workpiece) => {
  const keysValues = Object.entries(workpiece);
  const values = keysValues.flatMap((arr) => {
    if (typeof arr[1] === 'string') return arr[1];
    if (_.isObject(arr[1])) return ripObjectForValues(arr[1]);
    return null;
  }).filter((value) => value !== null);
  return values;
};

const getKeys = (tree) => {
  const result = tree.flatMap((obj) => {
    switch (obj.type) {
      case 'equal':
        return obj.name;
      case 'removed':
        if (typeof obj.value === 'string') return `-${obj.name}`;
        if (_.isObject(obj.value)) return ripObjectForKeys('-', obj.value);
        return null;
      case 'added':
        if (typeof obj.value === 'string') return `+${obj.name}`;
        if (_.isObject(obj.value)) return ripObjectForKeys('+', obj.value);
        return null;
      case 'changed':
        if (typeof obj.value1 === 'string' && typeof obj.value2 === 'string') return [`-${obj.name}`, `+${obj.name}`];
        if (typeof obj.value1 === 'string') return `-${obj.name}`;
        if (typeof obj.value2 === 'string') return `+${obj.name}`;
        if (_.isObject(obj.value1)) return ripObjectForKeys([obj.value1]);
        if (_.isObject(obj.value2)) return ripObjectForKeys([obj.value2]);
        return null;
      case 'nested':
        return getKeys(obj.children);
      default:
        throw new Error(`Unknown order state: '${obj.type}'!`);
    }
  }).filter((item) => item !== null);
  return result;
};

const getValues = (tree) => {
  const result = tree.flatMap((obj) => {
    switch (obj.type) {
      case 'equal':
        return obj.value;
      case 'removed':
        if (typeof obj.value === 'string') return obj.value;
        if (_.isObject(obj.value)) return ripObjectForValues(obj.value);
        return null;
      case 'added':
        if (typeof obj.value === 'string') return obj.value;
        if (_.isObject(obj.value)) return ripObjectForValues(obj.value);
        return null;
      case 'changed':
        if (typeof obj.value1 === 'string' && typeof obj.value2 === 'string') return [obj.value1, obj.value2];
        if (typeof obj.value2 === 'string') return obj.value2;
        if (typeof obj.value1 === 'string') return obj.value1;
        if (_.isObject(obj.value1)) return ripObjectForValues([obj.value1]);
        if (_.isObject(obj.value2)) return ripObjectForValues([obj.value2]);
        return null;
      case 'nested':
        return getValues(obj.children);
      default:
        throw new Error(`Unknown order state: '${obj.type}'!`);
    }
  }).filter((item) => item !== null);
  return result;
};

const json = (tree) => {
  if (tree === null) {
    return `📣 Error, it is working with .json, .yml (.yaml) formats only!
    Also, both of files must to have same format.`;
  }
  const keys = getKeys(tree);
  const values = getValues(tree);
  const result = _.zipObject(keys, values);
  return `[${JSON.stringify(result)}]`;
};

export default json;
