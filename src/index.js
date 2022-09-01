import getResult from './formatters/index.js';
import getTree from './buildTree.js';
import makeParsing from './makeParsing.js';

const genDiff = (path1, path2, formatName) => {
  const tree = getTree(makeParsing(path1, path2));
  return getResult(formatName, tree);
};

export default genDiff;
