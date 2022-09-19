import plain from './plain.js';

import stylish from './stylish.js';

const getResult = (formatter, tree) => {
  switch (formatter) {
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      return stylish(tree);
  }
};

export default getResult;
