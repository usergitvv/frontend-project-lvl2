import _ from 'lodash';
import getKeysArray from '../utils.js';

const getKeys = (handler) => {
  const [file1, file2, common] = getKeysArray(handler);
  const keys = common.flatMap((key) => {
    const file1Key = Object.prototype.hasOwnProperty.call(file1, key);
    const file2Key = Object.prototype.hasOwnProperty.call(file2, key);
    if ((file1Key === file2Key) && (typeof file1[key] === 'string')
    && (typeof file2[key] === 'string') && (file1[key] === file2[key])) {
      return key;
    }
    if ((file1Key === file2Key) && (typeof file1[key] === 'string')
    && (typeof file2[key] === 'string') && (file1[key] !== file2[key])) {
      return [`-${key}`, `+${key}`];
    }
    if ((file1Key) && (typeof file1[key] === 'string')) {
      return `-${key}`;
    }
    if ((file2Key) && (typeof file2[key] === 'string')) {
      return `+${key}`;
    }
    if ((file1Key) && _.isObject(file1[key])) {
      return getKeys([file1[key], file2[key]]);
    }
    if ((file2Key) && _.isObject(file2[key])) {
      return getKeys([file1[key], file2[key]]);
    }
    return null;
  }).filter((key) => typeof key === 'string');
  return keys;
};

const getValues = (handler) => {
  const [file1, file2, common] = getKeysArray(handler);
  const values = common.flatMap((key) => {
    const file1Key = Object.prototype.hasOwnProperty.call(file1, key);
    const file2Key = Object.prototype.hasOwnProperty.call(file2, key);
    if ((file1Key === file2Key) && (typeof file1[key] === 'string')
    && (typeof file2[key] === 'string') && (file1[key] === file2[key])) {
      return file1[key];
    }
    if ((file1Key === file2Key) && (typeof file1[key] === 'string')
    && (typeof file2[key] === 'string') && (file1[key] !== file2[key])) {
      return [file1[key], file2[key]];
    }
    if ((file1Key) && (typeof file1[key] === 'string')) {
      return file1[key];
    }
    if ((file2Key) && (typeof file2[key] === 'string')) {
      return file2[key];
    }
    if ((file1Key) && _.isObject(file1[key])) {
      return getValues([file1[key], file2[key]]);
    }
    if ((file2Key) && _.isObject(file2[key])) {
      return getValues([file1[key], file2[key]]);
    }
    return null;
  }).filter((key) => typeof key === 'string');
  return values;
};

const json = (handler) => {
  const keys = getKeys(handler);
  const values = getValues(handler);
  const result = _.zipObject(keys, values);
  return `[${JSON.stringify(result)}]`;
};

export default json;
