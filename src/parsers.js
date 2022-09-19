import yaml from 'js-yaml';

import fs from 'fs';

import path from 'path';

const readFile = (track) => {
  const fullPath = path.resolve(process.cwd(), track);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

const parserJson = (file) => JSON.parse(file);

const parserYaml = (track) => yaml.load(fs.readFileSync(track, 'utf-8'));

export {
  readFile,
  parserJson,
  parserYaml,
};
