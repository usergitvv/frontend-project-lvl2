import yaml from 'js-yaml';

import fs from 'fs';

const parserJson = (data) => JSON.parse(data);

const parserYaml = (path) => yaml.load(fs.readFileSync(path, 'utf-8'));

const makeParsing = (path) => parserJson(JSON.stringify(parserYaml(path)));

export default (paths) => paths.map((path) => makeParsing(path));
