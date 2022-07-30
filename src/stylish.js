import _ from 'lodash';

const spacesCount = 3;

const getObjectInfo = (value, spaceLength) => {
  const getString = (obj, length) => {
    const objInfo = Object.entries(obj);
    const copyObj = objInfo.map((item) => {
      if (_.isObject(item[1])) {
        return ` ${' '.repeat(length + 4)}${item[0]}: {\n${getString(item[1], length + 4)}${' '.repeat(length)}     }`;
      }
      return ` ${' '.repeat(length + 4)}${item[0]}: ${item[1]}`;
    });
    const result = copyObj.reduce((acc, elem) => {
      const newAcc = `${acc + elem}\n`;
      return newAcc;
    }, '');
    return result;
  };
  return `{\n${getString(value, spaceLength)}    }`;
};

const stylish = (parser) => {
  const [file1, file2] = parser;
  const keys1 = Object.keys(file1).sort();
  const keys2 = Object.keys(file2).sort();
  const common = _.uniq([...keys1, ...keys2]);
  let results = '';
  //  eslint-disable-next-line no-restricted-syntax
  for (const key of common) {
    const file1Key = Object.prototype.hasOwnProperty.call(file1, key);
    const file2Key = Object.prototype.hasOwnProperty.call(file2, key);
    if ((file1Key === file2Key) && (file1[key] === file2[key])
      && !_.isObject(file1[key]) && !_.isObject(file2[key])) {
      results += `    ${key}: ${file1[key]}\n`;
    }
    if ((file1Key === file2Key) && (file1[key] !== file2[key])
      && !_.isObject(file1[key]) && !_.isObject(file2[key])) {
      results += `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
    }
    if ((file1Key && !file2Key) && !_.isObject(file1[key])) {
      results += `  - ${key}: ${file1[key]}\n`;
    }
    if (!file1Key && file2Key && !_.isObject(file2[key])) {
      results += `  + ${key}: ${file2[key]}\n`;
    }
    if ((file1Key === file2Key) && _.isObject(file1[key]) && _.isObject(file2[key])) {
      results += `    ${stylish(file1[key], file2[key])}`;
    }
    if (file1Key && !file2Key && _.isObject(file1[key])) {
      results += `  - ${key}: ${getObjectInfo(file1[key], spacesCount)}\n`;
    }
    if (!file1Key && file2Key && _.isObject(file2[key])) {
      results += `  + ${key}: ${getObjectInfo(file2[key], spacesCount)}\n`;
    }
  }
  return `{\n${results}}`;
};

export default stylish;
