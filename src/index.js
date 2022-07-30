import { cwd } from 'node:process';

import path from 'node:path';

import fs from 'node:fs';

import { parserJson, parserYaml } from './parsers.js';

const genDiff = (path1, path2, formater) => {
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
    return formater(parserJson(data1, data2));
  }
  if ((path.extname(path1) === '.yml' && path.extname(path2) === '.yml')
  || (path.extname(path1) === '.yaml' && path.extname(path2) === '.yaml')
  || (path.extname(path1) === '.yaml' && path.extname(path2) === '.yml')
  || (path.extname(path1) === '.yml' && path.extname(path2) === '.yaml')) {
    const [object1, object2] = parserYaml(path1, path2);
    if (object1 === undefined) return formater(parserYaml({}, object2));
    if (object2 === undefined) return formater(parserYaml(object1, {}));
    return formater(parserYaml(path1, path2));
  }
  return '📣 Error, it is working with .json, .yml and .yaml formats only!';
};

export default genDiff;
