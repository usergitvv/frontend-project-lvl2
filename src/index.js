import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import getTree from './buildTree.js';

const getFullPath = (track) => path.resolve(process.cwd(), track);

const getData = (track) => yaml.load(fs.readFileSync(getFullPath(track)).toString(), 'utf-8');

const genDiff = (path1, path2, formatName = 'stylish') => {
  const tree = getTree(getData(path1), getData(path2));
  return format(formatName, tree);
};

export default genDiff;
