import yaml from 'js-yaml';

import fs from 'fs';

import path from 'path';

const readFile = (track) => {
  if (!track.includes(process.cwd())) {
    const data1 = fs.readFileSync(path.resolve(`${process.cwd()}/${track}`));
    return data1;
  }
  const data2 = fs.readFileSync(track);
  return data2;
};

const parserJson = (file) => JSON.parse(file);

const parserYaml = (file) => {
  if (yaml.load(fs.readFileSync(file, 'utf-8')) === undefined) return {};
  return yaml.load(fs.readFileSync(file, 'utf-8'));
};

const makeParsing = (paths) => {
  const roots = [...paths];
  const data = roots.map((track) => readFile(track));
  const extensions = roots.map((track) => path.extname(track));
  const filtered = extensions.map((item) => {
    switch (item) {
      case '.json':
        return item;
      case '.yaml':
        return item;
      case '.yml':
        return item;
      default:
        throw new Error(`Unknown order state: '${item}'!`);
    }
  });
  if (!filtered.includes('.json')) return roots.map((item) => parserYaml(item));
  return data.map((item) => parserJson(item));
};

export default makeParsing;
