import { cwd } from 'node:process';

import path from 'node:path';

import fs from 'node:fs';

import _ from 'lodash';

const genDiff = (path1, path2) => {
  let data1;
  let data2;
  if (path1.includes(cwd()) && path.extname(path1) === '.json') {
    data1 = fs.readFileSync(path1);
  }
  if (!path1.includes(cwd()) && path.extname(path1) === '.json') {
    data1 = fs.readFileSync(path.resolve(`${cwd()}/${path1}`));
  }
  if (path2.includes(cwd()) && path.extname(path2) === '.json') {
    data2 = fs.readFileSync(path2);
  }
  if (!path2.includes(cwd()) && path.extname(path2) === '.json') {
    data2 = fs.readFileSync(path.resolve(`${cwd()}/${path2}`));
  }
  const object1 = JSON.parse(data1);
  const object2 = JSON.parse(data2);
  const keys1 = Object.keys(object1).sort();
  const keys2 = Object.keys(object2).sort();
  const common = _.uniq([...keys1, ...keys2]);
  let results = '';
  //  eslint-disable-next-line no-restricted-syntax
  for (const key of common) {
    const object1Key = Object.prototype.hasOwnProperty.call(object1, key);
    const object2Key = Object.prototype.hasOwnProperty.call(object2, key);
    if (object1Key && object2Key && object1[key] === object2[key]) {
      results += `    ${key}: ${object1[key]}\n`;
    }
    if (object1Key && object2Key && object1[key] !== object2[key]) {
      results += `  - ${key}: ${object1[key]}\n  + ${key}: ${object2[key]}\n`;
    }
    if (object1Key && !object2Key) {
      results += `  - ${key}: ${object1[key]}\n`;
    }
    if (!object1Key && object2Key) {
      results += `  + ${key}: ${object2[key]}\n`;
    }
  }
  return `{\n${results}}`;
};

export default genDiff;
