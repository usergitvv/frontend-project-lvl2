import _ from 'lodash';

const getTree = ([data1, data2]) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const uniqKeys = _.uniq(keys).map((key) => {
    const keyObject = {
      key,
    };
    return keyObject;
  });
  const sortedKeys = _.sortBy(uniqKeys, ['key']).map((obj) => obj.key);
  const tree = sortedKeys.flatMap((key) => {
    const data1Key = Object.prototype.hasOwnProperty.call(data1, key);
    const data2Key = Object.prototype.hasOwnProperty.call(data2, key);
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
    return { type: 'unchanged', name: key, value: data1[key] };
  });
  return tree;
};

export default getTree;
