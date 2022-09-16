import yaml from 'js-yaml';

import fs from 'fs';

import path from 'path';

const readFile = (track) => {
  const fullPath = path.resolve(process.cwd(), track);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

const parserJson = (file) => JSON.parse(file);

const parserYaml = (track) => {
  if (yaml.load(fs.readFileSync(track, 'utf-8')) === undefined) return {};
  return yaml.load(fs.readFileSync(track, 'utf-8'));
};

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

export default (path1, path2) => {
  const data1 = makeParsing(path1);
  const data2 = makeParsing(path2);
  return [data1, data2];
};
