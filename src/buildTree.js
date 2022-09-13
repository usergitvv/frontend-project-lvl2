import _ from 'lodash';

const getTree = ([data1, data2]) => {
  const object1 = data1;
  const object2 = data2;
  const uniqKeys = _.uniq([...Object.keys(object1), ...Object.keys(object2)])
    .map((key) => {
      const keysObject = {
        key,
      };
      return keysObject;
    });
  const sortedKeys = _.sortBy(uniqKeys, ['key']).map((obj) => obj.key);
  const tree = sortedKeys.flatMap((key) => {
    const object1Key = Object.prototype.hasOwnProperty.call(object1, key);
    const object2Key = Object.prototype.hasOwnProperty.call(object2, key);
    if ((object1Key === object2Key) && (object1[key] === object2[key])) {
      return { type: 'unchanged', name: key, value: object1[key] };
    }
    if ((object1Key && !object2Key)) {
      return { type: 'removed', name: key, value: object1[key] };
    }
    if (!object1Key && object2Key) {
      return { type: 'added', name: key, value: object2[key] };
    }
    if (object1Key === object2Key && _.isObject(object1[key]) && _.isObject(object2[key])) {
      return { type: 'nested', name: key, children: getTree([object1[key], object2[key]]) };
    }
    if (object1Key === object2Key && object1[key] !== object2[key]) {
      return {
        type: 'changed', name: `${key}`, value1: object1[key], value2: object2[key],
      };
    }
    return null;
  }).filter((item) => item !== null);
  return tree;
};

export default getTree;
