import makePlain from './plain.js';
import makeStylish from './stylish.js';

const format = (type, tree) => {
  switch (type) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Unknown order state: '${type}'!`);
  }
};

export default format;
