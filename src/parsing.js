import path from 'path';

import { readFile, parserJson, parserYaml } from './parsers.js';

const makeParsing = (track) => {
  const data = readFile(track);
  const extension = path.extname(track);
  switch (extension) {
    case '.json':
      return parserJson(data);
    case '.yaml':
    case '.yml':
      return parserYaml(track);
    default:
      throw new Error(`Unknown order state: '${extension}'!`);
  }
};

export default (paths) => paths.map((track) => makeParsing(track));
