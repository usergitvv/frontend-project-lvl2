import _ from 'lodash';

const spacesCount = 0;

const getObjectInfo = (value, spaceLength) => {
  const getString = (obj, length) => {
    const objInfo = Object.entries(obj);
    const result = objInfo.map((item) => {
      if (_.isObject(item[1])) {
        return `${' '.repeat(length + 8)}${item[0]}: {\n${getString(item[1], length + 4)}${' '.repeat(length + 8)}}`;
      }
      return `${' '.repeat(length + 8)}${item[0]}: ${item[1]}`;
    })
      .reduce((acc, elem) => {
        const newAcc = `${acc + elem}\n`;
        return newAcc;
      }, '');
    return result;
  };
  return `{\n${getString(value, spaceLength)}${' '.repeat(spaceLength + 2)}  }`;
};

const getDiffInfo = (spaceLength, handler) => {
  const file1 = { ...handler[0] };
  const file2 = { ...handler[1] };
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const common = _.uniq([...keys1, ...keys2]).sort();
  const result = common.map((key) => {
    const file1Key = Object.prototype.hasOwnProperty.call(file1, key);
    const file2Key = Object.prototype.hasOwnProperty.call(file2, key);
    if ((file1Key === file2Key) && (file1[key] === file2[key])) {
      return `${' '.repeat(spaceLength + 2)}  ${key}: ${file1[key]}`;
    }
    if ((file1Key === file2Key) && !_.isObject(file1[key]) && !_.isObject(file2[key])
      && (file1[key] !== file2[key])) {
      return `${' '.repeat(spaceLength)}  - ${key}: ${file1[key]}\n${' '.repeat(spaceLength)}  + ${key}: ${file2[key]}`;
    }
    if ((file1Key && !file2Key) && !_.isObject(file1[key])) {
      return `${' '.repeat(spaceLength)}  - ${key}: ${file1[key]}`;
    }
    if (!file1Key && file2Key && !_.isObject(file2[key])) {
      return `${' '.repeat(spaceLength)}  + ${key}: ${file2[key]}`;
    }
    if ((file1Key === file2Key) && _.isObject(file1[key]) && _.isObject(file2[key])) {
      return `${' '.repeat(spaceLength + 2)}  ${key}: {\n${getDiffInfo(spaceLength + 4, [file1[key], file2[key]])}${' '.repeat(spaceLength + 4)}}`;
    }
    if (file1Key && !file2Key && _.isObject(file1[key])) {
      return `${' '.repeat(spaceLength)}  - ${key}: ${getObjectInfo(file1[key], spaceLength)}`;
    }
    if (!file1Key && file2Key && _.isObject(file2[key])) {
      return `${' '.repeat(spaceLength)}  + ${key}: ${getObjectInfo(file2[key], spaceLength)}`;
    }
    if ((file1Key === file2Key) && _.isObject(file1[key]) && !_.isObject(file2[key])) {
      return `${' '.repeat(spaceLength)}  - ${key}: ${getObjectInfo(file1[key], spaceLength)}\n${' '.repeat(spaceLength)}  + ${key}: ${file2[key]}`;
    }
    if ((file1Key === file2Key) && !_.isObject(file1[key]) && _.isObject(file2[key])) {
      return `${' '.repeat(spaceLength)}  - ${key}: ${file1[key]}\n    + ${key}: ${getObjectInfo(file2[key], spaceLength)}`;
    }
    return null;
  }).reduce((acc, str) => {
    const newAcc = `${acc + str}\n`;
    return newAcc;
  }, '');
  return result;
};

const stylish = (parser) => `{\n${getDiffInfo(spacesCount, parser)}}`;

export default stylish;
