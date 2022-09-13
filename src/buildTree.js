import _ from 'lodash';

const getTree = (data) => {
  const data1 = data[0];
  const data2 = data[1];
  const uniqKeys = _.uniq([...Object.keys(data1), ...Object.keys(data2)])
    .map((key) => {
      const keysObject = {
        key,
      };
      return keysObject;
    });
  const sortedKeys = _.sortBy(uniqKeys, ['key']).map((obj) => obj.key);
  const tree = sortedKeys.flatMap((key) => {
    const data1Key = Object.prototype.hasOwnProperty.call(data1, key);
    const data2Key = Object.prototype.hasOwnProperty.call(data2, key);
    if ((data1Key === data2Key) && (data1[key] === data2[key])) {
      return { type: 'unchanged', name: key, value: data1[key] };
    }
    if ((data1Key && !data2Key)) {
      return { type: 'removed', name: key, value: data1[key] };
    }
    if (!data1Key && data2Key) {
      return { type: 'added', name: key, value: data2[key] };
    }
    if (data1Key === data2Key && _.isObject(data1[key]) && _.isObject(data2[key])) {
      return { type: 'nested', name: key, children: getTree([data1[key], data2[key]]) };
    }
    if (data1Key === data2Key && data1[key] !== data2[key]) {
      return {
        type: 'changed', name: `${key}`, value1: data1[key], value2: data2[key],
      };
    }
    return null;
  }).filter((item) => item !== null);
  return tree;
};

export default getTree;
