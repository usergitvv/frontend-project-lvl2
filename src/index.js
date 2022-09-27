import format from './formatters/index.js';
import getTree from './buildTree.js';
import getData from './parsers.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const tree = getTree(getData(path1), getData(path2));
  return format(formatName, tree);
};

export default genDiff;
