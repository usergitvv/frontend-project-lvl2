import path from 'path';

import fs from 'fs';

import {
  parserJson,
  parserYaml,
} from './parsers.js';

const getData = (track) => {
  let data = fs.readFileSync(track);
  if (!track.includes(process.cwd())) {
    data = fs.readFileSync(path.resolve(`${process.cwd()}/${track}`));
  }
  return data;
};

const makeParsing = (path1, path2) => {
  const data1 = getData(path1);
  const data2 = getData(path2);
  switch (path.extname(path1) && path.extname(path2)) {
    case '.json':
      return parserJson(data1, data2);
    case '.yml':
      return parserYaml(path1, path2);
    case '.yaml':
      return parserYaml(path1, path2);
    default:
      return null;
  }
};

export default makeParsing;
