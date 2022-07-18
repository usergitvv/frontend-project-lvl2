import { cwd } from 'node:process';

import path from 'node:path';

import fs from 'node:fs';

import yaml from 'js-yaml';

import parser from './parsers.js';

const genDiff = (path1, path2) => {
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
    const object1 = JSON.parse(data1);
    const object2 = JSON.parse(data2);
    return parser(object1, object2);
  }
  if ((path.extname(path1) === '.yml' && path.extname(path2) === '.yml')
  || (path.extname(path1) === '.yaml' && path.extname(path2) === '.yaml')
  || (path.extname(path1) === '.yaml' && path.extname(path2) === '.yml')
  || (path.extname(path1) === '.yml' && path.extname(path2) === '.yaml')) {
    const object1 = yaml.load(fs.readFileSync(path1, 'utf-8'));
    const object2 = yaml.load(fs.readFileSync(path2, 'utf-8'));
    if (object1 === undefined) return parser({}, object2);
    if (object2 === undefined) return parser(object1, {});
    return parser(object1, object2);
  }
  return '📣 Error, it is working with .json, .yml and .yaml formats only!';
};

export default genDiff;
