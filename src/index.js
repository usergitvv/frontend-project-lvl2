import getResult from './formatters/index.js';
import getTree from './buildTree.js';
import getData from './parsing.js';

const genDiff = (path1, path2, formatName) => {
  const tree = getTree(getData([path1, path2]));
  return getResult(formatName, tree);
};

export default genDiff;
