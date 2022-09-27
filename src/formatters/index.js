import plain from './plain.js';
import stylish from './stylish.js';

const format = (type, tree) => {
  switch (type) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Unknown order state: '${type}'!`);
  }
};

export default format;
