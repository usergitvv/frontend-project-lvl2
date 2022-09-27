import _ from 'lodash';

const getTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const tree = sortedKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { type: 'removed', name: key, value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { type: 'added', name: key, value: data2[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { type: 'nested', name: key, children: getTree(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: 'changed', name: key, value1: data1[key], value2: data2[key],
      };
    }
    return { type: 'unchanged', name: key, value: data1[key] };
  });
  return tree;
};

export default getTree;
