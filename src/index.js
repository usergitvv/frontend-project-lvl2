import path from 'path';

import fs from 'fs';

import {
  parserJson,
  parserYaml,
} from './parsers.js';

import getResult from './formatters/index.js';

const getData = (track) => {
  let data = fs.readFileSync(track);
  if (!track.includes(process.cwd())) {
    data = fs.readFileSync(path.resolve(`${process.cwd()}/${track}`));
  }
  return data;
};

const genDiff = (path1, path2, formatName) => {
  const data1 = getData(path1);
  const data2 = getData(path2);
  if (path.extname(path1) === '.json' && path.extname(path2) === '.json') {
    return getResult(formatName, parserJson(data1, data2));
  }
  if ((path.extname(path1) === '.yml' && path.extname(path2) === '.yml')
  || (path.extname(path1) === '.yaml' && path.extname(path2) === '.yaml')
  || (path.extname(path1) === '.yaml' && path.extname(path2) === '.yml')
  || (path.extname(path1) === '.yml' && path.extname(path2) === '.yaml')) {
    return getResult(formatName, parserYaml(path1, path2));
  }
  return `📣 Error, it is working with .json, .yml (.yaml) formats only!
    Also, both of files must to have same format.`;
};

export default genDiff;
