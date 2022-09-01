import _ from 'lodash';

const ripObjectForKey = (sign, workpiece) => {
  const keysValues = Object.entries(workpiece);
  const keys = keysValues.flatMap((arr) => {
    if (typeof arr[1] === 'string' && arr[1] !== 'null') return `${sign}${arr[0]}`;
    if (_.isObject(arr[1])) return ripObjectForKey(sign, arr[1]);
    return null;
  }).filter((key) => key !== null);
  return keys;
};

const ripObjectForValue = (workpiece) => {
  const keysValues = Object.entries(workpiece);
  const values = keysValues.flatMap((arr) => {
    if (typeof arr[1] === 'string' && arr[1] !== 'null') return arr[1];
    if (_.isObject(arr[1])) return ripObjectForValue(arr[1]);
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
        if (typeof obj.value === 'string' && obj.value !== 'null') return `-${obj.name}`;
        if (_.has(obj, 'children')) return ripObjectForKey('-', obj.children);
        return null;
      case 'added':
        if (typeof obj.value === 'string' && obj.value !== 'null') return `+${obj.name}`;
        if (_.has(obj, 'children')) return ripObjectForKey('+', obj.children);
        return null;
      case 'changed':
        if (typeof obj.value1 === 'string' && obj.value1 !== 'null'
          && typeof obj.value2 === 'string' && obj.value2 !== 'null') return [`-${obj.name}`, `+${obj.name}`];
        if (typeof obj.value1 === 'string' && obj.value1 !== 'null'
          && _.isObject(obj.value2)) return `-${obj.name}`;
        if (typeof obj.value2 === 'string' && obj.value2 !== 'null'
          && _.isObject(obj.value1)) return `+${obj.name}`;
        if (_.isObject(obj.value1)) return ripObjectForKey([obj.value1]);
        if (_.isObject(obj.value2)) return ripObjectForKey([obj.value2]);
        return null;
      case 'nested':
        return getKeys(obj.children);
      case undefined:
        return false;
      default:
        throw new Error(`Unknown order state: '${obj.type}'!`);
    }
  }).filter((item) => item !== null);
  return result;
};

const getValues = (workpiece) => {
  const result = workpiece.flatMap((obj) => {
    switch (obj.type) {
      case 'equal':
        return obj.value;
      case 'removed':
        if (typeof obj.value === 'string' && obj.value !== 'null') return obj.value;
        if (_.has(obj, 'children')) return ripObjectForValue(obj.children);
        return null;
      case 'added':
        if (typeof obj.value === 'string' && obj.value !== 'null') return obj.value;
        if (_.has(obj, 'children')) return ripObjectForValue(obj.children);
        return null;
      case 'changed':
        if (typeof obj.value1 === 'string' && obj.value1 !== 'null'
          && typeof obj.value2 === 'string' && obj.value2 !== 'null') return [obj.value1, obj.value2];
        if (_.isObject(obj.value1)
        && typeof obj.value2 === 'string' && obj.value2 !== 'null') return obj.value2;
        if (_.isObject(obj.value2)
        && typeof obj.value1 === 'string' && obj.value1 !== 'null') return obj.value1;
        if (_.isObject(obj.value1)) return ripObjectForValue([obj.value1]);
        if (_.isObject(obj.value2)) return ripObjectForValue([obj.value2]);
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
