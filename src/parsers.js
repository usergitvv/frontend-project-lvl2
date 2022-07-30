import yaml from 'js-yaml';

import fs from 'node:fs';

const parserJson = (file1, file2) => {
  const object1 = JSON.parse(file1);
  const object2 = JSON.parse(file2);
  return [object1, object2];
};

const parserYaml = (file1, file2) => {
  const object1 = yaml.load(fs.readFileSync(file1, 'utf-8'));
  const object2 = yaml.load(fs.readFileSync(file2, 'utf-8'));
  return [object1, object2];
};

export {
  parserJson,
  parserYaml,
};
