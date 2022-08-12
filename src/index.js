import { cwd } from 'node:process';

import path from 'node:path';

import fs from 'node:fs';

import { parserJson, parserYaml } from './parsers.js';

import getResult from './formatters/index.js';

const genDiff = (path1, path2, formatName) => {
  let data1;
  let data2;
  if (path1.includes(cwd())) {
    data1 = fs.readFileSync(path1);
  }
  if (!path1.includes(cwd())) {
    data1 = fs.readFileSync(path.resolve(`${cwd()}/${path1}`));
  }
  if (path2.includes(cwd())) {
    data2 = fs.readFileSync(path2);
  }
  if (!path2.includes(cwd())) {
    data2 = fs.readFileSync(path.resolve(`${cwd()}/${path2}`));
  }
  if (path.extname(path1) === '.json' && path.extname(path2) === '.json') {
    return getResult(formatName, parserJson(data1, data2));
  }
  if ((path.extname(path1) === '.yml' && path.extname(path2) === '.yml')
  || (path.extname(path1) === '.yaml' && path.extname(path2) === '.yaml')
  || (path.extname(path1) === '.yaml' && path.extname(path2) === '.yml')
  || (path.extname(path1) === '.yml' && path.extname(path2) === '.yaml')) {
    return getResult(formatName, parserYaml(path1, path2));
  }
  return '📣 Error, it is working with .json, .yml and .yaml formats only!';
};

export default genDiff;
