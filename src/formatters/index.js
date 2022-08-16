import plain from './plain.js';

import stylish from './stylish.js';

import json from './json.js';

const getResult = (formatter, parcer) => {
  if (formatter === 'plain') return plain(parcer);
  if (formatter === 'json') return json(parcer);
  return stylish(parcer);
};

export default getResult;
