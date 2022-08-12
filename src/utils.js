import _ from 'lodash';

const getKeysArray = (handler) => {
  const file1 = { ...handler[0] };
  const file2 = { ...handler[1] };
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const common = _.uniq([...keys1, ...keys2]).sort();
  return [file1, file2, common];
};

export default getKeysArray;
