import plain from './plain.js';

import stylish from './stylish.js';

import json from './json.js';

const getResult = (formatter, tree) => {
  if (formatter === 'plain') return plain(tree);
  if (formatter === 'json') return json(tree);
  return stylish(tree);
};

export default getResult;
