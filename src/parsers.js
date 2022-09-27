import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const readFile = (track) => {
  const fullPath = path.resolve(process.cwd(), track);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

export default (track) => yaml.load(readFile(track), 'utf-8');
