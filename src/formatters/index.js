import plain from './plain.js';

import stylish from './stylish.js';

const getResult = (formatter, parcer) => {
  if (formatter === 'plain') return plain(parcer);
  return stylish(parcer);
};

export default getResult;
