import _ from 'lodash';
import getKeysArray from '../utils.js';

const property = 'Property \'';

const getMergeInfo = (prop, handler) => {
  const [file1, file2, common] = getKeysArray(handler);
  const result = common.map((key) => {
    const file1Key = Object.prototype.hasOwnProperty.call(file1, key);
    const file2Key = Object.prototype.hasOwnProperty.call(file2, key);
    if ((file1Key === file2Key) && !_.isObject(file1[key]) && !_.isObject(file2[key])
      && (file1[key] !== file2[key])) {
      if (typeof file1[key] === 'string' && typeof file2[key] === 'string') {
        return `${prop}${key}' was updated. From '${file1[key]}' to '${file2[key]}'\n`;
      }
      if (typeof file1[key] !== 'string' && typeof file2[key] === 'string') {
        return `${prop}${key}' was updated. From ${file1[key]} to '${file2[key]}'\n`;
      }
      if (typeof file1[key] === 'string' && typeof file2[key] !== 'string') {
        return `${prop}${key}' was updated. From '${file1[key]}' to ${file2[key]}\n`;
      }
      return `${prop}${key}' was updated. From ${file1[key]} to ${file2[key]}\n`;
    }
    if (file1Key && !file2Key) {
      return `${prop}${key}' was removed\n`;
    }
    if (!file1Key && file2Key && !_.isObject(file2[key])) {
      if (typeof file2[key] === 'string') return `${prop}${key}' was added with value: '${file2[key]}'\n`;
      return `${prop}${key}' was added with value: ${file2[key]}\n`;
    }
    if (!file1Key && file2Key && _.isObject(file2[key])) {
      return `${prop}${key}' was added with value: [complex value]\n`;
    }
    if (file1Key === file2Key && _.isObject(file1[key]) && _.isObject(file2[key])) {
      let keyNamesStr = '';
      keyNamesStr += key;
      return `${getMergeInfo(`${prop}${keyNamesStr}.`, [file1[key], file2[key]])}`;
    }
    if ((file1Key === file2Key) && _.isObject(file1[key]) && !_.isObject(file2[key])) {
      if (typeof file2[key] === 'string') return `${prop}${key}' was updated. From [complex value] to '${file2[key]}'\n`;
      return `${prop}${key}' was updated. From [complex value] to ${file2[key]}\n`;
    }
    if ((file1Key === file2Key) && !_.isObject(file1[key]) && _.isObject(file2[key])) {
      if (typeof file1[key] === 'string') return `${prop}${key}' was updated. From [complex value] to '${file1[key]}'`;
      return `${prop}${key}' updated. From ${file1[key]} to [complex value]\n`;
    }
    return null;
  }).filter((item) => typeof item === 'string').reduce((acc, str) => {
    const newAcc = acc + str;
    return newAcc;
  }, '');
  return result;
};

const plain = (parser) => getMergeInfo(property, parser);

export default plain;
